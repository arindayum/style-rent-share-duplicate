import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Package, Star, TrendingUp, Users } from "lucide-react";
import { RentalStatus } from "@/components/RentalStatus";
import { ReviewForm } from "@/components/ReviewForm";
import { useToast } from "@/hooks/use-toast";
import { addDays } from "date-fns";

// Mock rental data
const mockRentals = [
  {
    id: "rent-1",
    item: {
      id: "item-1",
      title: "Designer Evening Gown",
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300",
      price: 45
    },
    counterparty: {
      id: "user-2",
      name: "Sarah Kim",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    status: "pending" as const,
    startDate: addDays(new Date(), 2),
    endDate: addDays(new Date(), 4),
    totalPrice: 90,
    type: "lender" as const,
    notes: "Need this for a wedding ceremony. Hope it fits well!",
    createdAt: new Date()
  },
  {
    id: "rent-2",
    item: {
      id: "item-2",
      title: "Vintage Leather Jacket",
      image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=300",
      price: 35
    },
    counterparty: {
      id: "user-3",
      name: "Mike Johnson",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    status: "active" as const,
    startDate: new Date(),
    endDate: addDays(new Date(), 3),
    totalPrice: 105,
    type: "renter" as const,
    createdAt: addDays(new Date(), -2)
  },
  {
    id: "rent-3",
    item: {
      id: "item-3",
      title: "Silk Cocktail Dress",
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=300",
      price: 40
    },
    counterparty: {
      id: "user-4",
      name: "Lisa Chen",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    status: "completed" as const,
    startDate: addDays(new Date(), -10),
    endDate: addDays(new Date(), -8),
    totalPrice: 80,
    type: "lender" as const,
    createdAt: addDays(new Date(), -12)
  }
];

const dashboardStats = {
  totalEarnings: 1247,
  activeRentals: 3,
  totalListings: 15,
  averageRating: 4.9
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAcceptRental = (rentalId: string) => {
    toast({
      title: "Rental accepted!",
      description: "The renter has been notified.",
    });
  };

  const handleDeclineRental = (rentalId: string) => {
    toast({
      title: "Rental declined",
      description: "The renter has been notified.",
    });
  };

  const handleMessage = (rentalId: string) => {
    toast({
      title: "Opening chat",
      description: "Messaging feature coming soon!",
    });
  };

  const handleReview = (rentalId: string) => {
    setShowReviewForm(rentalId);
  };

  const handleReviewSubmit = (review: { rating: number; comment: string; tags: string[] }) => {
    console.log('Review submitted:', review);
    setShowReviewForm(null);
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
  };

  const getFilteredRentals = (status?: string) => {
    if (!status) return mockRentals;
    return mockRentals.filter(rental => rental.status === status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your rentals and track your activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold text-foreground">${dashboardStats.totalEarnings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Rentals</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.activeRentals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.totalListings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <Badge variant="secondary" className="ml-2">
                {getFilteredRentals('pending').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              <Badge variant="secondary" className="ml-2">
                {getFilteredRentals('active').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRentals.slice(0, 3).map((rental) => (
                    <RentalStatus
                      key={rental.id}
                      rental={rental}
                      onAccept={() => handleAcceptRental(rental.id)}
                      onDecline={() => handleDeclineRental(rental.id)}
                      onMessage={() => handleMessage(rental.id)}
                      onReview={() => handleReview(rental.id)}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 text-left bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors">
                      <Package className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-medium">Add New Item</h3>
                      <p className="text-sm text-muted-foreground">List a new item for rent</p>
                    </button>
                    <button className="p-4 text-left bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors">
                      <Users className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-medium">Browse Items</h3>
                      <p className="text-sm text-muted-foreground">Find something to rent</p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6 space-y-4">
            {getFilteredRentals('pending').map((rental) => (
              <RentalStatus
                key={rental.id}
                rental={rental}
                onAccept={() => handleAcceptRental(rental.id)}
                onDecline={() => handleDeclineRental(rental.id)}
                onMessage={() => handleMessage(rental.id)}
              />
            ))}
            {getFilteredRentals('pending').length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No pending rentals
              </p>
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-6 space-y-4">
            {getFilteredRentals('active').map((rental) => (
              <RentalStatus
                key={rental.id}
                rental={rental}
                onMessage={() => handleMessage(rental.id)}
              />
            ))}
            {getFilteredRentals('active').length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No active rentals
              </p>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6 space-y-4">
            {getFilteredRentals('completed').map((rental) => (
              <RentalStatus
                key={rental.id}
                rental={rental}
                onMessage={() => handleMessage(rental.id)}
                onReview={() => handleReview(rental.id)}
              />
            ))}
            {getFilteredRentals('completed').length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No completed rentals
              </p>
            )}
          </TabsContent>
        </Tabs>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
              <ReviewForm
                type="lender"
                userName="Lisa Chen"
                itemName="Silk Cocktail Dress"
                onSubmit={handleReviewSubmit}
              />
              <button
                onClick={() => setShowReviewForm(null)}
                className="mt-4 w-full text-center text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}