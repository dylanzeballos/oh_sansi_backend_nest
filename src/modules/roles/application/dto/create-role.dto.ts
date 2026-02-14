import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Administrator role' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: ['read', 'write', 'delete'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];
}

export class UpdateRoleDto {
  @ApiPropertyOptional({ example: 'admin' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Administrator role' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: ['read', 'write', 'delete'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
