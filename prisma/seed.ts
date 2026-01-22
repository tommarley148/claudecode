import { PrismaClient } from '@prisma/client'
import {
  generateCompleteClub,
  generateClub,
  generateVenue,
  generateOffering,
  generateTeam,
  generateEvent,
  generateReview,
} from '../lib/dummy-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
  await prisma.review.deleteMany()
  await prisma.event.deleteMany()
  await prisma.team.deleteMany()
  await prisma.offering.deleteMany()
  await prisma.venue.deleteMany()
  await prisma.clubAdmin.deleteMany()
  await prisma.club.deleteMany()

  console.log('✅ Existing data cleared')

  // Generate 30 clubs with full data
  const numClubs = 30
  console.log(`📝 Generating ${numClubs} clubs...`)

  for (let i = 0; i < numClubs; i++) {
    const data = generateCompleteClub()

    // Create club
    const club = await prisma.club.create({
      data: data.club,
    })

    console.log(`  ✓ Created club: ${club.name}`)

    // Create venues
    const venuePromises = data.venues.map((venue) =>
      prisma.venue.create({
        data: {
          ...venue,
          clubId: club.id,
        },
      })
    )
    const venues = await Promise.all(venuePromises)

    // Create offerings
    const offeringPromises = data.offerings.map((offering) =>
      prisma.offering.create({
        data: {
          ...offering,
          clubId: club.id,
        },
      })
    )
    await Promise.all(offeringPromises)

    // Create teams
    const teamPromises = data.teams.map((team) =>
      prisma.team.create({
        data: {
          ...team,
          clubId: club.id,
        },
      })
    )
    await Promise.all(teamPromises)

    // Create events (some with venues, some without)
    const eventPromises = data.events.map((event, index) =>
      prisma.event.create({
        data: {
          ...event,
          clubId: club.id,
          venueId: index % 2 === 0 && venues.length > 0 ? venues[0].id : null,
        },
      })
    )
    await Promise.all(eventPromises)

    // Create reviews
    const reviewPromises = data.reviews.map((review) =>
      prisma.review.create({
        data: {
          ...review,
          clubId: club.id,
        },
      })
    )
    await Promise.all(reviewPromises)

    console.log(
      `    → ${venues.length} venues, ${data.offerings.length} offerings, ${data.teams.length} teams, ${data.events.length} events, ${data.reviews.length} reviews`
    )
  }

  // Get some stats
  const stats = {
    clubs: await prisma.club.count(),
    venues: await prisma.venue.count(),
    offerings: await prisma.offering.count(),
    teams: await prisma.team.count(),
    events: await prisma.event.count(),
    reviews: await prisma.review.count(),
  }

  console.log('\n📊 Database seeded successfully!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Clubs:     ${stats.clubs}`)
  console.log(`Venues:    ${stats.venues}`)
  console.log(`Offerings: ${stats.offerings}`)
  console.log(`Teams:     ${stats.teams}`)
  console.log(`Events:    ${stats.events}`)
  console.log(`Reviews:   ${stats.reviews}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
