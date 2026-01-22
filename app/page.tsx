import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-blue-50 to-white py-20 dark:from-slate-900 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight">
              Find Your Perfect Cricket Club
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Discover cricket clubs across England and Wales. From junior training to competitive teams,
              find the right club for you.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/search">
                <Button size="lg" className="w-full sm:w-auto">
                  Search Clubs
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Everything You Need to Find Your Club</h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive directory makes it easy to discover clubs that match your needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Profiles</CardTitle>
                <CardDescription>
                  View club facilities, teams, upcoming events, and member reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Each club has a comprehensive profile showcasing their offerings, amenities,
                  and what makes them unique.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Search</CardTitle>
                <CardDescription>
                  Filter by location, age group, skill level, and facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced search filters help you find clubs that match your specific requirements
                  and preferences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verified Clubs</CardTitle>
                <CardDescription>
                  All clubs are verified by the England and Wales Cricket Board
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Trust that you're finding legitimate, ECB-affiliated clubs committed to
                  cricket development.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Join Easily</CardTitle>
                <CardDescription>
                  Express interest or join clubs directly through their profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Simple contact forms and direct links make it easy to get in touch with clubs
                  and start your cricket journey.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Events & Sessions</CardTitle>
                <CardDescription>
                  See upcoming training, matches, and social events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Stay updated with what's happening at clubs, from regular training sessions
                  to special events.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Reviews</CardTitle>
                <CardDescription>
                  Read what current and past members have to say
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Make informed decisions based on real experiences from club members and visitors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Playing Cricket?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of cricket enthusiasts across England and Wales
            </p>
            <Link href="/search">
              <Button size="lg">
                Find Your Club Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 England and Wales Cricket Board. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
