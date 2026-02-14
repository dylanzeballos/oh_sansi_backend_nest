import { Injectable } from '@nestjs/common';
import { UserUseCases } from '../use-cases/user.use-cases';
import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';
import { QueryUserDto } from '../dto/query-user.dto';
import { UserResponse } from '../../domain/entities/user.entity';
import { PaginatedResult } from '../../../../shared/types';

@Injectable()
export class UsersService {
  constructor(private readonly userUseCases: UserUseCases) {}

  async findAll(query: QueryUserDto): Promise<PaginatedResult<UserResponse>> {
    return this.userUseCases.findAll(query);
  }

  async findById(id: string): Promise<UserResponse> {
    return this.userUseCases.findById(id);
  }

  async create(data: CreateUserDto): Promise<UserResponse> {
    return this.userUseCases.create(data);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponse> {
    return this.userUseCases.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.userUseCases.delete(id);
  }
}
