import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function getUserFromTelegram(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const data = Object.fromEntries(searchParams.entries());

  const { hash, ...authData } = data;
  const secretKey = crypto.createHash("sha256").update(process.env.BOT_TOKEN!).digest();
  const checkString = Object.keys(authData)
    .sort()
    .map((key) => `${key}=${authData[key]}`)
    .join("\n");

  const hmac = crypto.createHmac("sha256", secretKey).update(checkString).digest("hex");

  if (hmac !== hash) return null;

  const telegramId = authData.id;
  const email = `${telegramId}@telegram.user`;

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        password: '',
        role: 'USER',
      },
    });
  }

  return user;
}
