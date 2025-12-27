# GearGuard Backend

Node.js + Express + TypeScript + Prisma (PostgreSQL)

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Set up environment variables**:
    - Copy `.env.example` to `.env`
    - Update `DATABASE_URL` with your PostgreSQL connection string.
    - Update `JWT_SECRET` with a secure key.

3.  **Run migrations**:
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Start development server**:
    ```bash
    npm run dev
    ```

## Features

-   **Authentication**: JWT-based login and registration.
-   **Equipment Management**: CRUD operations for maintenance equipment.
-   **Teams**: Maintenance team management and membership.
-   **Requests**: Kanban and Calendar-based maintenance request tracking.

## API Endpoints

-   `POST /api/auth/register` - New user registration
-   `POST /api/auth/login` - User login
-   `GET /api/auth/me` - Current user profile
-   `GET /api/equipment` - List all equipment
-   `GET /api/teams` - List all maintenance teams
-   `GET /api/requests` - List all maintenance requests
-   `PATCH /api/requests/:id/status` - Update request status (Kanban move)
