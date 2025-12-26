"use client";

import styles from "./page.module.scss";
import { useAchievements } from "./useAchievements";
import { useIsMobile } from "@/app/hooks";
import { LoadingState } from "./LoadingState";
import { AchievementsContent } from "./AchievementsContent";
import { AchievementModal } from "./AchievementModal";
import { DateOfBirthModal } from "./DateOfBirthModal";

export default function Achievements() {
  const isMobile = useIsMobile();
  const {
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
    setFormData,
  } = useAchievements();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!user) {
    return null;
  }

  const handleInputChange = (field: "title" | "date", value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AchievementsContent
          userName={user.name}
          dateOfBirth={user.dateOfBirth ?? null}
          achievements={achievements}
          filteredAchievements={filteredAchievements}
          sortOrder={sortOrder}
          isMobile={isMobile}
          onAddClick={openAddModal}
          onSortChange={setSortOrder}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <AchievementModal
        isOpen={showModal}
        isEditing={!!editingId}
        formData={formData}
        submitting={submitting}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />

      <DateOfBirthModal
        isOpen={showDateOfBirthModal}
        dateOfBirth={dateOfBirth}
        saving={savingDateOfBirth}
        onSubmit={handleSaveDateOfBirth}
        onDateChange={setDateOfBirth}
      />
    </div>
  );
}
