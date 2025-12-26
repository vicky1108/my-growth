import { cookies } from "next/headers";
import { verifyToken, TokenPayload } from "./jwt";

export async function getSession(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload;
}

export async function requireAuth(): Promise<TokenPayload> {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

