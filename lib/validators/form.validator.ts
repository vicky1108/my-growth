
export interface IFormValidator<T> {
  validate(data: T): ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}


export abstract class BaseFormValidator<T> implements IFormValidator<T> {
  abstract validate(data: T): ValidationResult;

  protected validateRequired(value: unknown, fieldName: string): string | null {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return `${fieldName} is required`;
    }
    return null;
  }

  protected validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return null;
  }

  protected validateMinLength(value: string, minLength: number, fieldName: string): string | null {
    if (value.length < minLength) {
      return `${fieldName} must be at least ${minLength} characters`;
    }
    return null;
  }

  protected validateMatch(value1: string, value2: string, fieldName: string): string | null {
    if (value1 !== value2) {
      return `${fieldName} do not match`;
    }
    return null;
  }
}


export interface LoginFormData {
  email: string;
  password: string;
}

export class LoginFormValidator extends BaseFormValidator<LoginFormData> {
  validate(data: LoginFormData): ValidationResult {
    const errors: Record<string, string> = {};

    const emailError = this.validateRequired(data.email, "Email") || this.validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const passwordError = this.validateRequired(data.password, "Password");
    if (passwordError) errors.password = passwordError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}


export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class SignupFormValidator extends BaseFormValidator<SignupFormData> {
  validate(data: SignupFormData): ValidationResult {
    const errors: Record<string, string> = {};

    const nameError = this.validateRequired(data.name, "Name");
    if (nameError) errors.name = nameError;

    const emailError = this.validateRequired(data.email, "Email") || this.validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const passwordError = this.validateRequired(data.password, "Password") || 
      this.validateMinLength(data.password, 6, "Password");
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = this.validateRequired(data.confirmPassword, "Confirm Password") ||
      this.validateMatch(data.password, data.confirmPassword, "Passwords");
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}


export interface AchievementFormData {
  title: string;
  date: string;
}

export class AchievementFormValidator extends BaseFormValidator<AchievementFormData> {
  validate(data: AchievementFormData): ValidationResult {
    const errors: Record<string, string> = {};

    const titleError = this.validateRequired(data.title, "Title");
    if (titleError) errors.title = titleError;

    const dateError = this.validateRequired(data.date, "Date");
    if (dateError) errors.date = dateError;

    if (data.date && new Date(data.date) > new Date()) {
      errors.date = "Date cannot be in the future";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

