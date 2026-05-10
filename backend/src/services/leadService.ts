import { prisma } from '../config/prisma.js';
import type { CreateLeadInput, UpdateLeadInput } from '../models/schemas.js';

export const LeadService = {
  getAll: (userId?: string) => {
    const where = userId ? { userId } : {};
    return prisma.lead.findMany({
      where,
      include: { service: true, project: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  getById: (id: string) =>
    prisma.lead.findUnique({
      where: { id },
      include: { service: true, project: true, user: { select: { id: true, name: true, email: true, company: true } } },
    }),

  create: (data: CreateLeadInput, userId?: string) =>
    prisma.lead.create({
      data: { ...data, userId },
      include: { service: true },
    }),

  update: (id: string, data: UpdateLeadInput) =>
    prisma.lead.update({
      where: { id },
      data,
      include: { service: true, project: true },
    }),

  delete: (id: string) => prisma.lead.delete({ where: { id } }),

  getStats: async () => {
    const [total, newLeads, converted, byService] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'new' } }),
      prisma.lead.count({ where: { status: 'converted' } }),
      prisma.lead.groupBy({ by: ['serviceId'], _count: { id: true } }),
    ]);
    return { total, new: newLeads, converted, byService };
  },
};
