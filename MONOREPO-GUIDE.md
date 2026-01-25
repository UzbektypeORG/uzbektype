# 📦 Monorepo Qo'llanma

UzbekType loyihasi endi monorepo strukturasiga ega - bitta repository ichida frontend va backend!

## 📁 Struktura

```
uzbektype/                    # Root papka
│
├── frontend/                 # Next.js frontend
│   ├── app/                 # Pages va routing
│   ├── components/          # React komponentlar
│   ├── lib/                 # Yordamchi funksiyalar
│   ├── public/              # Static fayllar
│   ├── types/               # TypeScript types
│   ├── package.json         # Frontend dependencies
│   ├── next.config.ts       # Next.js config
│   ├── tailwind.config.ts   # Tailwind config
│   └── README.md            # Frontend qo'llanma
│
├── backend/                  # Backend API (Coming Soon)
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── admin/          # Admin panel
│   │   └── profile/        # Profile pages
│   ├── lib/
│   │   ├── supabase.ts     # Supabase client
│   │   └── mockAuth.ts     # Mock auth
│   ├── package.json         # Backend dependencies
│   └── README.md            # Backend qo'llanma
│
├── README-MONOREPO.md       # Asosiy qo'llanma
├── MONOREPO-GUIDE.md        # Bu fayl
└── .gitignore-monorepo      # Monorepo gitignore

# Qolgan eski fayllar (o'chirish kerak):
├── app/                     # OLD - frontend/app ga ko'chirildi
├── components/              # OLD - frontend/components ga ko'chirildi
├── lib/                     # OLD - frontend/lib ga ko'chirildi
└── ...
```

## 🚀 Ishga Tushirish

### Frontend (Hozirda ishlaydi)

```bash
cd frontend
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) da ochiladi

### Backend (Keyinroq)

```bash
cd backend
npm install
# Backend setup keyin bo'ladi
```

## 🔄 Git Setup

### Variant 1: Bitta Repo (Monorepo)

```bash
# Root'da git init
git init
mv .gitignore-monorepo .gitignore
mv README-MONOREPO.md README.md

# Eski fayllarni o'chirish
rm -rf app components lib public types
rm package.json package-lock.json next.config.ts tsconfig.json
rm tailwind.config.ts postcss.config.mjs components.json

# Commit
git add .
git commit -m "feat: monorepo structure with frontend and backend"
git remote add origin https://github.com/yourusername/uzbektype.git
git push -u origin main
```

### Variant 2: Ikki Alohida Repo (Tavsiya)

#### Frontend Repo:

```bash
cd frontend
git init
git add .
git commit -m "Initial commit: UzbekType frontend"
git remote add origin https://github.com/yourusername/uzbektype-frontend.git
git push -u origin main
```

#### Backend Repo (Keyinroq):

```bash
cd backend
git init
git add .
git commit -m "Initial commit: UzbekType backend"
git remote add origin https://github.com/yourusername/uzbektype-backend.git
git push -u origin main
```

## 📦 Deploy Qilish

### Frontend → Vercel

1. **GitHub'ga push qilish:**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Deploy: Frontend ready"
   git remote add origin https://github.com/yourusername/uzbektype-frontend.git
   git push -u origin main
   ```

2. **Vercel'ga ulash:**
   - [vercel.com](https://vercel.com) da login
   - "New Project" bosing
   - GitHub repo tanlang
   - Root Directory: `frontend` (agar monorepo bo'lsa)
   - Deploy tugmasini bosing
   - ✅ Tayyor!

### Backend → Railway/Render (Keyinroq)

Backend tayyor bo'lgandan keyin deploy qilamiz.

## 🔧 Tozalash

Agar alohida frontend repo ochmoqchi bo'lsangiz:

```bash
# uzbektype papkasidan chiqing
cd /Users/shavkatovff/Desktop

# Frontend'ni alohida papkaga ko'chiring
cp -r uzbektype/frontend uzbektype-frontend

# uzbektype-frontend'ni git repo qiling
cd uzbektype-frontend
git init
git add .
git commit -m "Initial commit: UzbekType frontend"

# GitHub'ga push
git remote add origin https://github.com/yourusername/uzbektype-frontend.git
git push -u origin main

# Vercel'ga deploy
```

## ✅ Keyingi Qadamlar

1. **Frontend Deploy** (Hozir)
   - [ ] GitHub'ga push
   - [ ] Vercel'ga deploy
   - [ ] Domain ulash (ixtiyoriy)

2. **Backend Development** (Keyinroq)
   - [ ] Supabase loyiha yaratish
   - [ ] Database schema yaratish
   - [ ] API routes yozish
   - [ ] Authentication setup
   - [ ] Deploy qilish

3. **Integration**
   - [ ] Frontend'da API_URL sozlash
   - [ ] Environment variables
   - [ ] CORS sozlash
   - [ ] Test qilish

## 📝 Eslatmalar

- **Frontend** - To'liq tayyor, darhol deploy qilish mumkin
- **Backend** - Hali development bosqichida
- **Eski fayllar** - Root'dagi eski app/, components/ kabilarni o'chirishingiz mumkin
- **Git** - Ikki alohida repo ochish tavsiya qilinadi

## 💡 Maslahatlar

1. Frontend'ni darhol deploy qiling - u ishlaydi!
2. Backend'ni asta-sekin rivojlantiring
3. GitHub'da ikki alohida repo oching:
   - `uzbektype-frontend` (public)
   - `uzbektype-backend` (private yoki public)

---

**Savollar?** Issues ochib yozing!
