import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Clock, Shield, Users } from "lucide-react";

const VestingStats = () => {
  const stats = [
    {
      title: "Total Allocation",
      value: "400,000",
      unit: "TOKENS",
      icon: Coins,
      trend: "+0%",
      description: "Encrypted allocation"
    },
    {
      title: "Vested Amount",
      value: "200,000",
      unit: "TOKENS",
      icon: Clock,
      trend: "+50%",
      description: "Currently available"
    },
    {
      title: "Team Members",
      value: "12",
      unit: "ACTIVE",
      icon: Users,
      trend: "+2",
      description: "With wallet access"
    },
    {
      title: "Security Level",
      value: "256-bit",
      unit: "AES",
      icon: Shield,
      trend: "100%",
      description: "End-to-end encrypted"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-vesting-card border-border/50 hover:border-primary/30 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <span className="text-xs text-success font-medium">{stat.trend}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VestingStats;