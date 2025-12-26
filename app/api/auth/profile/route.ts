import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";


export const dynamic = "force-dynamic";


export const fetchCache = "force-no-store";


export const revalidate = 0;

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        dateOfBirth: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { user },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to get profile";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { dateOfBirth } = await request.json();

    const user = await prisma.user.update({
      where: { id: session.userId },
      data: {
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        dateOfBirth: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: { user },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

