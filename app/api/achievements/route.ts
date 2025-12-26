import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { AchievementsBusinessService } from "@/lib/services/achievements-business.service";
import { AchievementFormValidator } from "@/lib/validators/form.validator";
import { getErrorMessage, getErrorDetails } from "@/lib/utils/error-handler";


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

    const achievementsService = new AchievementsBusinessService();
    const achievements = await achievementsService.getAllByUserId(session.userId);

    return NextResponse.json({
      success: true,
      data: achievements,
    });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    const errorDetails = getErrorDetails(error);
    console.error("Failed to fetch achievements:", errorDetails);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

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
    const achievement = await achievementsService.create({
      title,
      date,
      userId: session.userId,
    });

    return NextResponse.json(
      {
        success: true,
        data: achievement,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    const errorDetails = getErrorDetails(error);
    console.error("Create achievement error:", errorDetails);
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorDetails.stack : undefined
      },
      { status: 500 }
    );
  }
}

