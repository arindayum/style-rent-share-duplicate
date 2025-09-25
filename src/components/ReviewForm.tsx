import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  type: 'renter' | 'lender';
  userName: string;
  itemName?: string;
  onSubmit: (review: {
    rating: number;
    comment: string;
    tags: string[];
  }) => void;
}

const quickTags = {
  renter: [
    "Great quality",
    "Perfect fit",
    "Fast delivery",
    "Excellent condition",
    "Responsive host",
    "Easy pickup"
  ],
  lender: [
    "Careful with items",
    "On time",
    "Great communication",
    "Returned in perfect condition",
    "Friendly",
    "Would rent again"
  ]
};

export function ReviewForm({ type, userName, itemName, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (comment.length < 30) {
      toast({
        title: "Comment too short",
        description: "Please write at least 30 characters in your review.",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      rating,
      comment,
      tags: selectedTags
    });

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });

    // Reset form
    setRating(0);
    setComment("");
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Card className="w-full border-border/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          Review {type === 'renter' ? 'Lender' : 'Renter'}
        </CardTitle>
        <p className="text-muted-foreground">
          Share your experience with {userName}
          {itemName && ` for "${itemName}"`}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Star Rating */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Rating *</label>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                className="p-1 hover:scale-110 transition-transform"
                onMouseEnter={() => setHoveredRating(i + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(i + 1)}
              >
                <Star
                  className={`h-8 w-8 ${
                    i < (hoveredRating || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground/30'
                  } transition-colors`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                {rating} star{rating !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Quick Tags */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Quick Tags (Optional)</label>
          <div className="flex flex-wrap gap-2">
            {quickTags[type].map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'hover:bg-primary/10 hover:text-primary'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Written Review */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Written Review * (minimum 30 characters)
          </label>
          <Textarea
            placeholder={`Share your experience with ${userName}...`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[120px] resize-none bg-background/50 border-border/20 focus:bg-background/80 transition-colors"
          />
          <p className="text-xs text-muted-foreground">
            {comment.length}/30 characters minimum
          </p>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          <Send className="mr-2 h-4 w-4" />
          Submit Review
        </Button>
      </CardContent>
    </Card>
  );
}