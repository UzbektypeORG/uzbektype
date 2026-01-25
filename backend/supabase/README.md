# Supabase Database Setup

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if you don't have one)
4. Create a new project:
   - Give it a name (e.g., "uzbektype")
   - Choose a database password (save this!)
   - Select a region (closest to your users)
   - Click "Create new project"

## 2. Run the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy the entire contents of `schema.sql` file
4. Paste it into the SQL editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. Verify that tables were created:
   - Go to **Table Editor** (left sidebar)
   - You should see `users` and `test_results` tables

## 3. Get Your API Credentials

1. Go to **Project Settings** (gear icon in left sidebar)
2. Click on **API** in the settings menu
3. Copy the following values:

   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGc...` (long string)

## 4. Configure Your Local Environment

1. Create a `.env.local` file in your project root (copy from `.env.local.example`)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 5. Test the Connection

Run your Next.js dev server:

```bash
npm run dev
```

The app should now be able to connect to Supabase!

## Database Tables

### `users`
- `id` (UUID, Primary Key)
- `email` (TEXT, Unique)
- `username` (TEXT, Unique)
- `display_name` (TEXT, Nullable)
- `avatar_url` (TEXT, Nullable)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### `test_results`
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users)
- `language` (TEXT: uz, en, ru)
- `test_type` (TEXT: 10s, 30s, 60s, 10w, 30w, 60w)
- `difficulty` (TEXT: easy, medium, hard)
- `wpm` (INTEGER)
- `accuracy` (DECIMAL)
- `stars` (INTEGER: 0-5)
- `correct_chars` (INTEGER)
- `incorrect_chars` (INTEGER)
- `total_chars` (INTEGER)
- `time_elapsed` (DECIMAL)
- `created_at` (Timestamp)

## API Routes

### Test Results
- **POST** `/api/test-results` - Save a test result
- **GET** `/api/test-results?userId=xxx` - Get user's test results

### Leaderboard
- **GET** `/api/leaderboard?testType=30s&difficulty=medium&timeRange=week` - Get leaderboard

### Users
- **POST** `/api/users` - Create a user
- **GET** `/api/users?username=xxx` - Get user profile

## Notes

- Row Level Security (RLS) is enabled for better security
- All timestamps are in UTC
- The schema includes indexes for better query performance
- Free tier limits: 500MB database, 2GB bandwidth/month
