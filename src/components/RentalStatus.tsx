import { Clock, Check, X, Package, Star, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";

interface Rental {
  id: string;
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
  };
  counterparty: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'pending' | 'accepted' | 'active' | 'completed' | 'declined';
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  type: 'renter' | 'lender'; // user's role in this rental
  notes?: string;
  createdAt: Date;
}

interface RentalStatusProps {
  rental: Rental;
  onAccept?: () => void;
  onDecline?: () => void;
  onMessage: () => void;
  onReview?: () => void;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-amber-100 text-amber-800",
    label: "Pending"
  },
  accepted: {
    icon: Check,
    color: "bg-green-100 text-green-800",
    label: "Accepted"
  },
  active: {
    icon: Package,
    color: "bg-blue-100 text-blue-800",
    label: "Active"
  },
  completed: {
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    label: "Completed"
  },
  declined: {
    icon: X,
    color: "bg-red-100 text-red-800",
    label: "Declined"
  }
};

export function RentalStatus({ rental, onAccept, onDecline, onMessage, onReview }: RentalStatusProps) {
  const StatusIcon = statusConfig[rental.status].icon;
  
  const getStatusText = () => {
    switch (rental.status) {
      case 'pending':
        return rental.type === 'lender' 
          ? `${rental.counterparty.name} wants to rent your item`
          : `Waiting for ${rental.counterparty.name} to respond`;
      case 'accepted':
        return rental.type === 'lender'
          ? `You accepted ${rental.counterparty.name}'s rental request`
          : `${rental.counterparty.name} accepted your rental request`;
      case 'active':
        return `Currently rented ${rental.type === 'lender' ? 'to' : 'from'} ${rental.counterparty.name}`;
      case 'completed':
        return `Rental completed with ${rental.counterparty.name}`;
      case 'declined':
        return rental.type === 'lender'
          ? `You declined ${rental.counterparty.name}'s request`
          : `${rental.counterparty.name} declined your request`;
      default:
        return '';
    }
  };

  const showActionButtons = rental.status === 'pending' && rental.type === 'lender';
  const showReviewButton = rental.status === 'completed';

  return (
    <Card className="border-border/20 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge className={statusConfig[rental.status].color}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {statusConfig[rental.status].label}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {format(rental.createdAt, 'MMM d, yyyy')}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <img
            src={rental.item.image}
            alt={rental.item.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{rental.item.title}</h3>
            <p className="text-sm text-muted-foreground">
              {format(rental.startDate, 'MMM d')} - {format(rental.endDate, 'MMM d, yyyy')}
            </p>
            <p className="text-lg font-bold text-primary">${rental.totalPrice} total</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={rental.counterparty.avatar} alt={rental.counterparty.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
              {rental.counterparty.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-foreground">{rental.counterparty.name}</p>
            <p className="text-sm text-muted-foreground">{getStatusText()}</p>
          </div>
        </div>

        {rental.notes && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Special instructions:</p>
            <p className="text-sm text-foreground">{rental.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          {showActionButtons && onAccept && onDecline && (
            <>
              <Button
                onClick={onAccept}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                size="sm"
              >
                <Check className="mr-2 h-4 w-4" />
                Accept
              </Button>
              <Button
                onClick={onDecline}
                variant="outline"
                className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                size="sm"
              >
                <X className="mr-2 h-4 w-4" />
                Decline
              </Button>
            </>
          )}
          
          <Button
            onClick={onMessage}
            variant="outline"
            size="sm"
            className={showActionButtons ? "px-4" : "flex-1"}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Message
          </Button>

          {showReviewButton && onReview && (
            <Button
              onClick={onReview}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Star className="mr-2 h-4 w-4" />
              Leave Review
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}