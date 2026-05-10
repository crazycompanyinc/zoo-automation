import { prisma } from '../config/prisma.js';

export const ServiceService = {
  getAll: () =>
    prisma.service.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' },
    }),

  getBySlug: (slug: string) =>
    prisma.service.findUnique({ where: { slug } }),

  create: (data: {
    slug: string;
    title: string;
    description: string;
    features: string[];
    icon: string;
    priceRange: string;
  }) => prisma.service.create({ data }),

  update: (id: string, data: Partial<{
    title: string;
    description: string;
    features: string[];
    icon: string;
    priceRange: string;
    active: boolean;
  }>) => prisma.service.update({ where: { id }, data }),

  delete: (id: string) => prisma.service.delete({ where: { id } }),
};
