import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/app/hooks";
import { getServiceFactory } from "@/lib/services/service.factory";
import { IEventService } from "@/lib/services/event.service";
import { INavigationService } from "@/lib/services/navigation.service";
import { IAuthApiService } from "@/lib/services/auth-api.service";
import { SignupFormValidator } from "@/lib/validators/form.validator";

export interface SignupFormData extends Record<string, unknown> {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UseSignupReturn {
  formData: SignupFormData;
  error: string;
  isLoading: boolean;
  handleInputChange: (field: keyof SignupFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useSignup(): UseSignupReturn {
  const router = useRouter();
  const {
    formData,
    error,
    isLoading,
    setError,
    setIsLoading,
    handleInputChange,
  } = useForm<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const serviceFactory = getServiceFactory();
  const authApiService: IAuthApiService = serviceFactory.createAuthApiService();
  const eventService: IEventService = serviceFactory.createEventService();
  const navigationService: INavigationService = serviceFactory.createNavigationService(router, "");
  const validator = useMemo(() => new SignupFormValidator(), []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      const validation = validator.validate(formData);
      if (!validation.isValid) {
        const firstError = Object.values(validation.errors)[0];
        setError(firstError);
        return;
      }

      setIsLoading(true);

      try {
        const response = await authApiService.signup(
          formData.name,
          formData.email,
          formData.password,
          formData.confirmPassword
        );

        if (!response.success || !response.data) {
          setError(response.error || "Failed to create account");
          setIsLoading(false);
          return;
        }

        eventService.dispatchEvent("auth-state-changed");

        navigationService.navigateTo("/pages/achievements");
        navigationService.refresh();
      } catch (err: unknown) {
        console.error("Signup error:", err);
        let errorMessage = "Something went wrong. Please try again.";
        
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "object" && err !== null && "error" in err) {
          errorMessage = String(err.error);
        }
        
        setError(errorMessage);
        setIsLoading(false);
      }
    },
    [formData, authApiService, eventService, navigationService, validator, setError, setIsLoading]
  );

  return {
    formData,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
}

