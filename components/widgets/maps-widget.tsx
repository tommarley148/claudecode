import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Venue {
  id: string
  name: string
  address: any
  latitude: number
  longitude: number
}

interface MapsWidgetProps {
  venue: Venue
}

export function MapsWidget({ venue }: MapsWidgetProps) {
  const address = venue.address
  const addressString = typeof address === 'object'
    ? `${address.street}, ${address.city}, ${address.postcode}`
    : address

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
        <CardDescription>{venue.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted p-4">
            <p className="text-sm">{addressString}</p>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Map Embed
              <br />
              (Coordinates: {venue.latitude.toFixed(4)}, {venue.longitude.toFixed(4)})
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
