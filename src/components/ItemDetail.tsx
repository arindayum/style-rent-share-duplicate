import { useState } from "react";
import { Calendar, MapPin, Star, Heart, Share2, MessageCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ReviewCard } from "./ReviewCard";

interface ClothingItem {
  id: string;
  images: string[];
  title: string;
  description: string;
  size: string;
  price: number;
  condition: string;
  category: string;
  owner: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
    responseTime: string;
  };
  location: string;
  availability: string;
  averageRating: number;
  totalReviews: number;
}

interface ItemDetailProps {
  item: ClothingItem;
  onBack: () => void;
  onRent: () => void;
  onMessage: () => void;
  onViewProfile: () => void;
}

// Mock reviews for this item
const itemReviews = [
  {
    id: "1",
    reviewerName: "Sarah Kim",
    reviewerAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    comment: "This dress was absolutely perfect for my date night! The fit was exactly as described and the quality is amazing. Emma was so helpful and responsive. Highly recommend!",
    date: "2 weeks ago",
    tags: ["Perfect fit", "Great quality", "Responsive host"],
    helpfulCount: 4,
    type: "renter" as const,
    itemRented: "This item"
  },
  {
    id: "2",
    reviewerName: "Lisa Chen",
    reviewerAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    comment: "Stunning dress! Got so many compliments at the wedding. The fabric is luxurious and the photos don't do it justice. Will definitely rent from Emma again.",
    date: "1 month ago",
    tags: ["Excellent condition", "Beautiful", "Great photos"],
    helpfulCount: 2,
    type: "renter" as const,
    itemRented: "This item"
  }
];

export function ItemDetail({ item, onBack, onRent, onMessage, onViewProfile }: ItemDetailProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4 hover:bg-primary/10"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-muted">
            <img
              src={item.images[currentImage]}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          {item.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImage === index ? 'border-primary' : 'border-border/20'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                  </span>
                  {item.averageRating > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {item.averageRating} ({item.totalReviews} reviews)
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-4xl font-bold text-primary mb-4">
              {item.price}
              <span className="text-lg text-muted-foreground font-normal"> / day</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">Size {item.size}</Badge>
              <Badge variant="outline">{item.condition}</Badge>
              <Badge variant="outline">{item.category}</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {item.availability}
              </Badge>
            </div>

            <p className="text-foreground leading-relaxed mb-6">{item.description}</p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={onRent}
                className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Rent This Item
              </Button>
              <Button 
                variant="outline" 
                onClick={onMessage}
                className="flex-1 sm:flex-initial"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Message Owner
              </Button>
            </div>
          </div>

          {/* Owner Info */}
          <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                  <AvatarImage src={item.owner.avatar} alt={item.owner.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                    {item.owner.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.owner.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {item.owner.rating} ({item.owner.reviewCount} reviews)
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Usually responds within {item.owner.responseTime}
                  </p>
                </div>
                <Button onClick={onViewProfile} variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section */}
      <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">What people say about this outfit</CardTitle>
          <p className="text-muted-foreground">
            Reviews from people who have rented this item
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {itemReviews.length > 0 ? (
            itemReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No reviews for this item yet. Be the first to rent it!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}