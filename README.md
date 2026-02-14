# OH Sansi Backend - NestJS Clean Architecture

A robust NestJS backend application built with Clean Architecture principles, featuring PostgreSQL database, Prisma ORM, JWT authentication, and Swagger API documentation.

## Architecture

The project follows Clean Architecture with clear separation of concerns:

```
src/
├── common/              # Shared utilities (filters, guards, interceptors, decorators, pipes)
├── config/             # Configuration (Prisma service, logger)
├── modules/            # Feature modules
│   ├── users/         # Users module
│   │   ├── domain/   # Entities, repository interfaces
│   │   ├── application/ # DTOs, use cases, services
│   │   ├── infrastructure/ # Repository implementations
│   │   └── interface/ # Controllers, presenters
│   └── roles/        # Roles module
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── interface/
└── shared/            # Shared utilities, constants, types
```

## Tech Stack

- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6
- **Authentication**: JWT (Passport)
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger (OpenAPI)
- **Testing**: Jest

## Prerequisites

- Node.js 18+
- PostgreSQL 16+
- Docker & Docker Compose (optional)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy the environment file:

```bash
cp .env.example .env
```

4. Update `.env` with your database credentials

## Database Setup

### Using Docker

```bash
# Start PostgreSQL container
npm run docker:up

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### Without Docker

1. Create a PostgreSQL database
2. Update DATABASE_URL in `.env`
3. Run:

```bash
npm run prisma:generate
npm run prisma:migrate
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000/api/v1`

## API Documentation

Swagger documentation is available at: `http://localhost:3000/api/docs`

## Available Scripts

```bash
npm run build           # Build the application
npm run start           # Start the application
npm run start:dev       # Start with hot-reload
npm run start:debug    # Start with debugger
npm run start:prod     # Start production build
npm run lint           # Lint and fix code
npm run test           # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:cov      # Run tests with coverage
npm run test:e2e     # Run e2e tests
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:studio    # Open Prisma Studio
npm run docker:up        # Start Docker containers
npm run docker:down      # Stop Docker containers
```

## API Endpoints

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/v1/users | Get all users (paginated) | Yes |
| GET | /api/v1/users/:id | Get user by ID | Yes |
| POST | /api/v1/users | Create user | No |
| PUT | /api/v1/users/:id | Update user | Yes |
| DELETE | /api/v1/users/:id | Delete user | Yes |

### Roles

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/v1/roles | Get all roles (paginated) | Yes |
| GET | /api/v1/roles/:id | Get role by ID | Yes |
| POST | /api/v1/roles | Create role | Yes |
| PUT | /api/v1/roles/:id | Update role | Yes |
| DELETE | /api/v1/roles/:id | Delete role | Yes |

## Pagination

All list endpoints support pagination:

```
GET /api/v1/users?page=1&limit=10
```

Response:

```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Authentication

The API uses JWT Bearer token authentication. To access protected endpoints:

1. Create a user (POST /api/v1/users)
2. Include the token in subsequent requests:

```
Authorization: Bearer <your-jwt-token>
```

## Project Structure Details

### Domain Layer
- **Entities**: Business objects (User, Role)
- **Repository Interfaces**: Abstract data access contracts

### Application Layer
- **DTOs**: Data Transfer Objects for validation
- **Use Cases**: Business logic implementation
- **Services**: Application services coordinating use cases

### Infrastructure Layer
- **Repository Implementations**: Concrete database access

### Interface Layer
- **Controllers**: HTTP request handlers
- **Presenters**: Response formatting

## License

UNLICENSED
