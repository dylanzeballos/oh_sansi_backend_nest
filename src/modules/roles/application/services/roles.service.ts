import { Injectable } from '@nestjs/common';
import { RoleUseCases } from '../use-cases/role.use-cases';
import { CreateRoleDto, UpdateRoleDto } from '../dto/create-role.dto';
import { QueryRoleDto } from '../dto/query-role.dto';
import { RoleResponse } from '../../domain/entities/role.entity';
import { PaginatedResult } from '../../../../shared/types';

@Injectable()
export class RolesService {
  constructor(private readonly roleUseCases: RoleUseCases) {}

  async findAll(query: QueryRoleDto): Promise<PaginatedResult<RoleResponse>> {
    return this.roleUseCases.findAll(query);
  }

  async findById(id: string): Promise<RoleResponse> {
    return this.roleUseCases.findById(id);
  }

  async create(data: CreateRoleDto): Promise<RoleResponse> {
    return this.roleUseCases.create(data);
  }

  async update(id: string, data: UpdateRoleDto): Promise<RoleResponse> {
    return this.roleUseCases.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.roleUseCases.delete(id);
  }
}
