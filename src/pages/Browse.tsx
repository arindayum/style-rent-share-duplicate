import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Heart, 
  MapPin, 
  Star, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";

const Browse = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'swipe'>('grid');
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);

  const mockItems = [
    {
      id: 1,
      title: "Elegant Black Evening Gown",
      owner: "Sarah M.",
      price: 45,
      location: "Manhattan, NY",
      rating: 4.9,
      reviews: 23,
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Evening", "Designer", "Size M"],
      available: true
    },
    {
      id: 2,
      title: "Vintage Floral Summer Dress",
      owner: "Emma L.",
      price: 25,
      location: "Brooklyn, NY",
      rating: 4.8,
      reviews: 15,
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Casual", "Vintage", "Size S"],
      available: true
    },
    {
      id: 3,
      title: "Designer Wedding Guest Dress",
      owner: "Jessica K.",
      price: 60,
      location: "Queens, NY",
      rating: 5.0,
      reviews: 31,
      image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Wedding", "Designer", "Size L"],
      available: false
    },
    {
      id: 4,
      title: "Boho Maxi Dress",
      owner: "Maya R.",
      price: 35,
      location: "Manhattan, NY",
      rating: 4.7,
      reviews: 18,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Boho", "Festival", "Size M"],
      available: true
    }
  ];

  const nextSwipe = () => {
    setCurrentSwipeIndex((prev) => (prev + 1) % mockItems.length);
  };

  const prevSwipe = () => {
    setCurrentSwipeIndex((prev) => (prev - 1 + mockItems.length) % mockItems.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StyleShare</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'swipe' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('swipe')}
              >
                <Layers className="w-4 h-4 mr-2" />
                Swipe
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by style, occasion, or designer..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Evening Wear</Badge>
            <Badge variant="secondary">Casual</Badge>
            <Badge variant="secondary">Wedding</Badge>
            <Badge variant="secondary">Size S</Badge>
            <Badge variant="secondary">Under $30</Badge>
            <Badge variant="secondary">Available Now</Badge>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockItems.map((item) => (
              <Card key={item.id} className="group cursor-pointer bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-[3/4] bg-muted overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-secondary/30 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Fashion Image</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-3 right-3 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  {!item.available && (
                    <Badge className="absolute bottom-3 left-3 bg-destructive">
                      Unavailable
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.location}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm">
                      <Star className="w-3 h-3 text-gold fill-current mr-1" />
                      <span className="text-foreground font-medium">{item.rating}</span>
                      <span className="text-muted-foreground ml-1">({item.reviews})</span>
                    </div>
                    <span className="font-bold text-foreground">${item.price}/day</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" disabled={!item.available}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.available ? 'Rent Now' : 'Unavailable'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Swipe View */}
        {viewMode === 'swipe' && (
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Card className="bg-gradient-card border-0 shadow-strong overflow-hidden">
                <div className="aspect-[3/4] bg-muted overflow-hidden relative">
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-secondary/30 flex items-center justify-center">
                    <span className="text-muted-foreground">Fashion Image</span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {mockItems[currentSwipeIndex].title}
                  </h2>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {mockItems[currentSwipeIndex].location}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gold fill-current mr-1" />
                      <span className="text-foreground font-medium">{mockItems[currentSwipeIndex].rating}</span>
                      <span className="text-muted-foreground ml-1">({mockItems[currentSwipeIndex].reviews} reviews)</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground">${mockItems[currentSwipeIndex].price}/day</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mockItems[currentSwipeIndex].tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Rent This Item
                  </Button>
                </div>
              </Card>
              
              {/* Navigation Buttons */}
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 rounded-full"
                onClick={prevSwipe}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 rounded-full"
                onClick={nextSwipe}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Swipe Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {mockItems.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSwipeIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;