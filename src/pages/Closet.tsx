

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar,
  DollarSign,
  Star,
  Upload,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import { Link } from "react-router-dom";

const Closet = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'available' | 'rented' | 'unavailable'>('all');

  const mockItems = [
    {
      id: 1,
      title: "Elegant Black Evening Gown",
      price: 199,
      status: "available",
      totalRentals: 12,
      rating: 4.9,
      earnings: 540,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQF58t0nuWMZGihWSI8DfS42Sb6TSKGokaBfzn1gqlTgRv-dXLopA666ja6bbpo_y8LMYM10CIEJwuOTlV5UHiUBsc3aLgeSOFV1JjRetNH",
      dateAdded: "2024-01-15",
      lastRented: "2024-03-10"
    },
    {
      id: 2,
      title: "Vintage Floral Summer Dress",
      price: 399,
      status: "rented",
      totalRentals: 8,
      rating: 4.8,
      earnings: 200,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS9cnTtNZVtbsYnqssiIBKf1VxblfdKxNU43FiCtDkhlhWtPBy2_1gzrW27xY6QQzOX6yoqzAEpY0DxuLqqBnlJLOMGsbVcbbF9mF1uAw",
      dateAdded: "2024-02-01",
      lastRented: "2024-03-20"
    },
    {
      id: 3,
      title: "Designer Wedding Guest Dress",
      price: 499,
      status: "unavailable",
      totalRentals: 15,
      rating: 5.0,
      earnings: 900,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRhC9YhmpN5kj4H1W4fNyVOD2v_txLRqfsmj4u9tS6554cF4qXu0vjlOC8zURBMCeZfsqxUGauHJ28KD8l7g8i_8KQ4nH_z0m6YnD8WRAUCNDIgdd_V5GtxIjNl4wrP9St9njDH_A&usqp=CAc",
      dateAdded: "2023-12-10",
      lastRented: "2024-03-18"
    },
    {
      id: 4,
      title: "Boho Maxi Dress",
      price: 279,
      status: "available",
      totalRentals: 5,
      rating: 4.7,
      earnings: 175,
      image: "https://4.imimg.com/data4/HG/GM/MY-271218/indian-bohemian-dresses.png",
      dateAdded: "2024-02-20",
      lastRented: "2024-03-05"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'rented': return 'bg-gold';
      case 'unavailable': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const filteredItems = mockItems.filter(item => 
    filter === 'all' || item.status === filter
  );

  const totalEarnings = mockItems.reduce((sum, item) => sum + item.earnings, 0);
  const totalItems = mockItems.length;
  const availableItems = mockItems.filter(item => item.status === 'available').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">My Closet</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {/* ... your stats cards remain unchanged ... */}

        {/* Filters */}
        {/* ... your filters remain unchanged ... */}

        {/* Items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-[3/4] bg-muted overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <Badge className={`absolute top-3 left-3 ${getStatusColor(item.status)} text-white`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                  <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" className="w-8 h-8 p-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {/* Card body unchanged */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium text-foreground ml-1">₹{item.price}/day</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Earned:</span>
                      <span className="font-medium text-foreground ml-1">₹{item.earnings}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rentals:</span>
                      <span className="font-medium text-foreground ml-1">{item.totalRentals}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-gold fill-current mr-1" />
                      <span className="font-medium text-foreground">{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-6 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  {/* rest unchanged */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Added: {new Date(item.dateAdded).toLocaleDateString()}</span>
                          <span>Last rented: {new Date(item.lastRented).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(item.status)} text-white`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm text-muted-foreground mb-1">Earnings</div>
                    <div className="text-xl font-bold text-foreground">₹{item.earnings}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm text-muted-foreground mb-1">Rating</div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gold fill-current mr-1" />
                      <span className="font-medium text-foreground">{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                    <Button size="sm" variant="outline">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Closet;
