import VestingHeader from "@/components/VestingHeader";
import VestingStats from "@/components/VestingStats";
import VestingTimeline from "@/components/VestingTimeline";
import ClaimTokens from "@/components/ClaimTokens";
import TeamManagement from "@/components/TeamManagement";
import SecurityAudit from "@/components/SecurityAudit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <VestingHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Token Vesting Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete vesting management with military-grade encryption, automated claiming, 
              and comprehensive team administration for secure token distribution.
            </p>
          </div>
          
          <VestingStats />
          
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-card/50">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="claim">Claim Tokens</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <VestingTimeline />
                </div>
                
                <div className="space-y-6">
                  <div className="bg-encrypted-bg/50 border border-primary/20 rounded-lg p-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
                      System Status
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Encryption</span>
                        <span className="text-success">AES-256 Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Multi-sig</span>
                        <span className="text-success">3 of 4 Required</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Network</span>
                        <span className="text-success">Ethereum Mainnet</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gas Price</span>
                        <span className="text-warning">32 Gwei</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <h3 className="font-semibold mb-2 text-primary">Smart Contract</h3>
                    <div className="space-y-2 text-sm">
                      <div className="font-mono text-xs break-all text-muted-foreground">
                        0x742d35Cc8F3A9B2aE5C7D8f9A1B3E4C2D5F6789A
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Version</span>
                        <span>v2.1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verified</span>
                        <span className="text-success">✓ Etherscan</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="claim" className="space-y-6">
              <ClaimTokens />
            </TabsContent>
            
            <TabsContent value="team" className="space-y-6">
              <TeamManagement />
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <SecurityAudit />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;