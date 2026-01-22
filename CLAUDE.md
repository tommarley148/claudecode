# CLAUDE.md - Cricket Club Directory Platform

## Project Overview

### Mission
Build a search directory for recreational cricket clubs in England and Wales for the England and Wales Cricket Board (ECB). This platform helps the public discover suitable cricket clubs, sessions, and content while providing clubs with a powerful online presence.

### Vision
Transform this into a white-label product that enables sports organizations and similar entities to showcase their offerings in one place, connecting various data sources through an orchestration layer - similar to how travel booking engines aggregate multiple hospitality systems.

---

## Core Entities

### 1. **Clubs (Organizations)**
Primary entity representing cricket clubs with comprehensive profiles serving as their online presence.

**Key Attributes:**
- Club name, logo, description
- Location and contact information
- Registration/affiliation details
- Social media links
- Operating hours/seasons
- Membership information

### 2. **Venues (Places)**
Physical locations where cricket activities occur. May be shared by multiple clubs.

**Key Attributes:**
- Venue name and address
- Facilities and amenities
- Capacity and ground information
- Accessibility features
- Maps integration
- Photos/media gallery

### 3. **Offerings**
Services, programs, and sessions provided by clubs.

**Key Attributes:**
- Session types (training, matches, social)
- Age groups and skill levels
- Schedule and availability
- Pricing/membership fees
- Coaching qualifications
- Registration requirements

### 4. **Content**
Dynamic content showcasing club activities and culture.

**Key Attributes:**
- News and announcements
- Event updates
- Media (photos, videos)
- Social media integrations
- Blog posts
- Achievement highlights

---

## Architecture Overview

### System Design Philosophy
- **Modular Widget Architecture**: Composable UI components that can be arranged per club
- **Data Orchestration Layer**: Abstract data sources behind unified APIs
- **Multi-tenancy Ready**: Built to scale from single ECB instance to white-label platform
- **Progressive Enhancement**: Core functionality works, enhanced with 3rd party integrations

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                          │
│  (Next.js/React - Public-facing + Admin Dashboard)          │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 API/Orchestration Layer                      │
│        (Backend API - Data aggregation & routing)            │
├──────────────────────────────────────────────────────────────┤
│  • Club Profile API     • Search/Discovery API               │
│  • Widget Data API      • Admin/Management API               │
│  • Integration Hub      • Authentication & Authorization     │
└─────────┬────────────────────────────┬───────────────────────┘
          │                            │
┌─────────▼────────────┐    ┌─────────▼──────────────────────┐
│   Primary Database   │    │  3rd Party Integrations        │
│   (ECB Club Data)    │    │  • YouTube API                 │
│                      │    │  • TikTok API                  │
│  • Clubs             │    │  • Google Maps                 │
│  • Venues            │    │  • Social Media                │
│  • Offerings         │    │  • Analytics                   │
│  • Users/Admin       │    │  • Payment Processors (future) │
└──────────────────────┘    └────────────────────────────────┘
```

---

## Widget System

### Widget-Based Club Profiles
Each club profile is composed of configurable widgets, similar to Linktree but cricket-specific.

### Standard Widget Library

#### 1. **Upcoming Events Widget**
- Displays scheduled matches, training sessions, social events
- Calendar view and list view options
- Registration/attendance tracking
- iCal export functionality

#### 2. **Latest YouTube Videos Widget**
- Embedded YouTube player
- Auto-fetches from club's YouTube channel
- Video carousel for multiple videos
- Deep links to full channel

#### 3. **Latest TikTok Videos Widget**
- TikTok embed integration
- Auto-fetches from club's TikTok account
- Video carousel
- Engagement metrics display

#### 4. **Teams Widget**
- List of club teams (Senior, Junior, Women's, etc.)
- Team rosters and photos
- Recent results and standings
- Links to team-specific pages

#### 5. **Join Club Form Widget**
- Customizable membership forms
- Field validation
- Integration with CRM/database
- Email notifications
- Payment integration (future)

#### 6. **Maps Embed Widget**
- Google Maps integration showing venue location
- Directions functionality
- Multiple venue support
- Custom markers and styling

#### 7. **Amenities Widget**
- Visual showcase of facilities
- Icon-based display (parking, changing rooms, clubhouse, etc.)
- Accessibility information
- Facility descriptions

#### 8. **Reviews Widget**
- User reviews and ratings
- Star rating system
- Review moderation tools
- Response functionality for clubs
- Verified member badges

### Widget Configuration
Each widget should support:
- **Visibility Toggle**: Show/hide widgets
- **Ordering**: Drag-and-drop reordering
- **Customization**: Theme colors, display options
- **Permissions**: Admin controls for editing
- **Responsive Design**: Mobile-first approach

---

## Recommended Tech Stack

### Frontend
**Framework**: **Next.js 14+ (App Router)**
- Server-side rendering for SEO
- Static generation for club profiles
- API routes for backend integration
- Image optimization built-in
- React Server Components

**UI Library**: **shadcn/ui + Tailwind CSS**
- Modern, accessible components
- Highly customizable
- Great developer experience
- Consistent design system

**State Management**: **React Query (TanStack Query)**
- Server state management
- Automatic caching and refetching
- Optimistic updates
- Perfect for API integration

**Form Handling**: **React Hook Form + Zod**
- Type-safe forms
- Validation schemas
- Performance optimized

### Backend

**API Framework**: **Next.js API Routes** or **NestJS** (for separate backend)
- RESTful API design
- TypeScript throughout
- API versioning support
- Swagger/OpenAPI documentation

**Database**: **PostgreSQL**
- Robust relational data model
- JSON support for flexible widget configs
- Excellent full-text search
- PostGIS for location queries

**ORM**: **Prisma**
- Type-safe database access
- Migration management
- Great DX with autocomplete
- Schema-first approach

**Caching**: **Redis**
- API response caching
- Session management
- Rate limiting
- Real-time features (future)

### Infrastructure & DevOps

**Hosting**: **Vercel** (frontend) or **AWS/GCP** (full-stack)
**CDN**: Built-in with Vercel or CloudFront
**File Storage**: **AWS S3** or **Cloudinary** (for media)
**Search**: **Algolia** or **Meilisearch** (for club discovery)
**Monitoring**: **Sentry** (errors) + **Vercel Analytics**
**CI/CD**: **GitHub Actions**

### 3rd Party Integrations

- **YouTube Data API v3**: Video fetching
- **TikTok Embed API**: Video embeds
- **Google Maps JavaScript API**: Maps and geocoding
- **Google Places API**: Venue information
- **Auth0** or **Clerk**: Authentication (future multi-tenancy)
- **Stripe**: Payment processing (future)
- **SendGrid/Postmark**: Transactional emails

---

## Data Models

### Core Schema (Conceptual)

```typescript
// Club
interface Club {
  id: string
  name: string
  slug: string // URL-friendly identifier
  description: string
  logo: string | null
  coverImage: string | null

  // Contact & Location
  email: string
  phone: string | null
  website: string | null
  primaryVenueId: string

  // Social Media
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    tiktok?: string
  }

  // Widget Configuration
  widgetConfig: WidgetConfig[]
  theme: ClubTheme

  // Status & Metadata
  status: 'active' | 'inactive' | 'pending'
  verified: boolean
  createdAt: Date
  updatedAt: Date

  // Relationships
  venues: Venue[]
  offerings: Offering[]
  teams: Team[]
  admins: User[]
}

// Widget Configuration
interface WidgetConfig {
  id: string
  type: WidgetType
  enabled: boolean
  order: number
  settings: Record<string, any> // Widget-specific settings
}

type WidgetType =
  | 'upcoming-events'
  | 'youtube-videos'
  | 'tiktok-videos'
  | 'teams'
  | 'join-form'
  | 'maps'
  | 'amenities'
  | 'reviews'
  | 'custom-html'

// Venue
interface Venue {
  id: string
  name: string
  address: {
    street: string
    city: string
    county: string
    postcode: string
    country: string
  }
  location: {
    lat: number
    lng: number
  }
  amenities: string[] // ['parking', 'changing_rooms', 'clubhouse', etc.]
  capacity: number | null
  images: string[]
  accessibility: string[]
  clubId: string
}

// Offering
interface Offering {
  id: string
  clubId: string
  title: string
  description: string
  type: 'training' | 'match' | 'social' | 'camp' | 'course'
  ageGroups: string[] // ['u11', 'u13', 'adult', 'senior', etc.]
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'all'
  schedule: {
    dayOfWeek: number
    startTime: string
    endTime: string
    frequency: 'weekly' | 'monthly' | 'once'
  }
  pricing: {
    type: 'free' | 'paid' | 'membership'
    amount: number | null
    currency: string
  }
  registrationRequired: boolean
  maxParticipants: number | null
  startDate: Date
  endDate: Date | null
  status: 'active' | 'full' | 'cancelled'
}

// Team
interface Team {
  id: string
  clubId: string
  name: string
  ageGroup: string
  gender: 'male' | 'female' | 'mixed'
  skillLevel: string
  division: string | null
  captain: string | null
  coach: string | null
  roster: TeamMember[]
  recentResults: Match[]
}

// Content/Event
interface Event {
  id: string
  clubId: string
  title: string
  description: string
  type: 'match' | 'training' | 'social' | 'meeting' | 'tournament'
  startDate: Date
  endDate: Date
  venueId: string | null
  registrationUrl: string | null
  capacity: number | null
  registeredCount: number
  featured: boolean
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
}

// Review
interface Review {
  id: string
  clubId: string
  userId: string | null // null for anonymous
  authorName: string
  rating: number // 1-5
  title: string
  content: string
  verified: boolean // verified member
  response: {
    content: string
    authorName: string
    createdAt: Date
  } | null
  helpful: number
  createdAt: Date
  status: 'pending' | 'approved' | 'rejected'
}
```

---

## Development Workflow

### Phase 1: Prototype with Dummy Data (Current)
**Goal**: Build a polished, functional prototype demonstrating core features

**Tasks**:
1. Set up Next.js project with TypeScript
2. Implement design system (shadcn/ui + Tailwind)
3. Create dummy data generators for all entities
4. Build search/discovery interface
5. Develop club profile page with widget system
6. Implement all standard widgets
7. Create basic admin interface for widget configuration
8. Responsive design and mobile optimization
9. Deploy prototype for stakeholder review

### Phase 2: ECB Integration
**Goal**: Connect to ECB's existing database

**Tasks**:
1. Database schema analysis and mapping
2. Build data migration tools
3. Create API integration layer
4. Implement data synchronization
5. User authentication for club admins
6. Admin dashboard for club management

### Phase 3: 3rd Party Integrations
**Goal**: Connect external services (YouTube, TikTok, etc.)

**Tasks**:
1. YouTube Data API integration
2. TikTok embed integration
3. Google Maps integration
4. Social media feed aggregation
5. Analytics integration

### Phase 4: Platform Evolution
**Goal**: Transform into white-label product

**Tasks**:
1. Multi-tenancy architecture
2. Custom branding/theming system
3. Plugin/extension system for widgets
4. Data connector framework
5. Self-service onboarding
6. Billing and subscription management

---

## Project Structure

### Recommended Directory Structure

```
claudecode/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.ts             # Dummy data seeding
├── public/
│   ├── images/             # Static images
│   └── favicon.ico
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── (admin)/        # Admin dashboard routes
│   │   ├── (public)/       # Public-facing routes
│   │   ├── api/            # API routes
│   │   ├── clubs/
│   │   │   └── [slug]/     # Dynamic club pages
│   │   ├── search/         # Search/discovery page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── widgets/        # Widget components
│   │   ├── layouts/        # Layout components
│   │   └── forms/          # Form components
│   ├── lib/
│   │   ├── db.ts           # Database client
│   │   ├── api-client.ts   # API client utilities
│   │   ├── utils.ts        # Helper functions
│   │   └── validations.ts  # Zod schemas
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Business logic services
│   │   ├── club-service.ts
│   │   ├── search-service.ts
│   │   ├── youtube-service.ts
│   │   └── tiktok-service.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── models.ts       # Data models
│   │   ├── api.ts          # API types
│   │   └── widgets.ts      # Widget types
│   └── config/             # Configuration files
│       ├── site.ts         # Site configuration
│       └── widgets.ts      # Widget registry
├── tests/
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── e2e/                # End-to-end tests
├── docs/
│   ├── api/                # API documentation
│   ├── widgets/            # Widget documentation
│   └── architecture/       # Architecture docs
├── scripts/
│   ├── seed-data.ts        # Data seeding scripts
│   └── migrate.ts          # Migration scripts
├── .env.example            # Environment variables template
├── .env.local              # Local environment (gitignored)
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── CLAUDE.md               # This file
├── README.md               # Project readme
├── next.config.js          # Next.js configuration
├── package.json
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind configuration
```

---

## Coding Conventions

### TypeScript
- **Strict mode enabled**: Full type safety
- **Prefer interfaces over types** for object shapes
- **Use enums for fixed sets** of values
- **No `any` types**: Use `unknown` if truly dynamic
- **Explicit return types** for functions

### React/Next.js
- **Server Components by default**: Use 'use client' only when needed
- **Colocation**: Keep components near their usage
- **Named exports** for components (easier to refactor)
- **Props interfaces**: Always define component props
- **Composition over inheritance**: Small, composable components

### Naming Conventions
- **Files**: kebab-case (e.g., `club-profile.tsx`)
- **Components**: PascalCase (e.g., `ClubProfile`)
- **Functions/variables**: camelCase (e.g., `fetchClubData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_CLUBS_PER_PAGE`)
- **Types/Interfaces**: PascalCase (e.g., `ClubProfile`)
- **Database tables**: snake_case (e.g., `club_profiles`)

### File Organization
- **Index files**: Avoid barrel exports (explicit imports preferred)
- **One component per file**: Except for tightly coupled sub-components
- **Co-locate tests**: Place test files next to source files
- **Group by feature**: Not by file type

### Widget Development
- **Widget contract**: All widgets must implement `BaseWidget` interface
- **Configuration schema**: Define Zod schema for widget settings
- **Error boundaries**: Widgets fail independently
- **Loading states**: Always provide loading UI
- **Empty states**: Handle no-data scenarios gracefully

### API Design
- **RESTful conventions**: Standard HTTP methods
- **API versioning**: `/api/v1/...`
- **Error responses**: Consistent error format
- **Pagination**: Use cursor-based for large datasets
- **Rate limiting**: Implement for all public endpoints

### Database
- **Migrations**: Always use migrations, never manual schema changes
- **Indexes**: Index foreign keys and frequently queried fields
- **Soft deletes**: Use `deletedAt` for important entities
- **Timestamps**: Always include `createdAt` and `updatedAt`
- **Relations**: Explicit foreign key constraints

### Git Workflow
- **Branch naming**: `feature/description`, `bugfix/description`, `chore/description`
- **Commit messages**: Conventional Commits format
  - `feat: add YouTube widget`
  - `fix: correct venue location display`
  - `docs: update widget documentation`
- **Pull requests**: Must include description and link to issue
- **Code review**: Required before merging to main

### Testing
- **Unit tests**: For business logic and utilities
- **Integration tests**: For API routes and database operations
- **E2E tests**: For critical user journeys
- **Test naming**: `describe('Component/Function', () => { it('should do something', ...) })`
- **Coverage target**: Aim for 80%+ on critical paths

---

## Security & Privacy

### Data Protection
- **GDPR Compliance**: User consent, right to deletion, data export
- **Input validation**: All user inputs validated server-side
- **SQL injection prevention**: Use Prisma's parameterized queries
- **XSS prevention**: Sanitize user-generated content
- **CSRF protection**: Implement CSRF tokens for forms

### Authentication & Authorization
- **Role-based access control (RBAC)**: Admin, ClubAdmin, User roles
- **JWT tokens**: For API authentication
- **Secure session management**: HttpOnly cookies
- **Password requirements**: Strong password policy
- **2FA support**: Optional two-factor authentication

### API Security
- **Rate limiting**: Prevent abuse
- **API keys**: For 3rd party integrations
- **CORS configuration**: Whitelist allowed origins
- **Input sanitization**: Server-side validation
- **Audit logging**: Track sensitive operations

---

## Performance Optimization

### Frontend
- **Code splitting**: Lazy load non-critical components
- **Image optimization**: Use Next.js Image component
- **Font optimization**: Use next/font
- **Bundle analysis**: Regular bundle size monitoring
- **Caching**: Aggressive caching for static content

### Backend
- **Database query optimization**: Use indexes, avoid N+1 queries
- **Response caching**: Cache frequently accessed data
- **CDN**: Static assets served from CDN
- **API response compression**: Gzip/Brotli compression
- **Database connection pooling**: Efficient connection management

### Monitoring
- **Core Web Vitals**: Track LCP, FID, CLS
- **API latency**: Monitor endpoint response times
- **Error rates**: Track error frequency
- **User analytics**: Understand usage patterns

---

## Accessibility (A11Y)

### Standards
- **WCAG 2.1 AA compliance**: Minimum target
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Keyboard navigation**: All interactive elements accessible
- **Screen reader support**: ARIA labels where needed
- **Color contrast**: Meets WCAG standards
- **Focus indicators**: Visible focus states

### Testing
- **Automated testing**: Use axe-core or Lighthouse
- **Manual testing**: Keyboard and screen reader testing
- **User testing**: Include users with disabilities

---

## Future Considerations

### Platform Evolution
- **Multi-sport support**: Expand beyond cricket
- **Internationalization**: Multiple languages and regions
- **Mobile apps**: Native iOS/Android apps
- **Offline support**: PWA capabilities
- **Real-time features**: Live scoring, chat

### Advanced Features
- **AI-powered search**: Natural language queries
- **Personalized recommendations**: ML-based club suggestions
- **Advanced analytics**: Insights dashboard for clubs
- **Social features**: User profiles, following, notifications
- **Marketplace**: Equipment sales, coaching services

### Technical Debt Prevention
- **Regular refactoring**: Schedule technical debt sprints
- **Dependency updates**: Keep packages current
- **Documentation**: Keep docs in sync with code
- **Code quality tools**: ESLint, Prettier, TypeScript strict mode
- **Architecture reviews**: Regular architecture assessment

---

## AI Assistant Guidelines

### When Working on This Codebase

1. **Always read existing code first**: Understand patterns before suggesting changes
2. **Follow established conventions**: Maintain consistency with existing code
3. **Type safety first**: Never compromise on TypeScript strictness
4. **Consider mobile**: All UI work should be mobile-responsive
5. **Test your changes**: Add appropriate tests for new functionality
6. **Document as you go**: Update docs when adding features
7. **Widget isolation**: Widgets should be independent and fail gracefully
8. **Performance matters**: Consider performance implications of changes
9. **Accessibility**: Ensure all UI additions are accessible
10. **Ask for clarification**: When requirements are unclear, ask questions

### Common Tasks

**Adding a new widget:**
1. Create widget component in `src/components/widgets/`
2. Define configuration schema in widget file
3. Register widget in `src/config/widgets.ts`
4. Add widget type to TypeScript types
5. Create dummy data for widget (if prototype phase)
6. Add documentation in `docs/widgets/`
7. Add tests

**Adding a new API endpoint:**
1. Create route in `src/app/api/`
2. Define request/response types
3. Implement validation with Zod
4. Add database queries using Prisma
5. Handle errors appropriately
6. Add tests
7. Update API documentation

**Adding a new page:**
1. Create page in `src/app/`
2. Define metadata for SEO
3. Implement responsive design
4. Add loading and error states
5. Ensure accessibility
6. Add tests

### Quality Checklist
Before considering work complete:
- [ ] TypeScript compiles without errors
- [ ] ESLint passes without warnings
- [ ] Tests added and passing
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessibility tested (keyboard, screen reader)
- [ ] Documentation updated
- [ ] Error handling implemented
- [ ] Loading states implemented
- [ ] Empty states handled
- [ ] Performance considered

---

## Getting Help

### Resources
- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **shadcn/ui**: https://ui.shadcn.com
- **React Query**: https://tanstack.com/query
- **Tailwind CSS**: https://tailwindcss.com/docs

### Contact
- **Project Lead**: [To be defined]
- **Tech Lead**: [To be defined]
- **Design Lead**: [To be defined]

---

## Changelog

### 2026-01-22
- Initial CLAUDE.md creation
- Project structure defined
- Core entities documented
- Tech stack recommendations
- Widget system architecture
- Development phases outlined

---

*This document is a living guide. Update it as the project evolves.*
