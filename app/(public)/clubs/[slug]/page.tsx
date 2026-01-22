import { notFound } from 'next/navigation'
import { getClubBySlug } from '@/lib/services/club-service'
import Link from 'next/link'

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
    <div className="min-h-screen bg-gradient-to-b from-teal-400 via-teal-500 to-blue-600">
      {/* Mobile-First Vertical Layout - Linktree Style */}
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Hero Image */}
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          <div
            className="h-64 bg-cover bg-center"
            style={{
              backgroundImage: club.coverImage
                ? `url(${club.coverImage})`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {/* Overlay with club logo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Logo centered at bottom */}
            {club.logo && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Club Name */}
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          {club.name}
        </h1>

        {/* Action Buttons */}
        <div className="mb-8 flex gap-3">
          <button className="flex-1 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800">
            Links
          </button>
          <button className="flex-1 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100">
            Shop
          </button>
        </div>

        {/* YouTube Section */}
        <div className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-lg">
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-600 to-red-700">
              <div className="text-center">
                <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white">
                  <svg className="h-10 w-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-white">YouTube</p>
                <p className="text-xs text-gray-300">{club.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Content */}
        <div className="mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 p-6 shadow-lg">
          <div className="mb-3 flex items-center justify-center">
            <div className="rounded-2xl bg-white/20 p-8 backdrop-blur-sm">
              <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-white">Latest Content</p>
          <p className="text-center text-xs text-white/80">@ TikTok</p>
        </div>

        {/* Map Section */}
        {club.venues && club.venues.length > 0 && (
          <div className="mb-4 overflow-hidden rounded-2xl bg-white shadow-lg">
            <div className="aspect-video w-full bg-gradient-to-br from-green-100 to-blue-100">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Where to find us</p>
                  <p className="text-xs text-gray-500">
                    {typeof club.venues[0].address === 'object'
                      ? club.venues[0].address.city
                      : 'View Location'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Join Club */}
        <Link href="#join" className="mb-4 block overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-500">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Interested in joining the club?</p>
            </div>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Shop Preview */}
        <div className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-lg">
          <div className="mb-3 grid grid-cols-3 gap-2">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-orange-400 to-pink-500"></div>
            <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-400 to-purple-500"></div>
            <div className="aspect-square rounded-lg bg-gradient-to-br from-green-400 to-teal-500"></div>
          </div>
          <p className="text-center text-sm font-semibold text-gray-900">See Full Shop</p>
          <p className="text-center text-xs text-gray-500">@ Fanatics</p>
        </div>

        {/* My Calendly */}
        <Link href="#calendar" className="mb-4 block overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">My Calendly</p>
            </div>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Contact Info */}
        <Link href={`mailto:${club.email}`} className="mb-4 block overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">My contact info</p>
            </div>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Played LinkedIn */}
        <Link href="#" className="mb-4 block overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black">
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Played | LinkedIn</p>
            </div>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Played */}
        <Link href="#" className="mb-8 block overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black">
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Played</p>
            </div>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Social Icons */}
        <div className="mb-6 flex justify-center">
          <a href="#" className="text-white transition-opacity hover:opacity-80">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>

        {/* Footer Text */}
        <p className="mb-6 text-center text-xs text-white/70">View on mobile</p>

        {/* QR Code Placeholder */}
        <div className="mb-8 flex justify-center">
          <div className="h-24 w-24 rounded-lg bg-white p-2">
            <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-4 text-xs text-white/70">
          <Link href="#" className="hover:text-white">Cookie Preferences</Link>
          <span>•</span>
          <Link href="#" className="hover:text-white">Report</Link>
          <span>•</span>
          <Link href="#" className="hover:text-white">Privacy</Link>
        </div>
      </div>
    </div>
  )
}
