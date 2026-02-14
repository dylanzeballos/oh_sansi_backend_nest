import { User, CreateUserDTO, UpdateUserDTO } from '../entities/user.entity';
import { PaginatedResult, PaginationParams } from '../../../../shared/types';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepositoryInterface {
  findAll(pagination: PaginationParams): Promise<PaginatedResult<User>>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
