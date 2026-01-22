import { NextResponse } from 'next/server'
import { searchClubs } from '@/lib/services/club-service'

export async function GET() {
  const result = await searchClubs({}, 1, 10)

  return NextResponse.json({
    clubs: result.data.map(club => ({
      id: club.id,
      name: club.name,
      slug: club.slug,
    })),
    total: result.total,
  })
}
