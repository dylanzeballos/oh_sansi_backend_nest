import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import type { IUserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';
import { QueryUserDto } from '../dto/query-user.dto';
import { User, UserResponse } from '../../domain/entities/user.entity';
import {
  hashPassword,
  getPaginationParams,
  createPaginatedResponse,
} from '../../../../shared/utils';
import { ERROR_MESSAGES } from '../../../../shared/constants';
import { PaginatedResult } from '../../../../shared/types';

@Injectable()
export class UserUseCases {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepositoryInterface,
  ) {}

  async findAll(query: QueryUserDto): Promise<PaginatedResult<UserResponse>> {
    const { page, limit } = getPaginationParams(query.page, query.limit);
    const result = await this.userRepository.findAll({ page, limit });

    return createPaginatedResponse(
      result.data.map((user) => this.mapToResponse(user)),
      result.meta.total,
      page,
      limit,
    );
  }

  async findById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return this.mapToResponse(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(data: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return this.mapToResponse(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponse> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (data.email && data.email !== existingUser.email) {
      const emailExists = await this.userRepository.findByEmail(data.email);
      if (emailExists) {
        throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      }
    }

    const user = await this.userRepository.update(id, data);
    return this.mapToResponse(user);
  }

  async delete(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    await this.userRepository.delete(id);
  }

  private mapToResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
