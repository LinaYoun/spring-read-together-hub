# 영어 원서 읽기 동아리 "Spring" 홈페이지

## Project Overview

본 프로젝트는 영어 원서 읽기 동아리 "Spring"을 위한 홈페이지를 구축합니다.
핵심 목표는 동아리 활동 정보의 비대칭 해소, 회원 참여도 향상, 운영 및 관리 업무의 자동화입니다.
주요 기능으로는 커뮤니티 기능, 자료 공유, 일정 관리가 있습니다.

## Project info

**URL**: https://lovable.dev/projects/449f5f3a-555b-4b34-b83b-ef37d4d7111b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/449f5f3a-555b-4b34-b83b-ef37d4d7111b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with a modern technology stack for both frontend and backend.

**Frontend Technical Stack:**

- **Framework**: React
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Radix UI 기반)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management/Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form, Zod (유효성 검사)
- **Date Handling**: date-fns, React Day Picker
- **Charts**: Recharts
- **Carousel**: Embla Carousel React
- **Toasts/Notifications**: Sonner
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting/Formatting**: ESLint, Prettier
- **Other Key Libraries**: `class-variance-authority`, `clsx`, `cmdk`, `input-otp`, `next-themes`, `react-resizable-panels`, `tailwind-merge`, `tailwindcss-animate`, `vaul`.

**Backend Technical Stack (Node.js & Express.js 중심):**

- **Runtime Environment**: Node.js (최신 LTS 버전 권장)
- **Web Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Passport.js (`passport-jwt` 전략 with RS256)
- **API Style**: RESTful API
- **Data Validation**: Zod
- **Security**: `helmet`, `cors`, Argon2id (password hashing), `express-rate-limit`
- **Package Manager**: npm or yarn
- **Version Control**: Git
- **Process Manager (Production)**: PM2
- **Testing**: Jest, Supertest
- **Logging**: Winston or Pino
- **Environment Variable Management**: `dotenv`

## How can I deploy this project?

**Frontend Deployment:**
- Vercel or any static site hosting platform.

**Backend (Node.js/Express.js) Deployment:**
- Directly on a server (e.g., AWS EC2, DigitalOcean Droplet, Heroku).

**Database (Supabase PostgreSQL):**
- Supabase cloud platform (Node.js backend connects directly).

**Storage (Supabase Storage):**
- Supabase cloud platform (accessed and controlled via the Node.js backend).

The Lovable platform deployment option mentioned below is specific to the Lovable environment.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Folder Structure

The project follows a monorepo structure (or can be individual repositories) to clearly separate frontend and backend concerns.

```
/spring-read-together-hub/  (Project Root)
├── apps/
│   ├── frontend/            # React/Vite based frontend application
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   ├── config/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   ├── styles/
│   │   │   └── types/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   └── backend/             # Node.js/Express.js based backend application
│       ├── src/
│       │   ├── app.ts
│       │   ├── config/
│       │   ├── common/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── users/
│       │   │   ├── posts/
│       │   │   ├── materials/
│       │   │   └── schedules/
│       │   ├── middlewares/
│       │   ├── jobs/        # Optional for scheduled tasks
│       │   └── swagger.ts   # Optional for API documentation
│       ├── prisma/
│       │   ├── migrations/
│       │   └── seed.ts
│       ├── tests/
│       │   ├── unit/
│       │   ├── integration/
│       │   └── e2e/
│       ├── package.json
│       ├── tsconfig.json
│       └── .env.example
├── packages/
│   └── shared-types/      # Optional: Shared TypeScript types (for monorepo)
│       ├── src/
│       └── package.json
├── .gitignore
├── README.md
└── package.json             # Root package.json for workspace management
```
