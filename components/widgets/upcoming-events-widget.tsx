import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'

interface Event {
  id: string
  title: string
  description: string
  type: string
  startDate: Date
  endDate: Date
  status: string
  featured: boolean
}

interface UpcomingEventsWidgetProps {
  events: Event[]
  maxEvents?: number
}

export function UpcomingEventsWidget({ events, maxEvents = 5 }: UpcomingEventsWidgetProps) {
  // Filter and sort upcoming events
  const upcomingEvents = events
    .filter(event => event.status === 'SCHEDULED' && new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, maxEvents)

  if (upcomingEvents.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>See what's happening at our club</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-2 border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{event.title}</h3>
                {event.featured && (
                  <Badge variant="secondary" className="ml-2">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline">{event.type}</Badge>
                <span className="text-muted-foreground">
                  {formatDateTime(event.startDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
