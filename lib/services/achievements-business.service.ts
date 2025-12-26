


import { prisma } from "@/lib/prisma";

export interface Achievement {
  id: string;
  title: string;
  date: Date;
  userId: string;
  createdAt: Date;
}

export interface CreateAchievementData {
  title: string;
  date: string;
  userId: string;
}

export interface UpdateAchievementData {
  title: string;
  date: string;
}

export interface IAchievementsBusinessService {
  getAllByUserId(userId: string): Promise<Achievement[]>;
  getById(id: string, userId: string): Promise<Achievement | null>;
  create(data: CreateAchievementData): Promise<Achievement>;
  update(id: string, userId: string, data: UpdateAchievementData): Promise<Achievement>;
  delete(id: string, userId: string): Promise<void>;
}

export class AchievementsBusinessService implements IAchievementsBusinessService {
  async getAllByUserId(userId: string): Promise<Achievement[]> {
    return prisma.achievement.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  }

  async getById(id: string, userId: string): Promise<Achievement | null> {
    return prisma.achievement.findFirst({
      where: {
        id,
        userId, 
      },
    });
  }

  async create(data: CreateAchievementData): Promise<Achievement> {
    return prisma.achievement.create({
      data: {
        title: data.title,
        date: new Date(data.date),
        userId: data.userId,
      },
    });
  }

  async update(id: string, userId: string, data: UpdateAchievementData): Promise<Achievement> {
    const existing = await this.getById(id, userId);
    if (!existing) {
      throw new Error("Achievement not found or access denied");
    }

    return prisma.achievement.update({
      where: { id },
      data: {
        title: data.title,
        date: new Date(data.date),
      },
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    const existing = await this.getById(id, userId);
    if (!existing) {
      throw new Error("Achievement not found or access denied");
    }

    await prisma.achievement.delete({
      where: { id },
    });
  }
}


