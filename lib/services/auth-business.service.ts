


import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/lib/hash";
import { generateToken } from "@/lib/jwt";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  dateOfBirth?: string;
}

export interface AuthResult {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    dateOfBirth?: Date | null;
  };
  token?: string;
  error?: string;
}

export interface IAuthBusinessService {
  login(credentials: LoginCredentials): Promise<AuthResult>;
  signup(data: SignupData): Promise<AuthResult>;
  getUserById(userId: string): Promise<AuthResult>;
}

export class AuthBusinessService implements IAuthBusinessService {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });

      if (!user) {
        return {
          success: false,
          error: "Invalid credentials",
        };
      }

      const isPasswordValid = await comparePassword(credentials.password, user.password);

      if (!isPasswordValid) {
        return {
          success: false,
          error: "Invalid credentials",
        };
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
        token,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to login";
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async signup(data: SignupData): Promise<AuthResult> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        return {
          success: false,
          error: "User already exists with this email",
        };
      }

      const hashedPassword = await hashPassword(data.password);

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        },
      });

      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
        token,
      };
    } catch (error: unknown) {
      console.error("AuthBusinessService.signup error:", error);
      
      if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
        return {
          success: false,
          error: "User already exists with this email",
        };
      }

      const errorMessage = error instanceof Error ? error.message : "Failed to create user";
      console.error("Signup error message:", errorMessage);
      
      return {
        success: false,
        error: errorMessage.includes("fetch") ? "Database connection error. Please check your database configuration." : errorMessage,
      };
    }
  }

  async getUserById(userId: string): Promise<AuthResult> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          dateOfBirth: true,
        },
      });

      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to get user";
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}


