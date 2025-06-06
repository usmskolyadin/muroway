import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data || !data.hash) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    const { hash, ...authData } = data;
    const secretKey = crypto
      .createHash("sha256")
      .update(process.env.BOT_TOKEN!)
      .digest();
    
    const checkString = Object.keys(authData)
      .sort()
      .map((key) => `${key}=${authData[key]}`)
      .join("\n");

    const hmac = crypto
      .createHmac("sha256", secretKey)
      .update(checkString)
      .digest("hex");

    if (hmac !== hash) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 401 }
      );
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

    return NextResponse.json({ user });

  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}