import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Team {
  id: string
  name: string
  ageGroup: string
  gender: string
  skillLevel: string
  division?: string | null
  captain?: string | null
  coach?: string | null
}

interface TeamsWidgetProps {
  teams: Team[]
}

export function TeamsWidget({ teams }: TeamsWidgetProps) {
  if (teams.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Teams</CardTitle>
        <CardDescription>Meet the teams that represent our club</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {teams.map((team) => (
            <div
              key={team.id}
              className="rounded-lg border p-4 transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 font-semibold">{team.name}</h3>
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge variant="outline">{team.ageGroup}</Badge>
                <Badge variant="outline">{team.gender}</Badge>
                {team.division && <Badge variant="secondary">{team.division}</Badge>}
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                {team.captain && <p>Captain: {team.captain}</p>}
                {team.coach && <p>Coach: {team.coach}</p>}
                <p>Level: {team.skillLevel}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
