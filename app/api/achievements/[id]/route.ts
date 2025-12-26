import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { AchievementsBusinessService } from "@/lib/services/achievements-business.service";
import { AchievementFormValidator } from "@/lib/validators/form.validator";


export const dynamic = "force-dynamic";


export const fetchCache = "force-no-store";


export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const achievementsService = new AchievementsBusinessService();
    const achievement = await achievementsService.getById(id, session.userId);

    if (!achievement) {
      return NextResponse.json(
        { success: false, error: "Achievement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: achievement,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch achievement";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { title, date } = await request.json();

    const validator = new AchievementFormValidator();
    const validation = validator.validate({ title, date });
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const achievementsService = new AchievementsBusinessService();
    const achievement = await achievementsService.update(id, session.userId, { title, date });

    return NextResponse.json({
      success: true,
      data: achievement,
    });
  } catch (error: unknown) {
    console.error("Update achievement error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update achievement";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const achievementsService = new AchievementsBusinessService();
    await achievementsService.delete(id, session.userId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete achievement";
    const status = errorMessage.includes("not found") ? 404 : 
                   errorMessage.includes("access denied") ? 403 : 500;
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status }
    );
  }
}
