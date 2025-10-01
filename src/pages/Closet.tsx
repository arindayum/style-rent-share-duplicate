




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
      price: 350,
      status: "available",
      totalRentals: 12,
      rating: 4.9,
      earnings: 2185,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQF58t0nuWMZGihWSI8DfS42Sb6TSKGokaBfzn1gqlTgRv-dXLopA666ja6bbpo_y8LMYM10CIEJwuOTlV5UHiUBsc3aLgeSOFV1JjRetNH",
      dateAdded: "2024-01-15",
      lastRented: "2024-03-10"
    },
    {
      id: 2,
      title: "Vintage Floral Summer Dress",
      price: 150,
      status: "rented",
      totalRentals: 8,
      rating: 4.8,
      earnings: 1200,
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
      earnings: 7485,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRhC9YhmpN5kj4H1W4fNyVOD2v_txLRqfsmj4u9tS6554cF4qXu0vjlOC8zURBMCeZfsqxUGauHJ28KD8l7g8i_8KQ4nH_z0m6YnD8WRAUCNDIgdd_V5GtxIjNl4wrP9St9njDH_A&usqp=CAc",
      dateAdded: "2023-12-10",
      lastRented: "2024-03-18"
    },
    {
      id: 4,
      title: "Boho Maxi Dress",
      price: 299,
      status: "available",
      totalRentals: 5,
      rating: 4.7,
      earnings: 1495,
      image: "https://4.imimg.com/data4/HG/GM/MY-271218/indian-bohemian-dresses.png",
      dateAdded: "2024-02-20",
      lastRented: "2024-03-05"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'rented': return 'bg-yellow-500';
      case 'unavailable': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredItems = mockItems.filter(item => filter === 'all' || item.status === filter );
  const totalEarnings = mockItems.reduce((sum, item) => sum + item.earnings, 0);
  const totalItems = mockItems.length;
  const availableItems = mockItems.filter(item => item.status === 'available').length;
  const avgRating = (mockItems.reduce((sum, item) => sum + item.rating, 0) / totalItems).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">My Closet</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')} >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')} >
                <List className="w-4 h-4" />
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Add Item
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white shadow rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
              </div>
              <Upload className="w-6 h-6 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-2xl font-bold text-gray-800">{availableItems}</p>
              </div>
              <Calendar className="w-6 h-6 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-800">₹{totalEarnings}</p>
              </div>
              <DollarSign className="w-6 h-6 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-800">{avgRating}</p>
              </div>
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')} >All Items</Button>
            <Button variant={filter === 'available' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('available')} >Available</Button>
            <Button variant={filter === 'rented' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('rented')} >Currently Rented</Button>
            <Button variant={filter === 'unavailable' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('unavailable')} >Unavailable</Button>
          </div>
          <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> More Filters</Button>
        </div>

        {/* Items Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <Card key={item.id} className="group bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-64 object-cover"/>
                  <Badge className={`absolute top-3 left-3 px-2 py-1 text-white rounded ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                  <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
                    <Button size="sm" variant="secondary"><Eye className="w-4 h-4"/></Button>
                    <Button size="sm" variant="secondary"><Edit3 className="w-4 h-4"/></Button>
                    <Button size="sm" variant="destructive"><Trash2 className="w-4 h-4"/></Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>Price: ₹{item.price}/day</div>
                    <div>Earned: ₹{item.earnings}</div>
                    <div>Rentals: {item.totalRentals}</div>
                    <div className="flex items-center"><Star className="w-3 h-3 text-yellow-500 mr-1"/> {item.rating}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center"><Edit3 className="w-3 h-3 mr-1"/>Edit</Button>
                    <Button size="sm" className="flex-1 flex items-center justify-center"><Eye className="w-3 h-3 mr-1"/>View</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map(item => (
              <Card key={item.id} className="p-4 flex items-center bg-white shadow rounded hover:shadow-lg transition">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded"/>
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">Added: {new Date(item.dateAdded).toLocaleDateString()} | Last Rented: {new Date(item.lastRented).toLocaleDateString()}</div>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <div>Earnings: ₹{item.earnings}</div>
                    <div className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-1"/> {item.rating}</div>
                  </div>
                </div>
                <Badge className={`ml-4 px-2 py-1 text-white rounded ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
                <div className="flex flex-col ml-4 space-y-1">
                  <Button size="sm" variant="outline"><Edit3 className="w-4 h-4"/></Button>
                  <Button size="sm" variant="outline"><Eye className="w-4 h-4"/></Button>
                  <Button size="sm" variant="destructive"><Trash2 className="w-4 h-4"/></Button>
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
