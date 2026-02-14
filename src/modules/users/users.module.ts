import { Module } from '@nestjs/common';
import { UsersController } from './interface/controllers/users.controller';
import { UserUseCases } from './application/use-cases/user.use-cases';
import { UsersService } from './application/services/users.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { IUserRepository } from './domain/repositories/user.repository.interface';
import { PrismaService } from '../../config/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UserUseCases,
    UsersService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    PrismaService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
