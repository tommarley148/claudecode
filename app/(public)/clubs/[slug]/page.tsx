import { notFound } from 'next/navigation'
import { getClubBySlug } from '@/lib/services/club-service'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UpcomingEventsWidget } from '@/components/widgets/upcoming-events-widget'
import { TeamsWidget } from '@/components/widgets/teams-widget'
import { AmenitiesWidget } from '@/components/widgets/amenities-widget'
import { ReviewsWidget } from '@/components/widgets/reviews-widget'
import { MapsWidget } from '@/components/widgets/maps-widget'

interface ClubPageProps {
  params: {
    slug: string
  }
}

export default async function ClubPage({ params }: ClubPageProps) {
  const club = await getClubBySlug(params.slug)

  if (!club) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: club.coverImage
            ? `url(${club.coverImage})`
            : 'linear-gradient(to right, #3b82f6, #1d4ed8)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4">
        {/* Club Header */}
        <div className="relative -mt-16 mb-8">
          <div className="rounded-lg border bg-card p-6 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                {club.logo && (
                  <div className="h-24 w-24 overflow-hidden rounded-lg border bg-white">
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{club.name}</h1>
                    {club.verified && <Badge>Verified</Badge>}
                  </div>
                  <p className="mb-2 text-muted-foreground">{club.email}</p>
                  {club.phone && (
                    <p className="text-sm text-muted-foreground">{club.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Join Club</Button>
                <Button variant="outline">Contact</Button>
              </div>
            </div>

            {/* Social Links */}
            {club.socialLinks && Object.keys(club.socialLinks).length > 0 && (
              <div className="mt-4 flex gap-2 border-t pt-4">
                {Object.entries(club.socialLinks as Record<string, string>).map(([platform, url]) => (
                  <Button key={platform} variant="ghost" size="sm" asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">About Us</h2>
          <p className="text-muted-foreground">{club.description}</p>
        </div>

        {/* Widgets Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {club.events && club.events.length > 0 && (
                <UpcomingEventsWidget events={club.events} />
              )}
              {club.teams && club.teams.length > 0 && (
                <TeamsWidget teams={club.teams} />
              )}
              {club.reviews && club.reviews.length > 0 && (
                <ReviewsWidget reviews={club.reviews} clubId={club.id} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {club.venues && club.venues.length > 0 && (
              <>
                <MapsWidget venue={club.venues[0]} />
                <AmenitiesWidget amenities={club.venues[0].amenities} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
