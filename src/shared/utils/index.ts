import { compare, hash } from 'bcrypt';
import { DEFAULTS } from '../constants';
import type { PaginationParams, PaginatedResult } from '../types';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

// Pagination
export function calculatePagination(
  total: number,
  page: number,
  limit: number,
): { totalPages: number; skip: number } {
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;
  return { totalPages, skip };
}

export function getPaginationParams(
  page?: number,
  limit?: number,
): { page: number; limit: number } {
  const validPage = Math.max(1, page || DEFAULTS.PAGE);
  const validLimit = Math.min(Math.max(1, limit || DEFAULTS.LIMIT), DEFAULTS.MAX_LIMIT);

  return {
    page: validPage,
    limit: validLimit,
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResult<T> {
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// String utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Date utilities
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function formatDate(date: Date): string {
  return date.toISOString();
}

// Object utilities
export function excludeFields<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

// Error handling
export function isPrismaError(error: unknown): boolean {
  const err = error as Record<string, unknown>;
  return typeof error === 'object' && error !== null && 'code' in err && 'meta' in err;
}

export function isUniqueConstraintError(error: unknown): boolean {
  const err = error as { code?: string };
  return isPrismaError(error) && err.code === 'P2002';
}

export function isNotFoundError(error: unknown): boolean {
  const err = error as { code?: string };
  return isPrismaError(error) && err.code === 'P2025';
}
