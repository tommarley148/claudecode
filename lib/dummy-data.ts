import { faker } from '@faker-js/faker'
import {
  ClubStatus,
  OfferingType,
  SkillLevel,
  OfferingStatus,
  Gender,
  EventType,
  EventStatus,
  ReviewStatus
} from '@/types/enums'
import type {
  Address,
  SocialLinks,
  Schedule,
  Pricing,
  TeamMember,
  MatchResult,
  ClubTheme,
  BaseWidgetConfig,
} from '@/types'
import { generateSlug } from './utils'
import { appConfig } from '@/config/site'

// Seed faker for consistent data generation
faker.seed(123456)

// UK Cricket Club Names
const clubPrefixes = ['', 'Old', 'New', 'Royal', 'St.']
const clubSuffixes = ['Cricket Club', 'CC', 'Cricket & Sports Club']
const villageNames = [
  'Ashford', 'Bedford', 'Brighton', 'Bristol', 'Cambridge', 'Canterbury',
  'Chester', 'Coventry', 'Derby', 'Durham', 'Exeter', 'Gloucester',
  'Harrow', 'Ipswich', 'Lancaster', 'Leeds', 'Leicester', 'Lincoln',
  'Manchester', 'Norwich', 'Nottingham', 'Oxford', 'Portsmouth', 'Reading',
  'Richmond', 'Salisbury', 'Sheffield', 'Southampton', 'Stratford', 'Winchester',
  'Worcester', 'York', 'Blackheath', 'Hampstead', 'Wimbledon', 'Dulwich'
]

export function generateClubName(): string {
  const prefix = faker.helpers.arrayElement([...clubPrefixes, ''])
  const village = faker.helpers.arrayElement(villageNames)
  const suffix = faker.helpers.arrayElement(clubSuffixes)
  return `${prefix} ${village} ${suffix}`.trim().replace(/\s+/g, ' ')
}

export function generateAddress(): Address {
  const county = faker.helpers.arrayElement(appConfig.counties)
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    county: county,
    postcode: faker.location.zipCode('??# #??'),
    country: county.includes('Wales') || ['Anglesey', 'Gwynedd', 'Conwy'].includes(county) ? 'Wales' : 'England',
  }
}

export function generateSocialLinks(): SocialLinks {
  const hasYoutube = faker.datatype.boolean(0.4)
  const hasTiktok = faker.datatype.boolean(0.3)
  const hasTwitter = faker.datatype.boolean(0.6)
  const hasFacebook = faker.datatype.boolean(0.8)
  const hasInstagram = faker.datatype.boolean(0.7)

  return {
    ...(hasFacebook && { facebook: `https://facebook.com/${faker.internet.userName()}` }),
    ...(hasTwitter && { twitter: `https://twitter.com/${faker.internet.userName()}` }),
    ...(hasInstagram && { instagram: `https://instagram.com/${faker.internet.userName()}` }),
    ...(hasYoutube && { youtube: `https://youtube.com/@${faker.internet.userName()}` }),
    ...(hasTiktok && { tiktok: `https://tiktok.com/@${faker.internet.userName()}` }),
  }
}

export function generateClubTheme(): ClubTheme {
  return {
    primaryColor: faker.color.rgb(),
    secondaryColor: faker.color.rgb(),
    accentColor: faker.color.rgb(),
    logoPosition: faker.helpers.arrayElement(['left', 'center', 'right']),
    headerStyle: faker.helpers.arrayElement(['minimal', 'bold', 'classic']),
  }
}

export function generateWidgetConfig(): BaseWidgetConfig[] {
  const availableWidgets = [
    'upcoming-events',
    'youtube-videos',
    'tiktok-videos',
    'teams',
    'join-form',
    'maps',
    'amenities',
    'reviews',
  ] as const

  const numWidgets = faker.number.int({ min: 4, max: 8 })
  const selectedWidgets = faker.helpers.shuffle(availableWidgets).slice(0, numWidgets)

  return selectedWidgets.map((type, index) => ({
    id: faker.string.uuid(),
    type,
    enabled: faker.datatype.boolean(0.9),
    order: index,
    settings: {}, // Would have widget-specific settings
  }))
}

export function generateClub() {
  const name = generateClubName()
  const address = generateAddress()

  return {
    name,
    slug: generateSlug(name),
    description: faker.lorem.paragraphs(2),
    logo: faker.datatype.boolean(0.8) ? faker.image.urlLoremFlickr({ category: 'sports' }) : null,
    coverImage: faker.datatype.boolean(0.7) ? faker.image.urlLoremFlickr({ category: 'nature' }) : null,
    email: faker.internet.email({ firstName: name.split(' ')[0].toLowerCase() }),
    phone: faker.phone.number('07### ######'),
    website: faker.datatype.boolean(0.6) ? faker.internet.url() : null,
    socialLinks: generateSocialLinks(),
    widgetConfig: generateWidgetConfig(),
    theme: generateClubTheme(),
    status: faker.helpers.weightedArrayElement([
      { value: ClubStatus.ACTIVE, weight: 0.8 },
      { value: ClubStatus.INACTIVE, weight: 0.1 },
      { value: ClubStatus.PENDING, weight: 0.1 },
    ]),
    verified: faker.datatype.boolean(0.7),
  }
}

export function generateVenue(clubId: string) {
  const address = generateAddress()
  // UK coordinates roughly
  const lat = faker.location.latitude({ min: 50, max: 56 })
  const lng = faker.location.longitude({ min: -5, max: 2 })

  const allAmenities = appConfig.amenities
  const numAmenities = faker.number.int({ min: 3, max: 10 })
  const amenities = faker.helpers.shuffle(allAmenities).slice(0, numAmenities)

  return {
    clubId,
    name: `${faker.helpers.arrayElement(villageNames)} Cricket Ground`,
    address,
    latitude: lat,
    longitude: lng,
    amenities,
    capacity: faker.datatype.boolean(0.7) ? faker.number.int({ min: 50, max: 500 }) : null,
    images: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
      faker.image.urlLoremFlickr({ category: 'sports' })
    ),
    accessibility: faker.helpers.arrayElements(
      ['Wheelchair Access', 'Disabled Parking', 'Accessible Toilets', 'Hearing Loop'],
      faker.number.int({ min: 0, max: 3 })
    ),
    description: faker.lorem.paragraph(),
  }
}

export function generateSchedule(): Schedule {
  return {
    dayOfWeek: faker.number.int({ min: 0, max: 6 }),
    startTime: `${faker.number.int({ min: 9, max: 18 }).toString().padStart(2, '0')}:00`,
    endTime: `${faker.number.int({ min: 10, max: 21 }).toString().padStart(2, '0')}:00`,
    frequency: faker.helpers.arrayElement(['weekly', 'monthly', 'once']),
  }
}

export function generatePricing(): Pricing {
  const type = faker.helpers.arrayElement(['free', 'paid', 'membership'])
  return {
    type,
    amount: type === 'free' ? null : faker.number.int({ min: 5, max: 50 }),
    currency: 'GBP',
    period: type === 'paid' ? faker.helpers.arrayElement(['session', 'month', 'year']) : undefined,
  }
}

export function generateOffering(clubId: string) {
  const type = faker.helpers.arrayElement(Object.values(OfferingType))
  const skillLevel = faker.helpers.arrayElement(Object.values(SkillLevel))
  const numAgeGroups = faker.number.int({ min: 1, max: 3 })
  const ageGroups = faker.helpers.arrayElements(appConfig.ageGroups, numAgeGroups)

  return {
    clubId,
    title: `${faker.helpers.arrayElement(['Junior', 'Senior', 'Youth', 'Adult'])} ${type.toLowerCase().replace(/_/g, ' ')}`,
    description: faker.lorem.paragraphs(1),
    type,
    ageGroups,
    skillLevel,
    schedule: generateSchedule(),
    pricing: generatePricing(),
    registrationRequired: faker.datatype.boolean(0.6),
    maxParticipants: faker.datatype.boolean(0.5) ? faker.number.int({ min: 10, max: 30 }) : null,
    currentParticipants: faker.number.int({ min: 0, max: 20 }),
    registrationUrl: faker.datatype.boolean(0.5) ? faker.internet.url() : null,
    startDate: faker.date.future(),
    endDate: faker.datatype.boolean(0.7) ? faker.date.future({ years: 1 }) : null,
    status: faker.helpers.weightedArrayElement([
      { value: OfferingStatus.ACTIVE, weight: 0.7 },
      { value: OfferingStatus.FULL, weight: 0.2 },
      { value: OfferingStatus.CANCELLED, weight: 0.05 },
      { value: OfferingStatus.COMPLETED, weight: 0.05 },
    ]),
    images: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.image.urlLoremFlickr({ category: 'sports' })
    ),
  }
}

export function generateTeamMembers(count: number): TeamMember[] {
  return Array.from({ length: count }, (_, i) => ({
    name: faker.person.fullName(),
    role: i === 0 ? 'captain' : i === 1 ? 'vice-captain' : 'player',
    jerseyNumber: faker.number.int({ min: 1, max: 99 }),
    photo: faker.datatype.boolean(0.3) ? faker.image.avatar() : undefined,
  }))
}

export function generateMatchResults(count: number): MatchResult[] {
  return Array.from({ length: count }, () => ({
    date: faker.date.past().toISOString(),
    opponent: generateClubName(),
    homeAway: faker.helpers.arrayElement(['home', 'away']),
    result: faker.helpers.arrayElement(['win', 'loss', 'draw']),
    score: `${faker.number.int({ min: 100, max: 300 })}/${faker.number.int({ min: 1, max: 10 })} - ${faker.number.int({ min: 100, max: 300 })}/${faker.number.int({ min: 1, max: 10 })}`,
  }))
}

export function generateTeam(clubId: string) {
  const ageGroup = faker.helpers.arrayElement(appConfig.ageGroups)
  const gender = faker.helpers.arrayElement(Object.values(Gender))

  return {
    clubId,
    name: `${ageGroup} ${gender === 'MIXED' ? '' : gender.toLowerCase()} Team`,
    ageGroup,
    gender,
    skillLevel: faker.helpers.arrayElement(['Beginner', 'Intermediate', 'Advanced', 'Competitive']),
    division: faker.datatype.boolean(0.6) ? `Division ${faker.number.int({ min: 1, max: 4 })}` : null,
    captain: faker.person.fullName(),
    coach: faker.datatype.boolean(0.8) ? faker.person.fullName() : null,
    image: faker.datatype.boolean(0.4) ? faker.image.urlLoremFlickr({ category: 'sports' }) : null,
    roster: generateTeamMembers(faker.number.int({ min: 11, max: 20 })),
    recentResults: generateMatchResults(faker.number.int({ min: 3, max: 8 })),
  }
}

export function generateEvent(clubId: string, venueId?: string) {
  const type = faker.helpers.arrayElement(Object.values(EventType))
  const startDate = faker.date.future()
  const endDate = new Date(startDate)
  endDate.setHours(endDate.getHours() + faker.number.int({ min: 2, max: 8 }))

  return {
    clubId,
    title: `${type.replace(/_/g, ' ')} - ${faker.lorem.words(2)}`,
    description: faker.lorem.paragraphs(1),
    type,
    startDate,
    endDate,
    venueId: venueId || null,
    registrationUrl: faker.datatype.boolean(0.4) ? faker.internet.url() : null,
    capacity: faker.datatype.boolean(0.6) ? faker.number.int({ min: 20, max: 200 }) : null,
    registeredCount: faker.number.int({ min: 0, max: 50 }),
    registrationDeadline: faker.datatype.boolean(0.5) ? faker.date.soon() : null,
    featured: faker.datatype.boolean(0.2),
    status: faker.helpers.weightedArrayElement([
      { value: EventStatus.SCHEDULED, weight: 0.7 },
      { value: EventStatus.ONGOING, weight: 0.1 },
      { value: EventStatus.COMPLETED, weight: 0.15 },
      { value: EventStatus.CANCELLED, weight: 0.05 },
    ]),
    images: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.image.urlLoremFlickr({ category: 'sports' })
    ),
  }
}

export function generateReview(clubId: string) {
  const rating = faker.number.int({ min: 1, max: 5 })

  return {
    clubId,
    authorName: faker.person.fullName(),
    rating,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 2 })),
    verified: faker.datatype.boolean(0.5),
    response: faker.datatype.boolean(0.3)
      ? {
          content: faker.lorem.paragraph(),
          authorName: 'Club Secretary',
          createdAt: faker.date.recent().toISOString(),
        }
      : null,
    helpful: faker.number.int({ min: 0, max: 20 }),
    status: faker.helpers.weightedArrayElement([
      { value: ReviewStatus.APPROVED, weight: 0.8 },
      { value: ReviewStatus.PENDING, weight: 0.15 },
      { value: ReviewStatus.REJECTED, weight: 0.05 },
    ]),
    createdAt: faker.date.past(),
  }
}

// Generate a complete club with all related data
export function generateCompleteClub() {
  const club = generateClub()
  const numVenues = faker.number.int({ min: 1, max: 3 })
  const numOfferings = faker.number.int({ min: 2, max: 8 })
  const numTeams = faker.number.int({ min: 2, max: 6 })
  const numEvents = faker.number.int({ min: 3, max: 10 })
  const numReviews = faker.number.int({ min: 5, max: 20 })

  return {
    club,
    venues: Array.from({ length: numVenues }, () => generateVenue('temp-club-id')),
    offerings: Array.from({ length: numOfferings }, () => generateOffering('temp-club-id')),
    teams: Array.from({ length: numTeams }, () => generateTeam('temp-club-id')),
    events: Array.from({ length: numEvents }, () => generateEvent('temp-club-id')),
    reviews: Array.from({ length: numReviews }, () => generateReview('temp-club-id')),
  }
}
