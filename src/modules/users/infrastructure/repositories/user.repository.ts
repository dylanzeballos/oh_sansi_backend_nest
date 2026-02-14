import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../config/prisma.service';
import { IUserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { User, CreateUserDTO, UpdateUserDTO } from '../../domain/entities/user.entity';
import { PaginatedResult, PaginationParams } from '../../../../shared/types';
import { calculatePagination } from '../../../../shared/utils';

@Injectable()
export class UserRepository implements IUserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination: PaginationParams): Promise<PaginatedResult<User>> {
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 10;
    const { skip } = calculatePagination(0, page, limit);

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { role: true },
      }),
      this.prisma.user.count({ where: { deletedAt: null } }),
    ]);

    return {
      data: data as unknown as User[],
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
    return user as unknown as User | null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    return user as unknown as User | null;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: data.roleId,
      },
      include: { role: true },
    });
    return user as unknown as User;
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(data.email && { email: data.email }),
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.roleId !== undefined && { roleId: data.roleId }),
      },
      include: { role: true },
    });
    return user as unknown as User;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async count(): Promise<number> {
    return this.prisma.user.count({ where: { deletedAt: null } });
  }
}
