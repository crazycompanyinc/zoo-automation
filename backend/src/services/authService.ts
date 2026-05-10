import { prisma } from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/jwt.js';
import type { RegisterInput, LoginInput } from '../models/schemas.js';

export const AuthService = {
  async register(input: RegisterInput) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw new Error('Email already registered');

    const password = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
      data: { email: input.email, password, name: input.name, company: input.company },
    });

    const token = signToken({ id: user.id, email: user.email, name: user.name, role: user.role });
    return { token, user: { id: user.id, email: user.email, name: user.name, company: user.company, role: user.role } };
  },

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = signToken({ id: user.id, email: user.email, name: user.name, role: user.role });
    return { token, user: { id: user.id, email: user.email, name: user.name, company: user.company, role: user.role } };
  },

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, company: true, role: true, createdAt: true },
    });
    if (!user) throw new Error('User not found');
    return user;
  },
};
