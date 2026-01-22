'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { searchClubs } from '@/lib/services/club-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ClubSearchParams } from '@/types'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState<ClubSearchParams>({})
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true)
      try {
        const response = await searchClubs(searchParams)
        setResults(response.data)
        setTotal(response.total)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [searchParams])

  const handleSearch = (query: string) => {
    setSearchParams(prev => ({ ...prev, query }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Find Your Cricket Club</h1>
        <p className="text-lg text-muted-foreground">
          Discover cricket clubs across England and Wales
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Search clubs by name or location..."
            className="max-w-2xl"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button>Search</Button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {loading ? 'Searching...' : `Found ${total} clubs`}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchParams(prev => ({ ...prev, verified: true }))}
          >
            Verified Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchParams({})}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 w-3/4 rounded bg-muted"></div>
                <div className="h-4 w-1/2 rounded bg-muted"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-muted"></div>
                  <div className="h-4 w-full rounded bg-muted"></div>
                  <div className="h-4 w-2/3 rounded bg-muted"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No clubs found. Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((club) => (
            <Link key={club.id} href={`/clubs/${club.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <CardTitle className="line-clamp-1">{club.name}</CardTitle>
                    {club.verified && (
                      <Badge variant="secondary" className="ml-2 shrink-0">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-1">
                    {club.email}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                    {club.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {club.teams && club.teams.length > 0 && (
                      <Badge variant="outline">{club.teams.length} Teams</Badge>
                    )}
                    {club.venues && club.venues.length > 0 && (
                      <Badge variant="outline">{club.venues.length} Venues</Badge>
                    )}
                    {club.offerings && club.offerings.length > 0 && (
                      <Badge variant="outline">{club.offerings.length} Programs</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
