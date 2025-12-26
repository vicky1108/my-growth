import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { INavigationService } from "@/lib/services/navigation.service";
import { IAchievementsApiService } from "@/lib/services/achievements-api.service";
import { ISortService, createAchievementSortService } from "@/lib/services/sort.service";
import { IAuthApiService } from "@/lib/services/auth-api.service";
import { getServiceFactory } from "@/lib/services/service.factory";
import { useAuth } from "@/app/hooks";
import { User } from "@/lib/services/auth.service";
import { AchievementFormValidator } from "@/lib/validators/form.validator";
import { getErrorMessage } from "@/lib/utils/error-handler";

export interface Achievement {
  id: string;
  title: string;
  date: string;
  createdAt: string;
}

export type SortOrder = "newest" | "oldest" | "title";

export interface AchievementFormData {
  title: string;
  date: string;
}

export interface UseAchievementsReturn {
  user: User | null;
  achievements: Achievement[];
  filteredAchievements: Achievement[];
  isLoading: boolean;
  showModal: boolean;
  editingId: string | null;
  sortOrder: SortOrder;
  formData: AchievementFormData;
  submitting: boolean;
  showDateOfBirthModal: boolean;
  dateOfBirth: string;
  savingDateOfBirth: boolean;
  setSortOrder: (order: SortOrder) => void;
  openAddModal: () => void;
  handleEdit: (id: string) => Promise<void>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleSaveDateOfBirth: (e: React.FormEvent) => Promise<void>;
  closeModal: () => void;
  setDateOfBirth: (date: string) => void;
  setFormData: (data: AchievementFormData) => void;
}

export function useAchievements(): UseAchievementsReturn {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [formData, setFormData] = useState<AchievementFormData>({
    title: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [showDateOfBirthModal, setShowDateOfBirthModal] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [savingDateOfBirth, setSavingDateOfBirth] = useState(false);

  const serviceFactory = getServiceFactory();
  const achievementsApiService: IAchievementsApiService = useMemo(
    () => serviceFactory.createAchievementsApiService(),
    [serviceFactory]
  );
  const navigationService: INavigationService = useMemo(
    () => serviceFactory.createNavigationService(router, ""),
    [serviceFactory, router]
  );
  const sortService: ISortService<Achievement> = useMemo(
    () => createAchievementSortService<Achievement>(),
    []
  );
  const authApiService: IAuthApiService = useMemo(
    () => serviceFactory.createAuthApiService(),
    [serviceFactory]
  );
  const validator = useMemo(() => new AchievementFormValidator(), []);

  const fetchAchievements = useCallback(async () => {
    try {
      const data = await achievementsApiService.getAll();
      setAchievements(data);
    } catch (error) {
      console.error("Failed to fetch achievements:", error);
    }
  }, [achievementsApiService]);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigationService.navigateTo("/pages/login");
      } else {
        if (!user.dateOfBirth) {
          setShowDateOfBirthModal(true);
        }
        fetchAchievements();
        setIsLoading(false);
      }
    }
  }, [user, authLoading, navigationService, fetchAchievements]);

  const sortAndFilterAchievements = useCallback(() => {
    const sorted = sortService.sort(achievements, sortOrder);
    setFilteredAchievements(sorted);
  }, [achievements, sortOrder, sortService]);


  useEffect(() => {
    sortAndFilterAchievements();
  }, [sortAndFilterAchievements]);

  const handleEdit = useCallback(async (id: string) => {
    try {
      const achievement = await achievementsApiService.getById(id);
      setFormData({
        title: achievement.title,
        date: new Date(achievement.date).toISOString().split("T")[0],
      });
      setEditingId(id);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch achievement:", error);
      alert("Failed to load achievement for editing");
    }
  }, [achievementsApiService]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const validation = validator.validate(formData);
      if (!validation.isValid) {
        const firstError = Object.values(validation.errors)[0];
        alert(firstError);
        setSubmitting(false);
        return;
      }

      if (editingId) {
        await achievementsApiService.update(editingId, formData.title, formData.date);
      } else {
        await achievementsApiService.create(formData.title, formData.date);
      }

      setFormData({
        title: "",
        date: new Date().toISOString().split("T")[0],
      });
      setEditingId(null);
      setShowModal(false);

      fetchAchievements();
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("Submit error:", error);
      alert(errorMessage || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [formData, editingId, achievementsApiService, fetchAchievements, validator]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) {
      return;
    }

    try {
      await achievementsApiService.delete(id);
      fetchAchievements();
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage || "Something went wrong. Please try again.");
    }
  }, [achievementsApiService, fetchAchievements]);

  const openAddModal = useCallback(() => {
    setEditingId(null);
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
    });
  }, []);

  const handleSaveDateOfBirth = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateOfBirth) return;

    setSavingDateOfBirth(true);
    try {
      const response = await authApiService.updateProfile({ dateOfBirth });

      if (response.success && response.data) {
        setShowDateOfBirthModal(false);
        window.dispatchEvent(new Event("auth-state-changed"));
      } else {
        alert(response.error || "Failed to save date of birth");
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("Error saving date of birth:", error);
      alert(errorMessage || "Something went wrong. Please try again.");
    } finally {
      setSavingDateOfBirth(false);
    }
  }, [dateOfBirth, authApiService]);

  const setFormDataHandler = useCallback((data: AchievementFormData) => {
    setFormData(data);
  }, []);

  return {
    user,
    achievements,
    filteredAchievements,
    isLoading,
    showModal,
    editingId,
    sortOrder,
    formData,
    submitting,
    showDateOfBirthModal,
    dateOfBirth,
    savingDateOfBirth,
    setSortOrder,
    openAddModal,
    handleEdit,
    handleSubmit,
    handleDelete,
    handleSaveDateOfBirth,
    closeModal,
    setDateOfBirth,
    setFormData: setFormDataHandler,
  };
}

