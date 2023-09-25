import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z
    .string()
    .min(1, "password is required")
    .min(6, "password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    // cek if email already exist
    const emailExist = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (emailExist) {
      return NextResponse.json(
        { user: null, message: "Email already exist" },
        { status: 400 }
      );
    }

    // cek if username already exist
    const usernamelExist = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (usernamelExist) {
      return NextResponse.json(
        { user: null, message: "Username already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // remove password from response
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfuly" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
