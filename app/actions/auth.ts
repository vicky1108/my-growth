"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AuthBusinessService } from "@/lib/services/auth-business.service";
import { LoginFormValidator, SignupFormValidator } from "@/lib/validators/form.validator";
import { getErrorMessage } from "@/lib/utils/error-handler";

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfileInput {
  name?: string;
  dateOfBirth?: string;
}

export interface ServerActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function login(
  input: LoginInput
): Promise<ServerActionResponse> {
  try {
    const validator = new LoginFormValidator();
    const validation = validator.validate(input);

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      return {
        success: false,
        error: firstError,
      };
    }

    const authService = new AuthBusinessService();
    const result = await authService.login({
      email: input.email,
      password: input.password,
    });

    if (!result.success || !result.token) {
      return {
        success: false,
        error: result.error || "Login failed",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });

    return {
      success: true,
      data: result.user,
    };
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("Login error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function signup(
  input: SignupInput
): Promise<ServerActionResponse> {
  try {
    const validator = new SignupFormValidator();
    const validation = validator.validate({
      ...input,
      confirmPassword: input.password, 
    });

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      return {
        success: false,
        error: firstError,
      };
    }

    const authService = new AuthBusinessService();
    const result = await authService.signup({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    if (!result.success || !result.token) {
      return {
        success: false,
        error: result.error || "Signup failed",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });

    return {
      success: true,
      data: result.user,
    };
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("Signup error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/");
  redirect("/");
}

export async function updateProfile(
  input: UpdateProfileInput
): Promise<ServerActionResponse> {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const { prisma } = await import("@/lib/prisma");
    const user = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(input.name && { name: input.name }),
        ...(input.dateOfBirth && { dateOfBirth: new Date(input.dateOfBirth) }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        dateOfBirth: true,
      },
    });

    revalidatePath("/pages/achievements");
    revalidatePath("/");

    return {
      success: true,
      data: { user },
    };
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("Update profile error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

