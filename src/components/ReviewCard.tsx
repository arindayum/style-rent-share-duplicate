import { Star, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  tags: string[];
  helpfulCount?: number;
  type: 'renter' | 'lender';
  itemRented?: string;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="w-full border-border/20 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarImage src={review.reviewerAvatar} alt={review.reviewerName} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
              {review.reviewerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">{review.reviewerName}</h4>
                <p className="text-sm text-muted-foreground">
                  {review.type === 'renter' ? 'Rented from you' : 'Lent to you'}
                  {review.itemRented && ` • ${review.itemRented}`}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{review.date}</p>
              </div>
            </div>
            
            <p className="text-foreground leading-relaxed">{review.comment}</p>
            
            {review.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {review.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {review.helpfulCount && review.helpfulCount > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-border/20">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  {review.helpfulCount} found this helpful
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}