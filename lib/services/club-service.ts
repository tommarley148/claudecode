// Mock service for demonstration - returns dummy data
// In production, this would query the database via Prisma

import { generateCompleteClub } from '@/lib/dummy-data'
import type { ClubSearchParams, SearchResult } from '@/types'

// Generate mock clubs on module load with consistent IDs
const mockClubs = Array.from({ length: 30 }, (_, i) => {
  const clubData = generateCompleteClub()
  return {
    ...clubData.club,
    id: `club-${i}`,
    venues: clubData.venues.map((v, vi) => ({ ...v, id: `venue-${i}-${vi}`, clubId: `club-${i}` })),
    offerings: clubData.offerings.map((o, oi) => ({ ...o, id: `offering-${i}-${oi}`, clubId: `club-${i}` })),
    teams: clubData.teams.map((t, ti) => ({ ...t, id: `team-${i}-${ti}`, clubId: `club-${i}` })),
    events: clubData.events.map((e, ei) => ({ ...e, id: `event-${i}-${ei}`, clubId: `club-${i}` })),
    reviews: clubData.reviews.map((r, ri) => ({ ...r, id: `review-${i}-${ri}`, clubId: `club-${i}` })),
  }
})

// Log all slugs for debugging
console.log('Available club slugs:', mockClubs.map(c => c.slug).slice(0, 5))

export async function searchClubs(
  params: ClubSearchParams,
  page: number = 1,
  pageSize: number = 20
): Promise<SearchResult<typeof mockClubs[0]>> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 300))

  let filtered = [...mockClubs]

  // Apply filters
  if (params.query) {
    const query = params.query.toLowerCase()
    filtered = filtered.filter(club =>
      club.name.toLowerCase().includes(query) ||
      club.description.toLowerCase().includes(query)
    )
  }

  if (params.verified !== undefined) {
    filtered = filtered.filter(club => club.verified === params.verified)
  }

  // Pagination
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedResults = filtered.slice(start, end)

  return {
    data: paginatedResults,
    total: filtered.length,
    page,
    pageSize,
    hasMore: end < filtered.length,
  }
}

export async function getClubBySlug(slug: string) {
  console.log('Looking for club with slug:', slug)
  console.log('Available clubs:', mockClubs.length)

  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200))

  const club = mockClubs.find(club => club.slug === slug)
  console.log('Found club:', club ? club.name : 'NOT FOUND')

  return club || null
}

export async function getFeaturedClubs(limit: number = 6) {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200))

  return mockClubs
    .filter(club => club.verified && club.status === 'ACTIVE')
    .slice(0, limit)
}
