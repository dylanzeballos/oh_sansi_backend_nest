import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoleUseCases } from '../../application/use-cases/role.use-cases';
import { CreateRoleDto, UpdateRoleDto } from '../../application/dto/create-role.dto';
import { QueryRoleDto } from '../../application/dto/query-role.dto';
import { RoleResponse } from '../../domain/entities/role.entity';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { PaginatedResult } from '../../../../shared/types';

@ApiTags('Roles')
@Controller('api/v1/roles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly roleUseCases: RoleUseCases) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles with pagination' })
  @ApiResponse({ status: 200, description: 'Roles retrieved successfully' })
  async findAll(@Query() query: QueryRoleDto): Promise<PaginatedResult<RoleResponse>> {
    return this.roleUseCases.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiResponse({ status: 200, description: 'Role retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async findById(@Param('id') id: string): Promise<RoleResponse> {
    return this.roleUseCases.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 409, description: 'Role already exists' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponse> {
    return this.roleUseCases.create(createRoleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: 200, description: 'Role updated successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponse> {
    return this.roleUseCases.update(id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({ status: 204, description: 'Role deleted successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.roleUseCases.delete(id);
  }
}
