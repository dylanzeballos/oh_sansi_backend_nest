import { Module } from '@nestjs/common';
import { RolesController } from './interface/controllers/roles.controller';
import { RoleUseCases } from './application/use-cases/role.use-cases';
import { RolesService } from './application/services/roles.service';
import { RoleRepository } from './infrastructure/repositories/role.repository';
import { IRoleRepository } from './domain/repositories/role.repository.interface';
import { PrismaService } from '../../config/prisma.service';

@Module({
  controllers: [RolesController],
  providers: [
    RoleUseCases,
    RolesService,
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
    PrismaService,
  ],
  exports: [RolesService],
})
export class RolesModule {}
