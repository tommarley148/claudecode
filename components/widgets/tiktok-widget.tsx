import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface TikTokWidgetProps {
  username: string
  maxVideos?: number
}

export function TikTokWidget({ username, maxVideos = 3 }: TikTokWidgetProps) {
  // Mock TikTok data - in production this would fetch from TikTok API
  const mockVideos = [
    { id: '1', caption: 'Behind the scenes at training! 🏏' },
    { id: '2', caption: 'Match day vibes ⚡' },
    { id: '3', caption: 'Meet our junior squad 👊' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>TikTok</CardTitle>
        <CardDescription>@{username}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-3">
          {mockVideos.slice(0, maxVideos).map((video) => (
            <div key={video.id} className="space-y-2">
              <div className="aspect-[9/16] overflow-hidden rounded-lg border bg-muted">
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  TikTok
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
