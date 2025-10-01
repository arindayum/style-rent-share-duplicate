import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, Sparkles, Users, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ItemDetail } from "@/components/ItemDetail";
import { RentalFlow } from "@/components/RentalFlow";
import { UserProfile } from "@/components/UserProfile";

// Mock data for demonstration
const mockItem = {
  id: "item-1",
  images: [
    "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQF58t0nuWMZGihWSI8DfS42Sb6TSKGokaBfzn1gqlTgRv-dXLopA666ja6bbpo_y8LMYM10CIEJwuOTlV5UHiUBsc3aLgeSOFV1JjRetNH",
    "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT4eVbjXr4s1IafFT7KpYssLQtqeFY7fG-gcYam5ML697njziAEzhwDYNAF39tW1xc0CWJmOB7XTg_MA0FOHLKWm26a1NFAE2CkgW9z200a2LHG4PAcvfjvzw"
  ],
  title: "Elegant Black Evening Gown",
  description: "Stunning designer evening gown perfect for formal events, galas, and special occasions. Made from luxurious silk with intricate beadwork details. This dress has been worn to several high-profile events and always receives compliments. Dry clean only.",
  size: "M",
  price: 299,
  condition: "Excellent",
  category: "Evening Wear",
  owner: {
    id: "owner-1",
    name: "Emma Thompson",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 4.9,
    reviewCount: 23,
    responseTime: "2 hours"
  },
  location: "Manhattan, NY",
  availability: "Available",
  averageRating: 4.8,
  totalReviews: 15
};

const mockUser = {
  id: "user-123",
  name: "Sarah Johnson",
  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
  bio: "Fashion enthusiast and sustainable style advocate. I love sharing my curated collection of designer pieces and discovering unique finds from fellow style lovers.",
  location: "San Francisco, CA",
  joinDate: "March 2023",
  isVerified: true,
  totalRentals: 47,
  totalListings: 23,
  averageRating: 4.9,
  totalReviews: 32
};

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'item-detail' | 'rental-flow' | 'profile'>('home');
  const [showRentalFlow, setShowRentalFlow] = useState(false);

  const handleRentItem = () => {
    setShowRentalFlow(true);
  };

  const handleRentalSubmit = (request: any) => {
    console.log('Rental request:', request);
    setShowRentalFlow(false);
    alert('Rental request sent successfully!');
  };

  const handleViewItemDetail = () => {
    setCurrentView('item-detail');
  };

  const handleViewProfile = () => {
    setCurrentView('profile');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setShowRentalFlow(false);
  };

  if (currentView === 'item-detail') {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-foreground">StyleShare</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleBackToHome}>Back to Home</Button>
                <Button onClick={handleViewProfile}>View Profile</Button>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8">
          <ItemDetail
            item={mockItem}
            onBack={handleBackToHome}
            onRent={handleRentItem}
            onMessage={() => alert('Messaging feature coming soon!')}
            onViewProfile={handleViewProfile}
          />
        </div>
        {showRentalFlow && (
          <RentalFlow
            item={{
              id: mockItem.id,
              title: mockItem.title,
              price: mockItem.price,
              image: mockItem.images[0],
              owner: mockItem.owner.name
            }}
            onClose={() => setShowRentalFlow(false)}
            onSubmit={handleRentalSubmit}
          />
        )}
      </div>
    );
  }

  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-foreground">StyleShare</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleBackToHome}>Back to Home</Button>
                <Button onClick={() => setCurrentView('item-detail')}>View Item</Button>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8">
          <UserProfile
            user={mockUser}
            isOwnProfile={false}
            onSendMessage={() => alert('Messaging feature coming soon!')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">StyleShare</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse
              </Link>
              <Link to="/closet" className="text-muted-foreground hover:text-foreground transition-colors">
                My Closet
              </Link>
              <button 
                onClick={handleViewItemDetail}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Demo Item
              </button>
              <button 
                onClick={handleViewProfile}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Demo Profile
              </button>
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              Fashion rental reimagined
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 animate-fade-up">
              Share Your Style,
              <span className="bg-gradient-accent bg-clip-text text-transparent"> Rent Your Dream</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-up">
              Discover thousands of unique pieces from fashion lovers worldwide. Rent designer clothes, share your wardrobe, and express your style sustainably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/browse">
                  <Search className="w-5 h-5 mr-2" />
                  Start Browsing
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4"
                onClick={handleViewItemDetail}
              >
                <Heart className="w-5 h-5 mr-2" />
                Try Demo Item
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why StyleShare?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The smarter way to expand your wardrobe and monetize your style
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Community Driven
              </h3>
              <p className="text-muted-foreground">
                Connect with fashion enthusiasts, build your reputation, and discover unique pieces from real people in your area.
              </p>
            </Card>
            <Card className="p-8 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Earn & Save
              </h3>
              <p className="text-muted-foreground">
                Monetize your wardrobe by renting out pieces you rarely wear, while accessing designer items at a fraction of retail price.
              </p>
            </Card>
            <Card className="p-8 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Safe & Secure
              </h3>
              <p className="text-muted-foreground">
                Verified users, secure payments, damage protection, and comprehensive reviews ensure every transaction is worry-free.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Rent or lend in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Discover & Browse
              </h3>
              <p className="text-muted-foreground">
                Swipe through unique pieces, browse by event type, or explore closets from fashion lovers in your area.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Request & Connect
              </h3>
              <p className="text-muted-foreground">
                Send a rental request with your dates and message. Chat directly with owners to ask questions or arrange pickup.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Wear & Review
              </h3>
              <p className="text-muted-foreground">
                Enjoy your rental! Return on time and leave a review to build trust in the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion enthusiasts who are already sharing, renting, and discovering amazing styles.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
            Join StyleShare Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StyleShare</span>
            </div>
            <div className="flex space-x-6 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;