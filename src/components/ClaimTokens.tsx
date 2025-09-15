import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Coins, Clock, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useVeilVest } from "@/hooks/useVeilVest";
import { useAccount } from "wagmi";

const ClaimTokens = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const { toast } = useToast();
  const { address } = useAccount();
  const { claimTokens, isPending, isConfirming, isConfirmed, error } = useVeilVest();

  const availableToClaim = 100000;
  const nextVestingDate = "2024-07-15";
  const nextVestingAmount = 100000;

  const handleClaim = async () => {
    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to claim tokens.",
        variant: "destructive",
      });
      return;
    }

    setIsClaiming(true);
    
    try {
      // In a real implementation, you would:
      // 1. Get the user's vesting ID
      // 2. Calculate the claimable amount using FHE
      // 3. Generate the input proof
      // 4. Call the contract
      
      const vestingId = BigInt(1); // This would come from user's vestings
      const amount = "100000"; // This would be calculated using FHE
      const inputProof = "0x" as `0x${string}`; // This would be generated using FHE
      
      await claimTokens(vestingId, amount, inputProof);
      
      toast({
        title: "Transaction Submitted",
        description: "Your claim transaction has been submitted to the blockchain.",
      });
    } catch (err) {
      console.error("Claim error:", err);
      toast({
        title: "Claim Failed",
        description: "Failed to claim tokens. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <Card className="bg-vesting-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-primary" />
            <span>Token Claiming</span>
          </div>
          <Badge variant="outline" className="bg-success/10 border-success/30 text-success">
            Available
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Available to Claim */}
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-success">Ready to Claim</h3>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">{availableToClaim.toLocaleString()}</span>
              <span className="text-muted-foreground">TOKENS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Unlocked from previous vesting events
            </p>
          </div>
          
          <Button 
            onClick={handleClaim}
            disabled={isClaiming || isPending || isConfirming}
            className="w-full mt-4 bg-success hover:bg-success/90 text-white"
          >
            {isClaiming || isPending || isConfirming ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                {isPending ? "Confirming..." : isConfirming ? "Processing..." : "Submitting..."}
              </>
            ) : isConfirmed ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Claimed Successfully
              </>
            ) : (
              <>
                Claim {availableToClaim.toLocaleString()} Tokens
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Next Vesting Event */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-primary">Next Vesting Event</h3>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{new Date(nextVestingDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">{nextVestingAmount.toLocaleString()} TOKENS</span>
            </div>
            
            {/* Countdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time Remaining</span>
                <span className="font-medium">45 days, 12 hours</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </div>
        </div>

        {/* Gas Estimation */}
        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-warning">Gas Estimation</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated gas fee</span>
            <span className="font-medium">~$12.50</span>
          </div>
        </div>

        {/* Recent Claims History */}
        <div>
          <h4 className="font-medium mb-3">Recent Claims</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>100,000 TOKENS</span>
              </div>
              <span className="text-muted-foreground">Apr 15, 2024</span>
            </div>
            <div className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>100,000 TOKENS</span>
              </div>
              <span className="text-muted-foreground">Jan 15, 2024</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimTokens;