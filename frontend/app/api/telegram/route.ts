import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const data = req.body;

  if (!data || !data.hash) {
    return res.status(400).json({ error: "Missing data" });
  }

  const { hash, ...authData } = data;
  const secretKey = crypto.createHash("sha256").update(process.env.BOT_TOKEN!).digest();
  const checkString = Object.keys(authData)
    .sort()
    .map((key) => `${key}=${authData[key]}`)
    .join("\n");

  const hmac = crypto.createHmac("sha256", secretKey).update(checkString).digest("hex");

  if (hmac !== hash) {
    return res.status(401).json({ error: "Invalid data" });
  }

  const telegramId = authData.id.toString();
  const email = `${telegramId}@telegram.user`;

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        telegramId,
        password: '',
        role: 'USER',
      },
    });
  }

  return res.status(200).json({ user });
}
