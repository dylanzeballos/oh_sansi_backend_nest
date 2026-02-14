// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  // General
  INTERNAL_ERROR: 'Internal server error',
  BAD_REQUEST: 'Bad request',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',

  // Auth
  INVALID_CREDENTIALS: 'Invalid credentials',
  TOKEN_EXPIRED: 'Token expired',
  TOKEN_INVALID: 'Invalid token',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists',

  // Validation
  VALIDATION_ERROR: 'Validation error',
  INVALID_EMAIL: 'Invalid email format',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',

  // Roles
  ROLE_NOT_FOUND: 'Role not found',
  ROLE_ALREADY_EXISTS: 'Role already exists',
  CANNOT_DELETE_ROLE_WITH_USERS: 'Cannot delete role with associated users',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
} as const;

// Default Values
export const DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// API Version
export const API_VERSION = 'v1';
export const API_PREFIX = `api/${API_VERSION}`;

// JWT
export const JWT_CONSTANTS = {
  SECRET: process.env.JWT_SECRET || 'default-secret-change-me',
  EXPIRATION: process.env.JWT_EXPIRATION || '7d',
} as const;
