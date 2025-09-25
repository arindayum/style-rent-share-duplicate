import { useState } from "react";
import { UserProfile } from "@/components/UserProfile";
import { ReviewForm } from "@/components/ReviewForm";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const mockUser = {
  id: "user-123",
  name: "Emma Thompson",
  avatar: "/placeholder.svg",
  bio: "Fashion enthusiast and sustainable style advocate. I love sharing my curated collection of designer pieces and discovering unique finds from fellow style lovers. Let's make fashion more accessible and sustainable together! ✨",
  location: "San Francisco, CA",
  joinDate: "March 2023",
  isVerified: true,
  totalRentals: 47,
  totalListings: 23,
  averageRating: 4.9,
  totalReviews: 32
};

export default function Profile() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing feature coming soon!",
    });
  };

  const handleSendMessage = () => {
    toast({
      title: "Send Message",
      description: "Messaging feature coming soon!",
    });
  };

  const handleReviewSubmit = (review: { rating: number; comment: string; tags: string[] }) => {
    console.log('Review submitted:', review);
    setShowReviewForm(false);
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">Manage your account and view your rental history</p>
        </div>

        <UserProfile
          user={mockUser}
          isOwnProfile={true}
          onEditProfile={handleEditProfile}
        />

        {/* Demo Review Form */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Leave a Review (Demo)</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="text-primary hover:text-primary-glow transition-colors"
            >
              {showReviewForm ? 'Hide' : 'Show'} Review Form
            </button>
          </div>
          
          {showReviewForm && (
            <ReviewForm
              type="renter"
              userName="Sarah Kim"
              itemName="Designer Evening Gown"
              onSubmit={handleReviewSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}