export interface Role {
  id: string;
  name: string;
  description?: string | null;
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreateRoleDTO {
  name: string;
  description?: string;
  permissions?: string[];
}

export interface UpdateRoleDTO {
  name?: string;
  description?: string;
  permissions?: string[];
  isActive?: boolean;
}

export interface RoleResponse {
  id: string;
  name: string;
  description?: string | null;
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
