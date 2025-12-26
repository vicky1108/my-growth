import { NextRequest, NextResponse } from "next/server";
import { AuthBusinessService } from "@/lib/services/auth-business.service";
import { SignupFormValidator } from "@/lib/validators/form.validator";


export const dynamic = "force-dynamic";


export const fetchCache = "force-no-store";


export const revalidate = 0;


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword, dateOfBirth } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, and password are required" },
        { status: 400 }
      );
    }

    const validator = new SignupFormValidator();
    const validation = validator.validate({ name, email, password, confirmPassword: confirmPassword || password });
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      return NextResponse.json(
        { success: false, error: firstError, validationErrors: validation.errors },
        { status: 400 }
      );
    }

    try {
      const authBusinessService = new AuthBusinessService();
      const result = await authBusinessService.signup({ name, email, password, dateOfBirth });

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || "Failed to create user" },
          { status: 400 }
        );
      }

    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: result.user!.id,
            name: result.user!.name,
            email: result.user!.email,
            dateOfBirth: result.user!.dateOfBirth,
          },
        },
      },
      { status: 201 }
    );

    if (result.token) {
      response.cookies.set("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, 
      });
    }

      return response;
    } catch (dbError: unknown) {
      console.error("Database error during signup:", dbError);
      const dbErrorMessage = dbError instanceof Error ? dbError.message : "Database error";
      return NextResponse.json(
        { success: false, error: `Database error: ${dbErrorMessage}` },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Signup error:", error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : "Failed to create user";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 }
    );
  }
}

