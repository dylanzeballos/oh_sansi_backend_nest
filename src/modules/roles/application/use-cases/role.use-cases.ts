import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { IRoleRepository } from '../../domain/repositories/role.repository.interface';
import type { IRoleRepositoryInterface } from '../../domain/repositories/role.repository.interface';
import { CreateRoleDto, UpdateRoleDto } from '../dto/create-role.dto';
import { QueryRoleDto } from '../dto/query-role.dto';
import { Role, RoleResponse } from '../../domain/entities/role.entity';
import { getPaginationParams, createPaginatedResponse } from '../../../../shared/utils';
import { ERROR_MESSAGES } from '../../../../shared/constants';
import { PaginatedResult } from '../../../../shared/types';

@Injectable()
export class RoleUseCases {
  constructor(
    @Inject(IRoleRepository)
    private readonly roleRepository: IRoleRepositoryInterface,
  ) {}

  async findAll(query: QueryRoleDto): Promise<PaginatedResult<RoleResponse>> {
    const { page, limit } = getPaginationParams(query.page, query.limit);
    const result = await this.roleRepository.findAll({ page, limit });

    return createPaginatedResponse(
      result.data.map((role) => this.mapToResponse(role)),
      result.meta.total,
      page,
      limit,
    );
  }

  async findById(id: string): Promise<RoleResponse> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new NotFoundException(ERROR_MESSAGES.ROLE_NOT_FOUND);
    }
    return this.mapToResponse(role);
  }

  async findByName(name: string): Promise<Role | null> {
    return this.roleRepository.findByName(name);
  }

  async create(data: CreateRoleDto): Promise<RoleResponse> {
    const existingRole = await this.roleRepository.findByName(data.name);
    if (existingRole) {
      throw new ConflictException(ERROR_MESSAGES.ROLE_ALREADY_EXISTS);
    }

    const role = await this.roleRepository.create(data);
    return this.mapToResponse(role);
  }

  async update(id: string, data: UpdateRoleDto): Promise<RoleResponse> {
    const existingRole = await this.roleRepository.findById(id);
    if (!existingRole) {
      throw new NotFoundException(ERROR_MESSAGES.ROLE_NOT_FOUND);
    }

    if (data.name && data.name !== existingRole.name) {
      const nameExists = await this.roleRepository.findByName(data.name);
      if (nameExists) {
        throw new ConflictException(ERROR_MESSAGES.ROLE_ALREADY_EXISTS);
      }
    }

    const role = await this.roleRepository.update(id, data);
    return this.mapToResponse(role);
  }

  async delete(id: string): Promise<void> {
    const existingRole = await this.roleRepository.findById(id);
    if (!existingRole) {
      throw new NotFoundException(ERROR_MESSAGES.ROLE_NOT_FOUND);
    }
    await this.roleRepository.delete(id);
  }

  private mapToResponse(role: Role): RoleResponse {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      isActive: role.isActive,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }
}
