import { Role, CreateRoleDTO, UpdateRoleDTO } from '../entities/role.entity';
import { PaginatedResult, PaginationParams } from '../../../../shared/types';

export const IRoleRepository = Symbol('IRoleRepository');

export interface IRoleRepositoryInterface {
  findAll(pagination: PaginationParams): Promise<PaginatedResult<Role>>;
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  create(data: CreateRoleDTO): Promise<Role>;
  update(id: string, data: UpdateRoleDTO): Promise<Role>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
