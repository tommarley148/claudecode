import { Club, Venue, Offering, Team, Event, Review, ClubStatus, OfferingType, SkillLevel, OfferingStatus, Gender, EventType, EventStatus, ReviewStatus } from '@prisma/client'

// Re-export Prisma types
export type {
  Club,
  Venue,
  Offering,
  Team,
  Event,
  Review,
  ClubStatus,
  OfferingType,
  SkillLevel,
  OfferingStatus,
  Gender,
  EventType,
  EventStatus,
  ReviewStatus,
}

// Extended types with relationships
export type ClubWithRelations = Club & {
  venues: Venue[]
  offerings: Offering[]
  teams: Team[]
  events: Event[]
  reviews: Review[]
}

export type VenueWithClub = Venue & {
  club: Club
}

export type EventWithRelations = Event & {
  club: Club
  venue: Venue | null
}

// Widget Types
export type WidgetType =
  | 'upcoming-events'
  | 'youtube-videos'
  | 'tiktok-videos'
  | 'teams'
  | 'join-form'
  | 'maps'
  | 'amenities'
  | 'reviews'
  | 'custom-html'

export interface BaseWidgetConfig {
  id: string
  type: WidgetType
  enabled: boolean
  order: number
  settings: Record<string, any>
}

export interface UpcomingEventsWidgetSettings {
  maxEvents: number
  showPastEvents: boolean
  viewMode: 'calendar' | 'list'
}

export interface YouTubeWidgetSettings {
  channelId?: string
  playlistId?: string
  maxVideos: number
  autoplay: boolean
}

export interface TikTokWidgetSettings {
  username: string
  maxVideos: number
}

export interface TeamsWidgetSettings {
  showRoster: boolean
  showRecentResults: boolean
  expandByDefault: boolean
}

export interface JoinFormWidgetSettings {
  formFields: FormField[]
  submitUrl: string
  successMessage: string
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox'
  required: boolean
  options?: string[]
  placeholder?: string
}

export interface MapsWidgetSettings {
  defaultZoom: number
  showDirections: boolean
  mapStyle: 'roadmap' | 'satellite' | 'terrain'
}

export interface AmenitiesWidgetSettings {
  displayMode: 'grid' | 'list'
  showIcons: boolean
  showDescriptions: boolean
}

export interface ReviewsWidgetSettings {
  maxReviews: number
  sortBy: 'recent' | 'rating' | 'helpful'
  allowSubmission: boolean
}

// Social Media Links
export interface SocialLinks {
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  tiktok?: string
  linkedin?: string
}

// Address Type
export interface Address {
  street: string
  city: string
  county: string
  postcode: string
  country: string
}

// Schedule Type (for offerings)
export interface Schedule {
  dayOfWeek: number // 0-6, where 0 is Sunday
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  frequency: 'weekly' | 'monthly' | 'once'
}

// Pricing Type
export interface Pricing {
  type: 'free' | 'paid' | 'membership'
  amount: number | null
  currency: string
  period?: 'session' | 'month' | 'year'
}

// Team Member Type
export interface TeamMember {
  name: string
  role: 'player' | 'captain' | 'vice-captain'
  jerseyNumber?: number
  photo?: string
}

// Match Result Type
export interface MatchResult {
  date: string
  opponent: string
  homeAway: 'home' | 'away'
  result: 'win' | 'loss' | 'draw'
  score?: string
}

// Review Response Type
export interface ReviewResponse {
  content: string
  authorName: string
  createdAt: string
}

// Club Theme Type
export interface ClubTheme {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logoPosition: 'left' | 'center' | 'right'
  headerStyle: 'minimal' | 'bold' | 'classic'
}

// Search/Filter Types
export interface ClubSearchParams {
  query?: string
  location?: string
  distance?: number
  ageGroups?: string[]
  offeringTypes?: OfferingType[]
  skillLevels?: SkillLevel[]
  amenities?: string[]
  verified?: boolean
}

export interface SearchResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

// Pagination Types
export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
