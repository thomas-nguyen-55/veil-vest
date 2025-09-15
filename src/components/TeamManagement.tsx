import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Shield, Key, MoreVertical, UserPlus } from "lucide-react";
import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  address: string;
  role: "admin" | "member" | "viewer";
  allocation: number;
  claimed: number;
  status: "active" | "pending" | "revoked";
}

const TeamManagement = () => {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Alex Chen",
      address: "0x742d...8F3A",
      role: "admin",
      allocation: 150000,
      claimed: 75000,
      status: "active"
    },
    {
      id: "2", 
      name: "Sarah Kim",
      address: "0x9B4A...2C7D",
      role: "member",
      allocation: 100000,
      claimed: 50000,
      status: "active"
    },
    {
      id: "3",
      name: "Mike Johnson", 
      address: "0x1E8F...9A2B",
      role: "member",
      allocation: 80000,
      claimed: 40000,
      status: "pending"
    },
    {
      id: "4",
      name: "Emma Davis",
      address: "0x3C5D...4F6E",
      role: "viewer",
      allocation: 60000,
      claimed: 30000,
      status: "active"
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-primary/10 text-primary border-primary/30";
      case "member": return "bg-success/10 text-success border-success/30";
      case "viewer": return "bg-muted/10 text-muted-foreground border-muted/30";
      default: return "bg-muted/10 text-muted-foreground border-muted/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/30";
      case "pending": return "bg-warning/10 text-warning border-warning/30"; 
      case "revoked": return "bg-destructive/10 text-destructive border-destructive/30";
      default: return "bg-muted/10 text-muted-foreground border-muted/30";
    }
  };

  return (
    <Card className="bg-vesting-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Team Management</span>
          </CardTitle>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Access Control Summary */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-encrypted-bg/30 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">3</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">1</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{member.name}</h4>
                      <Badge variant="outline" className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="font-mono">{member.address}</span>
                      <span>•</span>
                      <span>{member.allocation.toLocaleString()} tokens allocated</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {member.claimed.toLocaleString()} / {member.allocation.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((member.claimed / member.allocation) * 100)}% claimed
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Access Control Settings */}
          <div className="mt-6 p-4 bg-muted/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-4 h-4 text-primary" />
              <h4 className="font-medium">Access Control</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Multi-sig required</span>
                <span className="text-success">3 of 4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time-lock enabled</span>
                <span className="text-success">24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Emergency pause</span>
                <span className="text-success">Available</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Audit logging</span>
                <span className="text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamManagement;