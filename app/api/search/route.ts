import { NextRequest, NextResponse } from 'next/server'
import { searchClubs } from '@/lib/services/club-service'
import type { ClubSearchParams } from '@/types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const params: ClubSearchParams = {}

  const query = searchParams.get('query')
  if (query) params.query = query

  const verified = searchParams.get('verified')
  if (verified) params.verified = verified === 'true'

  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')

  const result = await searchClubs(params, page, pageSize)

  return NextResponse.json(result)
}
