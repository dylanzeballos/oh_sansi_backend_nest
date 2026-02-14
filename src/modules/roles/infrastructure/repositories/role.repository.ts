import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../config/prisma.service';
import { IRoleRepositoryInterface } from '../../domain/repositories/role.repository.interface';
import { Role, CreateRoleDTO, UpdateRoleDTO } from '../../domain/entities/role.entity';
import { PaginatedResult, PaginationParams } from '../../../../shared/types';
import { calculatePagination } from '../../../../shared/utils';

@Injectable()
export class RoleRepository implements IRoleRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination: PaginationParams): Promise<PaginatedResult<Role>> {
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 10;
    const { skip } = calculatePagination(0, page, limit);

    const [data, total] = await Promise.all([
      this.prisma.role.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.role.count({ where: { deletedAt: null } }),
    ]);

    return {
      data: data as unknown as Role[],
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });
    return role as unknown as Role | null;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { name },
    });
    return role as unknown as Role | null;
  }

  async create(data: CreateRoleDTO): Promise<Role> {
    const role = await this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
        permissions: data.permissions || [],
      },
    });
    return role as unknown as Role;
  }

  async update(id: string, data: UpdateRoleDTO): Promise<Role> {
    const role = await this.prisma.role.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.permissions && { permissions: data.permissions }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });
    return role as unknown as Role;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async count(): Promise<number> {
    return this.prisma.role.count({ where: { deletedAt: null } });
  }
}
