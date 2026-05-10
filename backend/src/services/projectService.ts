import { prisma } from '../config/prisma.js';
import type { CreateProjectInput, UpdateProjectInput } from '../models/schemas.js';

export const ProjectService = {
  getAll: (userId?: string) => {
    const where = userId ? { userId } : {};
    return prisma.project.findMany({
      where,
      include: {
        lead: { include: { service: true } },
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  getById: (id: string) =>
    prisma.project.findUnique({
      where: { id },
      include: {
        lead: { include: { service: true, user: { select: { name: true, email: true, company: true } } } },
        user: { select: { name: true, email: true } },
      },
    }),

  create: (data: CreateProjectInput, userId: string) =>
    prisma.project.create({
      data: {
        ...data,
        userId,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
      include: { lead: true },
    }),

  update: (id: string, data: UpdateProjectInput) =>
    prisma.project.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
      include: { lead: true },
    }),

  delete: (id: string) => prisma.project.delete({ where: { id } }),
};
