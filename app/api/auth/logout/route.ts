import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";


export const fetchCache = "force-no-store";


export const revalidate = 0;

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });

  return response;
}

