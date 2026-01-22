# Cricket Club Directory Platform

A comprehensive platform for discovering cricket clubs across England and Wales, built for the England and Wales Cricket Board (ECB).

## 🎯 Project Overview

This platform helps the public find suitable cricket clubs, sessions, and content while providing clubs with a powerful online presence through customizable widget-based profiles. It's designed to evolve into a white-label product for similar sports organizations.

## ✨ Features

- **Smart Search & Discovery**: Filter clubs by location, age group, skill level, and facilities
- **Dynamic Club Profiles**: Widget-based profiles similar to Linktree but cricket-specific
- **8 Standard Widgets**:
  - Upcoming Events
  - YouTube Videos
  - TikTok Videos
  - Teams & Rosters
  - Join Club Form
  - Location Maps
  - Amenities & Facilities
  - Member Reviews
- **Verified Clubs**: ECB-verified club listings
- **Responsive Design**: Mobile-first, accessible UI
- **Type-Safe**: Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** with App Router
- **React 18** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components

### Backend
- **Prisma** ORM with PostgreSQL
- **Next.js API Routes** for backend logic
- **React Query** for data fetching (planned)

### Development
- **Faker.js** for dummy data generation
- **ESLint** for code linting
- **Prettier** for code formatting

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or use a cloud provider like Supabase, Neon, etc.)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd claudecode
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update the `DATABASE_URL` with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cricket_clubs?schema=public"
```

### 4. Set up the database

Generate Prisma client:

```bash
npm run db:generate
```

Push the schema to your database:

```bash
npm run db:push
```

Seed the database with dummy data:

```bash
npm run db:seed
```

This will create 30 cricket clubs with full data including venues, offerings, teams, events, and reviews.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
claudecode/
├── app/                      # Next.js app directory
│   ├── (public)/            # Public-facing routes
│   │   ├── clubs/[slug]/    # Club profile pages
│   │   └── search/          # Search page
│   ├── api/                 # API routes
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── widgets/             # Widget components
│   ├── layouts/             # Layout components
│   └── forms/               # Form components
├── lib/
│   ├── services/            # Business logic
│   ├── db.ts                # Prisma client
│   ├── utils.ts             # Utility functions
│   └── dummy-data.ts        # Data generators
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed script
├── types/                   # TypeScript types
├── config/                  # Configuration files
└── public/                  # Static assets
```

## 🎨 Key Pages

- **`/`** - Homepage with hero and features
- **`/search`** - Club search and discovery with filters
- **`/clubs/[slug]`** - Individual club profile pages

## 🧩 Widget System

The platform uses a modular widget architecture. Each club can customize their profile by enabling/disabling and reordering widgets.

### Creating a New Widget

1. Create component in `components/widgets/`
2. Define widget settings interface in `types/index.ts`
3. Register widget in `config/widgets.ts`
4. Add widget to club profile page

Example widget structure:

```typescript
export function MyWidget({ data, settings }: WidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Widget Title</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Widget content */}
      </CardContent>
    </Card>
  )
}
```

## 🗄️ Database Schema

Key models:
- **Club**: Main club entity with profile information
- **Venue**: Physical locations with amenities
- **Offering**: Programs and sessions
- **Team**: Club teams with rosters
- **Event**: Upcoming matches and events
- **Review**: Member reviews and ratings

See `prisma/schema.prisma` for the full schema.

## 🧪 Development Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with dummy data
npm run db:studio        # Open Prisma Studio
```

## 📝 Code Conventions

- **TypeScript strict mode** enabled
- **Server Components** by default (add 'use client' only when needed)
- **Named exports** for components
- **Kebab-case** for file names
- **PascalCase** for components
- **camelCase** for functions and variables

See `CLAUDE.md` for detailed conventions and guidelines.

## 🔄 Development Workflow

This project uses a 4-phase development approach:

### Phase 1: Prototype (Current)
- Functional prototype with dummy data
- All core features implemented
- Polished UI/UX ready for stakeholder review

### Phase 2: ECB Integration
- Connect to ECB's existing database
- Data migration and synchronization
- Club admin authentication

### Phase 3: 3rd Party Integrations
- YouTube API integration
- TikTok API integration
- Google Maps integration
- Analytics

### Phase 4: Platform Evolution
- Multi-tenancy architecture
- White-label capabilities
- Self-service onboarding
- Billing system

## 🤝 Contributing

1. Read `CLAUDE.md` for detailed project documentation
2. Follow established code conventions
3. Ensure TypeScript compiles without errors
4. Add tests for new features
5. Update documentation as needed

## 📚 Documentation

- **`CLAUDE.md`**: Comprehensive guide for AI assistants and developers
- **`/docs/api/`**: API documentation (planned)
- **`/docs/widgets/`**: Widget development guide (planned)
- **`/docs/architecture/`**: Architecture documentation (planned)

## 🔐 Environment Variables

Required:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL`: Application URL

Optional (for production):
- `YOUTUBE_API_KEY`: YouTube Data API key
- `GOOGLE_MAPS_API_KEY`: Google Maps API key
- `TIKTOK_CLIENT_KEY`: TikTok API credentials
- `TIKTOK_CLIENT_SECRET`: TikTok API credentials

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- AWS (Amplify, ECS, Lambda)
- Google Cloud Run
- Railway
- Render

## 📄 License

Copyright © 2026 England and Wales Cricket Board. All rights reserved.

## 👥 Team

- Project Lead: TBD
- Tech Lead: TBD
- Design Lead: TBD

## 🐛 Issues & Support

For issues or questions, please contact the development team or create an issue in the repository.

---

Built with ❤️ for the ECB and cricket communities across England and Wales.
