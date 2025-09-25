import { useState } from "react";
import { Star, MapPin, Calendar, Shield, MessageCircle, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ReviewCard } from "./ReviewCard";

interface User {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  location: string;
  joinDate: string;
  isVerified: boolean;
  totalRentals: number;
  totalListings: number;
  averageRating: number;
  totalReviews: number;
}

interface UserProfileProps {
  user: User;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onSendMessage?: () => void;
}

// Mock review data
const mockReviews = [
  {
    id: "1",
    reviewerName: "Sarah Kim",
    reviewerAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    comment: "Amazing experience! The dress was in perfect condition and fit beautifully. Emma was so responsive and helpful throughout the process. Would definitely rent from her again!",
    date: "2 weeks ago",
    tags: ["Great quality", "Perfect fit", "Responsive host"],
    helpfulCount: 3,
    type: "renter" as const,
    itemRented: "Silk Evening Gown"
  },
  {
    id: "2",
    reviewerName: "Mike Johnson",
    reviewerAvatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 4,
    comment: "Sarah took great care of my vintage jacket. Returned it in the same condition as when she borrowed it. Great communication and very respectful of my items.",
    date: "1 month ago",
    tags: ["Careful with items", "Great communication", "On time"],
    helpfulCount: 1,
    type: "lender" as const,
    itemRented: "Vintage Leather Jacket"
  },
  {
    id: "3",
    reviewerName: "Lisa Chen",
    reviewerAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    comment: "The wedding dress was absolutely stunning and saved my day! Quick pickup and the dress was exactly as described. Highly recommend!",
    date: "1 month ago",
    tags: ["Excellent condition", "Fast delivery", "Perfect fit"],
    helpfulCount: 5,
    type: "renter" as const,
    itemRented: "Designer Wedding Dress"
  }
];

export function UserProfile({ user, isOwnProfile = false, onEditProfile, onSendMessage }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("renter-reviews");

  const renterReviews = mockReviews.filter(review => review.type === "renter");
  const lenderReviews = mockReviews.filter(review => review.type === "lender");

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 ring-4 ring-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{user.averageRating}</span>
                  <span className="text-muted-foreground">
                    ({user.totalReviews} reviews)
                  </span>
                </div>
                {user.isVerified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Shield className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <div className="flex gap-2">
                  {isOwnProfile && onEditProfile ? (
                    <Button onClick={onEditProfile} variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    onSendMessage && (
                      <Button onClick={onSendMessage} variant="outline" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {user.joinDate}
                </div>
              </div>

              <p className="text-foreground leading-relaxed">{user.bio}</p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{user.totalRentals}</div>
                  <div className="text-sm text-muted-foreground">Total Rentals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{user.totalListings}</div>
                  <div className="text-sm text-muted-foreground">Items Listed</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="renter-reviews" className="relative">
                Reviews as Renter
                <Badge variant="secondary" className="ml-2">
                  {renterReviews.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="lender-reviews" className="relative">
                Reviews as Lender
                <Badge variant="secondary" className="ml-2">
                  {lenderReviews.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="renter-reviews" className="mt-6 space-y-4">
              <p className="text-muted-foreground">
                Reviews from people who lent items to {isOwnProfile ? 'you' : user.name}
              </p>
              {renterReviews.length > 0 ? (
                renterReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No reviews as a renter yet
                </p>
              )}
            </TabsContent>

            <TabsContent value="lender-reviews" className="mt-6 space-y-4">
              <p className="text-muted-foreground">
                Reviews from people who rented items from {isOwnProfile ? 'you' : user.name}
              </p>
              {lenderReviews.length > 0 ? (
                lenderReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No reviews as a lender yet
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}