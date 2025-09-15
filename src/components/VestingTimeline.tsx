import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Coins, TrendingUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VestingEvent {
  date: string;
  amount: string;
  status: "completed" | "pending" | "upcoming";
  percentage: number;
}

const VestingTimeline = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const vestingEvents: VestingEvent[] = [
    { date: "2024-01-15", amount: "100,000", status: "completed", percentage: 25 },
    { date: "2024-04-15", amount: "100,000", status: "completed", percentage: 25 },
    { date: "2024-07-15", amount: "100,000", status: "pending", percentage: 25 },
    { date: "2024-10-15", amount: "100,000", status: "upcoming", percentage: 25 },
  ];

  const totalProgress = vestingEvents
    .filter(event => event.status === "completed")
    .reduce((sum, event) => sum + event.percentage, 0);

  return (
    <div className="space-y-6">
      <Card className="bg-vesting-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Vesting Progress</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRevealed(!isRevealed)}
              className="text-muted-foreground hover:text-primary"
            >
              {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isRevealed ? "Hide" : "Reveal"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Progress</span>
              <span className="font-medium">{totalProgress}% Vested</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-vesting-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Vesting Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vestingEvents.map((event, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  event.status === "completed"
                    ? "bg-success/10 border-success/30"
                    : event.status === "pending"
                    ? "bg-primary/10 border-primary/30"
                    : "bg-muted/10 border-border/30"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.status === "completed"
                        ? "bg-success"
                        : event.status === "pending"
                        ? "bg-primary animate-pulse"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">{event.percentage}% of total allocation</p>
                  </div>
                </div>
                
                <div className="text-right">
                  {isRevealed ? (
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-primary" />
                      <span className="font-mono font-medium">{event.amount} TOKENS</span>
                    </div>
                  ) : (
                    <div className="encrypted-pattern h-6 w-24 rounded animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VestingTimeline;