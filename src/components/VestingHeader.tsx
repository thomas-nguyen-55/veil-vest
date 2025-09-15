import { Shield, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WalletConnect } from "./WalletConnect";
import { useAccount } from "wagmi";

const VestingHeader = () => {
  const { isConnected } = useAccount();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg relative">
              <Shield className="w-5 h-5 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Vesting with Confidentiality
              </h1>
              <p className="text-sm text-muted-foreground">Private token release schedules</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>End-to-end encrypted</span>
            </div>

            {isConnected && (
              <Badge variant="outline" className="bg-success/10 border-success/30 text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                Connected
              </Badge>
            )}
            
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default VestingHeader;