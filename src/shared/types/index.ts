// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Response wrapper types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

// JWT Payload
export interface JwtPayload {
  sub: string;
  email: string;
  roleId?: string;
}

// Request user type
export interface RequestUser {
  id: string;
  email: string;
  roleId?: string;
  roleName?: string;
}

// Soft delete interface
export interface SoftDeletable {
  deletedAt: Date | null;
}
