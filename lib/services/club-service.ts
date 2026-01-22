// Mock service for demonstration - returns dummy data
// In production, this would query the database via Prisma

import { generateCompleteClub } from '@/lib/dummy-data'
import type { ClubSearchParams, SearchResult } from '@/types'

// Generate mock clubs on module load
const mockClubs = Array.from({ length: 30 }, () => {
  const clubData = generateCompleteClub()
  return {
    ...clubData.club,
    id: Math.random().toString(36).substr(2, 9),
    venues: clubData.venues.map(v => ({ ...v, id: Math.random().toString(36).substr(2, 9) })),
    offerings: clubData.offerings.map(o => ({ ...o, id: Math.random().toString(36).substr(2, 9) })),
    teams: clubData.teams.map(t => ({ ...t, id: Math.random().toString(36).substr(2, 9) })),
    events: clubData.events.map(e => ({ ...e, id: Math.random().toString(36).substr(2, 9) })),
    reviews: clubData.reviews.map(r => ({ ...r, id: Math.random().toString(36).substr(2, 9) })),
  }
})

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
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200))

  return mockClubs.find(club => club.slug === slug) || null
}

export async function getFeaturedClubs(limit: number = 6) {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200))

  return mockClubs
    .filter(club => club.verified && club.status === 'ACTIVE')
    .slice(0, limit)
}
