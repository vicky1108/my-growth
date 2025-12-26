import { useState, useCallback } from "react";

export interface UseFormReturn<T> {
  formData: T;
  error: string;
  isLoading: boolean;
  setFormData: (data: T) => void;
  setError: (error: string) => void;
  setIsLoading: (loading: boolean) => void;
  handleInputChange: (field: keyof T, value: string) => void;
  resetForm: () => void;
}

export function useForm<T extends Record<string, unknown>>(
  initialData: T
): UseFormReturn<T> {
  const [formData, setFormData] = useState<T>(initialData);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof T, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setError("");
    setIsLoading(false);
  }, [initialData]);

  return {
    formData,
    error,
    isLoading,
    setFormData,
    setError,
    setIsLoading,
    handleInputChange,
    resetForm,
  };
}


