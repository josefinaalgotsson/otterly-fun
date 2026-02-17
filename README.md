# Otterly Fun Swim School 🦦

A swimming school website built with **Next.js 14** and **self-hosted Supabase**. Features course browsing, online booking, and a trainer dashboard.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend:** Self-hosted Supabase (PostgreSQL 15, PostgREST, GoTrue Auth)
- **Email:** Resend
- **Validation:** Zod

## Prerequisites

- **Node.js** ≥ 20
- **Docker** (e.g. Docker Desktop or Rancher Desktop)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example values in `.env.local` and replace the placeholders:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
RESEND_API_KEY=<your-resend-api-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The JWT secret and Supabase keys must match the values configured in `supabase/docker-compose.yml`. You can generate keys at [supabase.com/docs/guides/self-hosting#api-keys](https://supabase.com/docs/guides/self-hosting/docker#api-keys).

### 3. Start Supabase (Docker)

```bash
cd supabase
docker compose up -d
```

This starts PostgreSQL, PostgREST, GoTrue (auth), Kong (API gateway), Supabase Studio, and postgres-meta.

| Service          | URL                        |
| ---------------- | -------------------------- |
| API Gateway      | http://localhost:8000       |
| Supabase Studio  | http://localhost:3100       |
| PostgreSQL       | localhost:5432              |

The SQL migrations in `supabase/migrations/` run automatically on first start (mounted into the Postgres init directory).

### 4. Seed the database (optional)

```bash
psql -h localhost -U postgres -d otterly_fun -f supabase/seed.sql
```

Default password: `your-super-secret-password` (change this in production).

This inserts a sample trainer, 4 courses, and 8 sessions.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start development server       |
| `npm run build` | Production build               |
| `npm run start` | Start production server        |
| `npm run lint`  | Run ESLint                     |

## Project Structure

```
src/
  app/              # Next.js App Router pages & API routes
    api/             # REST endpoints (bookings, courses, sessions, etc.)
    courses/         # Public course pages & booking flow
    dashboard/       # Trainer dashboard (login, sessions, logs)
    schedule/        # Weekly schedule view
  components/        # Reusable React components
  lib/               # Supabase clients, email, validation schemas
  types/             # TypeScript type definitions
supabase/
  docker-compose.yml # Self-hosted Supabase stack
  migrations/        # SQL migrations (run on first DB start)
  seed.sql           # Sample data
```

## Trainer Dashboard

Navigate to `/dashboard/login` and sign in with a trainer account. The default seed data creates a trainer with email `trainer@otterlyfun.se` — you must first create a matching auth user via Supabase Studio (http://localhost:3100) or the GoTrue API.
