


export function isError(error: unknown): error is Error {
  return error instanceof Error;
}


export function getErrorMessage(error: unknown): string {
  if (isError(error)) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
}


export function getErrorDetails(error: unknown): {
  message: string;
  stack?: string;
  name?: string;
} {
  if (isError(error)) {
    return {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
  }
  return {
    message: getErrorMessage(error),
  };
}



export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = "Authentication failed") {
    super(message);
    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

