import { PrismaClient, User } from "@prisma/client";
import { NextRequest } from "next/server";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function getUserFromTelegram(req: NextRequest): Promise<User | null> {
  const url = new URL(req.url);
  const data = Object.fromEntries(url.searchParams.entries());

  const { hash, auth_date, ...authData } = data;
  if (!hash || !auth_date) return null;

  // Check if request is too old
  const now = Math.floor(Date.now() / 1000);
  if (now - Number(auth_date) > 86400) return null;

  const secret = crypto.createHash("sha256").update(process.env.BOT_TOKEN!, "utf-8").digest();
  const checkString = Object.keys({ ...authData, auth_date })
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");

  const hmac = crypto.createHmac("sha256", secret).update(checkString).digest("hex");

  if (hmac !== hash) return null;

  const telegramId = data.id;
  const email = `${telegramId}@telegram.user`;

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId,
        email,
        password: "",
        role: "USER",
      },
    });
  }

  return user;
}
