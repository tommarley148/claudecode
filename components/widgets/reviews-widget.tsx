'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

interface Review {
  id: string
  authorName: string
  rating: number
  title: string
  content: string
  verified: boolean
  createdAt: Date
  status: string
}

interface ReviewsWidgetProps {
  reviews: Review[]
  clubId: string
  maxReviews?: number
}

export function ReviewsWidget({ reviews, clubId, maxReviews = 10 }: ReviewsWidgetProps) {
  // Filter approved reviews and limit
  const approvedReviews = reviews
    .filter(review => review.status === 'APPROVED')
    .slice(0, maxReviews)

  if (approvedReviews.length === 0) {
    return null
  }

  // Calculate average rating
  const averageRating = (
    approvedReviews.reduce((sum, review) => sum + review.rating, 0) /
    approvedReviews.length
  ).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Reviews</CardTitle>
        <CardDescription>
          {approvedReviews.length} reviews • {averageRating} average rating
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {approvedReviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{review.authorName}</h4>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Member
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <h5 className="mb-2 font-medium">{review.title}</h5>
              <p className="text-sm text-muted-foreground">{review.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
