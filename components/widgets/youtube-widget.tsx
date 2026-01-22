import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface YouTubeWidgetProps {
  channelId?: string
  playlistId?: string
  maxVideos?: number
}

export function YouTubeWidget({ channelId, playlistId, maxVideos = 3 }: YouTubeWidgetProps) {
  // Mock video data - in production this would fetch from YouTube API
  const mockVideos = [
    { id: '1', title: 'Match Highlights: Local Derby', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
    { id: '2', title: 'Training Session with Coach', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
    { id: '3', title: 'Club Open Day 2026', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Videos</CardTitle>
        <CardDescription>From our YouTube channel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockVideos.slice(0, maxVideos).map((video) => (
            <div key={video.id} className="space-y-2">
              <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Video Embed
                </div>
              </div>
              <p className="text-sm font-medium">{video.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
