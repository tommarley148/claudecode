import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AmenitiesWidgetProps {
  amenities: string[]
}

export function AmenitiesWidget({ amenities }: AmenitiesWidgetProps) {
  if (amenities.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facilities & Amenities</CardTitle>
        <CardDescription>What we offer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity) => (
            <Badge key={amenity} variant="secondary">
              {amenity}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
