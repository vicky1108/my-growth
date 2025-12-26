"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { AchievementsBusinessService } from "@/lib/services/achievements-business.service";
import { AchievementFormValidator } from "@/lib/validators/form.validator";
import { getErrorMessage } from "@/lib/utils/error-handler";

export interface CreateAchievementInput {
  title: string;
  date: string;
}

export interface UpdateAchievementInput {
  id: string;
  title: string;
  date: string;
}

export interface ServerActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function createAchievement(
  input: CreateAchievementInput
): Promise<ServerActionResponse> {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const validator = new AchievementFormValidator();
    const validation = validator.validate(input);

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      return {
        success: false,
        error: firstError,
      };
    }

    const achievementsService = new AchievementsBusinessService();
    const achievement = await achievementsService.create({
      title: input.title,
      date: input.date,
      userId: session.userId,
    });

    revalidatePath("/pages/achievements");

    return {
      success: true,
      data: achievement,
    };
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("Create achievement error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function updateAchievement(
  input: UpdateAchievementInput
): Promise<ServerActionResponse> {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const validator = new AchievementFormValidator();
    const validation = validator.validate({
      title: input.title,
      date: input.date,
    });

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      return {
        success: false,
        error: firstError,
      };
    }

    const achievementsService = new AchievementsBusinessService();
    const achievement = await achievementsService.update(input.id, session.userId, {
      title: input.title,
      date: input.date,
    });

    revalidatePath("/pages/achievements");

    return {
      success: true,
      data: achievement,
    };
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("Update achievement error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function deleteAchievement(
  id: string
): Promise<ServerActionResponse> {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const achievementsService = new AchievementsBusinessService();
    await achievementsService.delete(id, session.userId);

    revalidatePath("/pages/achievements");

    return {
      success: true,
    };
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("Delete achievement error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

