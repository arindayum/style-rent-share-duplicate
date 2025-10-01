import { useState } from "react";
import { Calendar, Clock, MessageCircle, CreditCard, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format, addDays, differenceInDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface RentalFlowProps {
  item: {
    id: string;
    title: string;
    price: number;
    image: string;
    owner: string;
  };
  onClose: () => void;
  onSubmit: (request: RentalRequest) => void;
}

interface RentalRequest {
  startDate: Date;
  endDate: Date;
  totalDays: number;
  totalPrice: number;
  notes: string;
}

export function RentalFlow({ item, onClose, onSubmit }: RentalFlowProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const totalPrice = totalDays * item.price;

  const handleDateSelect = (date: Date | undefined, type: 'start' | 'end') => {
    if (!date) return;

    if (type === 'start') {
      setStartDate(date);
      // Auto-set end date to next day if not set
      if (!endDate || date >= endDate) {
        setEndDate(addDays(date, 1));
      }
    } else {
      // Ensure end date is after start date
      if (startDate && date > startDate) {
        setEndDate(date);
      }
    }
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      toast({
        title: "Dates required",
        description: "Please select both start and end dates.",
        variant: "destructive"
      });
      return;
    }

    if (totalDays < 1) {
      toast({
        title: "Invalid dates",
        description: "End date must be after start date.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      onSubmit({
        startDate,
        endDate,
        totalDays,
        totalPrice,
        notes
      });

      toast({
        title: "Rental request sent!",
        description: "The owner will be notified and can accept or decline your request.",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-border/20 bg-card/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Rent This Item</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Item Summary */}
          <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground">by {item.owner}</p>
              <p className="text-lg font-bold text-primary">₹{item.price}/day</p>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => handleDateSelect(date, 'start')}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Date *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => handleDateSelect(date, 'end')}
                    disabled={(date) => isDateDisabled(date) || (startDate ? date <= startDate : false)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Rental Summary */}
          {totalDays > 0 && (
            <div className="p-4 bg-primary/5 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Rental Period:</span>
                <span className="font-medium">{totalDays} day{totalDays !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between">
                <span>Daily Rate:</span>
                <span>₹{item.price}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-primary">₹{totalPrice}</span>
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Special Instructions (Optional)
            </label>
            <Textarea
              placeholder="Any special fitting needs, pickup preferences, or questions for the owner..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] bg-background/50 border-border/20"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
              disabled={!startDate || !endDate || totalDays < 1 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Send Rental Request
                </>
              )}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            By submitting this request, you agree to our rental terms and conditions.
            The owner will be notified and can accept or decline your request.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}