# ZOO Automation

AI-powered business automation platform. Custom automation solutions for companies.

## Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript + Prisma
- **Database:** PostgreSQL

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173
Backend runs on http://localhost:3001

## Demo Accounts
- Admin: admin@zootechnologies.com / admin123
- Client: demo@client.com / client123
