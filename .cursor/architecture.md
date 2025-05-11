# Software Architecture Document: Spring Read Together Hub

## 1. Introduction

### 1.1 Purpose
This document outlines the software architecture for the "Spring Read Together Hub" web application, a platform for an English book reading club. It details the architectural decisions, components, and interactions based on the requirements specified in the [PRD (Product Requirements Document)](../../code/spring-read-together-hub/docs/prd.md).

### 1.2 Scope
The scope covers the frontend, backend, database, and interactions with external services for the core functionalities defined in the PRD, including user management, content management, calendar/scheduling, communication (Sudabang), and admin functions.

### 1.3 Architectural Goals
- **Modularity:** Clearly separated frontend and backend components.
- **Maintainability:** Well-defined structure, consistent coding practices, and clear separation of concerns.
- **Scalability:** While initial deployment might be on a smaller scale, the architecture should allow for future scaling of backend services.
- **Security:** Robust authentication, authorization, and data protection mechanisms as per PRD.
- **User Experience:** Responsive design and efficient data handling for a smooth user experience.

### 1.4 Constraints
- Adherence to the technology stack specified in the PRD.
- Specific non-goals like real-time chat, payment systems, and advanced permission systems beyond the defined roles (Admin, Librarian, Member, Potential Member).
- Fixed password for users ('test123'), fixed admin email (`00@gmail.com`).

## 2. Architectural Style

The system will follow a **Client-Server architectural style** with a **Layered Architecture** for the backend.
- **Client (Frontend):** A Single Page Application (SPA) built with React.
- **Server (Backend):** A Node.js/Express.js application providing a RESTful API.
- **Database:** Supabase (PostgreSQL) as the primary data store.
- **External Services:** Supabase Storage for file uploads, and an external SMTP service for email notifications.

This model clearly separates user interface concerns (frontend) from business logic and data management (backend).

## 3. System Components

### 3.1 Frontend Application
- **Description:** User-facing interface responsible for presentation logic and user interaction.
- **Technology Stack:** As per PRD Section 8 (React, TypeScript, Vite, Tailwind CSS, React Router DOM, TanStack React Query, shadcn/ui, etc.).
- **Key Responsibilities:**
    - Rendering UI components.
    - Handling user input and events.
    - Communicating with the backend API for data.
    - Managing client-side state.
    - Implementing responsive design.

### 3.2 Backend Application (API Server)
- **Description:** Core application logic, data processing, and API provision.
- **Technology Stack:** As per PRD Section 8 (Node.js, Express.js, TypeScript, Prisma ORM, Passport.js for authentication, Zod for validation, Argon2id for hashing, etc.).
- **Key Responsibilities:**
    - Exposing RESTful API endpoints.
    - Implementing business logic for all features (user management, content, schedule, Sudabang).
    - Handling authentication (JWT) and authorization (RBAC).
    - Interacting with the database (Supabase/PostgreSQL via Prisma).
    - Interacting with Supabase Storage for file management.
    - Sending emails via an SMTP service (Nodemailer).
    - Implementing security measures (password hashing, rate limiting, Helmet).
- **Layered Structure (within backend):**
    - **Presentation/Routes Layer:** Handles HTTP requests, routes them to appropriate controllers. (Express.js routes)
    - **Controller Layer:** Parses requests, validates input (using DTOs and validation libraries like Zod), calls services, and formats responses.
    - **Service Layer:** Contains business logic, orchestrates operations, interacts with data access layers or other services.
    - **Data Access Layer (Repository/DAL):** Interacts with the database using an ORM (Prisma).
    - **Common/Utilities Layer:** Shared functionalities like logging, error handling, constants, types.

### 3.3 Database
- **Description:** Persistent storage for all application data.
- **Technology:** Supabase (PostgreSQL).
- **Key Data Entities (derived from PRD):**
    - `Users` (id, name, username(ID), password_hash, email, phone_number, role, created_at, updated_at)
    - `Roles` (id, name) - e.g., Admin, Librarian, Member
    - `Posts` (id, title, content, user_id, board_type, created_at, updated_at) - For various boards: free, book reviews, announcements.
    - `Materials` (id, title, description, file_url, file_type, uploader_id, created_at) - For documents, images, videos.
    - `Schedules` (id, title, description, start_time, end_time, location, created_by_id, created_at, updated_at)
    - `SudabangMessages` (id, content, user_id, created_at)
    - `Comments` (id, content, user_id, parent_id (for Sudabang messages or posts), created_at)
    - `ReadBooks` (id, title, author, cover_image_url, read_date) - For club history.

### 3.4 External Services
- **Supabase Storage:** For storing user-uploaded files (documents, images, videos up to 500MB as per PRD). Accessed via Node.js backend for metadata management and potentially access control.
- **Email Service (e.g., SendGrid, Resend via Nodemailer):** For sending notifications, such as new member registration alerts to admins (fixed email `00@gmail.com`).

## 4. Technology Stack Summary

### 4.1 Frontend
- **Framework**: React
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Radix UI 기반)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management/Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form, Zod (유효성 검사)
- **Date Handling**: date-fns, React Day Picker
- **Build Tool**: Vite
- **Key Libraries**: `class-variance-authority`, `clsx`, `lucide-react`, etc. (as per PRD)

### 4.2 Backend
- **Runtime Environment**: Node.js (LTS)
- **Web Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Passport.js (`passport-jwt` strategy using RS256)
- **Data Validation**: Zod
- **Password Hashing**: Argon2id
- **Security Middleware**: Helmet, `express-rate-limit`
- **Email**: Nodemailer
- **Logging**: Winston or Pino
- **API Documentation**: Swagger (OpenAPI) via `tsoa` or `swagger-jsdoc`

## 5. Data Management and Flow

### 5.1 Data Model
- The data model will be defined using Prisma schema (`schema.prisma`) reflecting the entities in section 3.3.
- Relationships (one-to-many, many-to-many) will be defined (e.g., User-Posts, Post-Comments, User-Schedules, User-Role).

### 5.2 Data Flow Examples
- **User Registration (with 'test123' password):**
    1.  Potential member fills form (name, ID, email, phone, selects role type [사서/일반회원], enters 'test123' as 가입 암호) on Frontend.
    2.  Frontend sends data to Backend API (e.g., `/api/auth/register`).
    3.  Backend:
        a.  Validates data using Zod (checks for 'test123' in a specific field if used as an invite code).
        b.  Hashes the fixed password 'test123' using Argon2id.
        c.  Creates user in DB via Prisma with the chosen role (if invite code is valid) or a default 'pending_approval' role.
        d.  Sends email notification to admin (`00@gmail.com`).
    4.  If admin approval is needed, Admin uses admin panel to approve, changing user's role to 'Member' or 'Librarian'.
- **Content Creation (e.g., New Board Post):**
    1.  Authenticated 'Member' creates a post on Frontend.
    2.  Frontend sends post data (title, content, board_type) along with JWT to Backend API (e.g., `/api/posts`).
    3.  Backend:
        a.  Validates JWT (authenticates user, extracts `userId` and `role`).
        b.  Authorizes action based on role.
        c.  Validates post data using Zod.
        d.  Saves post to DB via Prisma, associating it with `userId`.
- **File Upload (Material to 자료실):**
    1.  Authenticated 'Member' selects file and provides description on Frontend.
    2.  Frontend sends file and metadata to a Backend API endpoint (e.g., `/api/materials/upload`).
    3.  Backend (using `multer` for handling multipart/form-data):
        a.  Validates JWT and authorizes.
        b.  Streams file to Supabase Storage (or uploads directly if Supabase SDK allows server-side uploads securely).
        c.  On successful upload to Supabase Storage, gets the file URL.
        d.  Saves material metadata (title, description, Supabase URL, file_type, uploader_id) to application DB via Prisma.

## 6. Authentication and Authorization

### 6.1 Authentication
- **Mechanism:** JWT-based.
- **Tokens:**
    - **Access Token:** RS256 signed, short-lived (e.g., 15 minutes - 1 hour). Stored in JavaScript memory on the client. Payload includes minimal claims like `userId`, `role`.
    - **Refresh Token:** Long-lived (e.g., 7 - 30 days). Stored in an `httpOnly`, `Secure` cookie with `SameSite=Strict` (or `Lax`). Used exclusively to obtain new Access Tokens.
- **Login Flow (`admin/admin` or registered user):**
    1.  User submits credentials (ID, password) via Frontend.
    2.  Backend API (`/api/auth/login`) receives credentials.
    3.  Backend validates credentials against DB (hashes submitted password and compares with stored hash).
    4.  If valid, generates an Access Token and a Refresh Token.
    5.  Access Token is sent in the JSON response body. Refresh Token is sent via an `httpOnly`, `Secure` cookie.
- **Token Refresh:** Frontend sends Refresh Token (automatically via cookie) to `/api/auth/refresh` to get a new Access Token.
- **Password Hashing:** Argon2id with unique salts per password (though PRD states fixed password 'test123' for general users initially, admin password is 'admin').

### 6.2 Authorization
- **Mechanism:** Role-Based Access Control (RBAC).
- **Roles (as per PRD section 2 & 4.1):**
    1.  **Admin:** Full control (content, users except deleting own, librarians, settings). Fixed ID/Pass: `admin/admin`. Cannot be deleted by Librarian.
    2.  **Librarian (사서):** Schedule management (CRUD), member deletion.
    3.  **Member (동아리 회원):** Access most features (boards, materials, view calendar, Sudabang). Can edit/delete own posts/comments.
    4.  **Potential Member (잠재 회원/비회원):** View public info (e.g., introduction page). Can apply for membership.
- **Implementation:**
    - User's role stored in `Users` table.
    - Role claim included in JWT Access Token.
    - Backend API endpoints are protected by middleware (e.g., in Express.js) that:
        a.  Verifies JWT.
        b.  Checks the user's role against the permissions required for the specific resource/action.

## 7. API Design

- **Style:** RESTful API.
- **Format:** JSON for request and response bodies.
- **Authentication:** `Authorization: Bearer <accessToken>` header for protected routes.
- **Versioning:** Consider prefixing routes with `/api/v1/`.
- **Key Endpoint Groups (examples):**
    - `POST /api/v1/auth/register` (User registration)
    - `POST /api/v1/auth/login` (User login)
    - `POST /api/v1/auth/refresh-token` (Refresh access token)
    - `GET /api/v1/users/me` (Get current user's profile)
    - `PUT /api/v1/users/me` (Update current user's profile)
    - `GET /api/v1/users` (Admin: list users)
    - `PUT /api/v1/users/:userId/role` (Admin: update user role - for approval)
    - `DELETE /api/v1/users/:userId` (Librarian: delete user)
    - `GET /api/v1/posts?boardType=<type>` (List posts for a board)
    - `POST /api/v1/posts` (Create post)
    - `GET /api/v1/posts/:postId` (Get single post)
    - `PUT /api/v1/posts/:postId` (Update own post)
    - `DELETE /api/v1/posts/:postId` (Delete own post)
    - `POST /api/v1/materials` (Upload material)
    - `GET /api/v1/materials?type=<fileType>` (List materials)
    - `GET /api/v1/schedules` (List schedules)
    - `POST /api/v1/schedules` (Admin/Librarian: Create schedule)
    - `PUT /api/v1/schedules/:scheduleId` (Admin/Librarian: Update schedule)
    - `DELETE /api/v1/schedules/:scheduleId` (Admin/Librarian: Delete schedule)
    - `GET /api/v1/sudabang` (List Sudabang messages)
    - `POST /api/v1/sudabang` (Create Sudabang message)
    - `GET /api/v1/pages/introduction` (Get introduction page content)

## 8. Deployment Architecture

### 8.1 Frontend (React Application)
- **Platform:** Vercel (or similar static hosting / Jamstack deployment platform like Netlify, AWS Amplify).
- **Process:** CI/CD pipeline (e.g., GitHub Actions) triggers on push to `main`/`develop`, builds the React app (Vite build), and deploys static assets.

### 8.2 Backend (Node.js/Express.js API)
- **Platform:** Self-hosted server (e.g., VPS like DigitalOcean, Linode, AWS EC2) or a PaaS that supports Node.js (e.g., Heroku, Render, Fly.io). Docker containers managed by PM2 or a container orchestration service (Kubernetes if scaling demands).
- **Process:** CI/CD pipeline builds the application (compiles TypeScript, installs dependencies), creates a Docker image (optional but recommended), and deploys to the chosen platform. PM2 is used to manage the Node.js process.
- **Environment Variables:** Managed securely using platform-specific mechanisms or tools like HashiCorp Vault (for larger setups). `.env` files for local development only.

### 8.3 Database (Supabase PostgreSQL)
- **Platform:** Supabase cloud platform. Node.js backend connects directly using connection strings.

### 8.4 Storage (Supabase Storage)
- **Platform:** Supabase cloud platform. Accessed by the Node.js backend.

## 9. Security Considerations
(Summarized from PRD Section 5 and Backend Tech Stack, in addition to standard best practices)

- **Secure JWT Implementation:**
    - Use RS256 with securely managed public/private keys.
    - Include only necessary, non-sensitive information in JWT claims (`userId`, `role`).
    - Short expiration for Access Tokens; implement robust Refresh Token rotation/invalidation.
    - Secure storage: Access Tokens in JS memory; Refresh Tokens in `httpOnly`, `Secure`, `SameSite=Strict` cookies.
    - Rigorous token validation (signature, expiration, claims) on every protected API request.
- **Password Management:**
    - Use Argon2id for hashing passwords.
    - Unique salt for each password, managed by the hashing library.
    - (Note: PRD specifies fixed passwords 'test123' for users and 'admin/admin' for admin; hashing is still crucial for any future password changes or for securing the fixed password itself in the DB).
- **Secure Login Endpoint:**
    - Enforce HTTPS for all authentication traffic.
    - Implement anti-CSRF tokens for login forms if not an SPA with token-based auth only.
    - Ensure cookies have `Secure`, `HttpOnly`, and `SameSite` attributes.
    - Implement Content Security Policy (CSP) headers.
- **Rate Limiting:**
    - Apply `express-rate-limit` for API endpoints, especially authentication and sensitive operations (e.g., PRD: 5 per minute).
- **General Security Measures:**
    - **HTTPS Everywhere:** Enforce HTTPS for all client-server communication.
    - **Input Validation:** Use Zod meticulously for all incoming data (body, params, query) on the backend.
    - **Output Encoding:** Ensure proper encoding for data displayed on the frontend to prevent XSS (React handles much of this by default).
    - **SQL Injection Prevention:** Prisma (ORM) helps prevent SQL injection by using parameterized queries.
    - **HTTP Security Headers:** Use `helmet` to set various security-related HTTP headers.
    - **CORS (Cross-Origin Resource Sharing):** Configure `cors` middleware on the backend to allow requests only from trusted frontend origins.
    - **Error Handling:** Avoid leaking sensitive error details to the client. Log detailed errors on the server.
    - **Dependency Management:** Regularly update dependencies to patch known vulnerabilities. Use tools like `npm audit` or Snyk.
    - **Environment Variable Security:** Store sensitive configuration (API keys, DB credentials, JWT secrets) in environment variables, not in code.

## 10. Project Structure (Monorepo Approach)
The project will adopt a monorepo structure (e.g., using `pnpm workspaces`, `yarn workspaces`, or `Turborepo`) as outlined in PRD Section 8.1.

```plaintext
/spring-read-together-hub/  (Project Root)
├── apps/
│   ├── frontend/            # React/Vite (see PRD for internal structure)
│   └── backend/             # Node.js/Express.js (see PRD for internal structure)
├── packages/
│   └── shared-types/      # Optional: TypeScript types shared between frontend/backend
│       ├── src/
│       └── package.json
├── .gitignore
├── README.md
└── package.json             # Root package.json for workspace management
```
Refer to PRD Section 8.1 for detailed proposed internal structures of `frontend` and `backend` directories.

## 11. Future Considerations
(As listed in PRD Section 11)
- Password find/reset functionality.
- Enhanced notification system (e.g., for schedule updates, new posts).
- Advanced comment features (e.g., threading, edit history).
- Global search functionality across the platform.
- User-specific activity tracking/history.
- Potential mobile application development.
- If "Sudabang" requires more immediate updates than polling allows, consider WebSocket (`socket.io`, `ws`) or Server-Sent Events (SSE). 