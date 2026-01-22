import { searchClubs } from '@/lib/services/club-service'

export default async function TestPage() {
  const clubs = await searchClubs({}, 1, 5)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page - Club Data</h1>
      <p className="mb-4">Found {clubs.total} clubs</p>

      <div className="space-y-4">
        {clubs.data.map((club) => (
          <div key={club.id} className="border p-4 rounded">
            <h2 className="font-bold">{club.name}</h2>
            <p>Slug: {club.slug}</p>
            <p>Teams: {club.teams?.length || 0}</p>
            <p>Venues: {club.venues?.length || 0}</p>
            <p>Events: {club.events?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
