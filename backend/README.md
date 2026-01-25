# UzbekType Backend

Backend API for UzbekType typing test application.

## Status

🚧 **Coming Soon** - Backend is currently under development

## Planned Features

- User authentication (Google OAuth)
- Test results storage
- Leaderboard system
- User profiles
- Admin panel

## Tech Stack (Planned)

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Next.js API Routes or Express.js
- **Deployment**: Railway / Render / Vercel

## Current Files

- `/app/api` - API routes (disabled, will be migrated)
- `/app/profile` - Profile pages (disabled, will be migrated)
- `/app/admin` - Admin panel (disabled, will be migrated)
- `/lib/supabase.ts` - Supabase client configuration
- `/lib/mockAuth.ts` - Mock authentication (temporary)

## Setup (When Ready)

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## API Endpoints (Planned)

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/user/profile` - Get user profile
- `POST /api/test/result` - Save test result
- `GET /api/leaderboard` - Get leaderboard

---

**Note**: Backend kodlar hozirda ishlatilmaydi. Frontend localStorage bilan ishlaydi.
