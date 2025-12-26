import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/app/hooks";
import { getServiceFactory } from "@/lib/services/service.factory";
import { IEventService } from "@/lib/services/event.service";
import { INavigationService } from "@/lib/services/navigation.service";
import { IAuthApiService } from "@/lib/services/auth-api.service";
import { LoginFormValidator } from "@/lib/validators/form.validator";

export interface LoginFormData extends Record<string, unknown> {
  email: string;
  password: string;
}

export interface UseLoginReturn {
  formData: LoginFormData;
  error: string;
  isLoading: boolean;
  handleInputChange: (field: keyof LoginFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useLogin(): UseLoginReturn {
  const router = useRouter();
  const {
    formData,
    error,
    isLoading,
    setError,
    setIsLoading,
    handleInputChange,
  } = useForm<LoginFormData>({
    email: "",
    password: "",
  });

  const serviceFactory = getServiceFactory();
  const authApiService: IAuthApiService = serviceFactory.createAuthApiService();
  const eventService: IEventService = serviceFactory.createEventService();
  const navigationService: INavigationService = serviceFactory.createNavigationService(router, "");
  const validator = useMemo(() => new LoginFormValidator(), []);

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
        const response = await authApiService.login(formData.email, formData.password);

        if (!response.success || !response.data) {
          setError(response.error || "Failed to login");
          setIsLoading(false);
          return;
        }

        eventService.dispatchEvent("auth-state-changed");

        navigationService.navigateTo("/pages/achievements");
        navigationService.refresh();
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
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

