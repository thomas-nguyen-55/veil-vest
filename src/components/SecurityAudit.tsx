import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Activity, AlertTriangle, CheckCircle, FileText, Download } from "lucide-react";

const SecurityAudit = () => {
  const auditLogs = [
    {
      id: "1",
      action: "Token Claim",
      user: "Alex Chen (0x742d...8F3A)",
      amount: "100,000 TOKENS",
      timestamp: "2024-04-15 14:30:22",
      status: "success",
      txHash: "0x8f3a2c...d9e5b1"
    },
    {
      id: "2", 
      action: "Wallet Connected",
      user: "Sarah Kim (0x9B4A...2C7D)",
      amount: "-",
      timestamp: "2024-04-14 09:15:45",
      status: "success",
      txHash: "-"
    },
    {
      id: "3",
      action: "Access Denied",
      user: "Unknown (0x1234...5678)",
      amount: "-",
      timestamp: "2024-04-13 22:45:12",
      status: "failed",
      txHash: "-"
    },
    {
      id: "4",
      action: "Schedule Updated",
      user: "System Admin",
      amount: "-",
      timestamp: "2024-04-12 16:20:33",
      status: "success",
      txHash: "-"
    }
  ];

  const securityMetrics = [
    { label: "Encryption Status", value: "AES-256", status: "success" },
    { label: "Access Attempts", value: "1,247", status: "success" },
    { label: "Failed Logins", value: "12", status: "warning" },
    { label: "Last Security Scan", value: "2 hours ago", status: "success" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4 text-success" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "failed": return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-success/10 text-success border-success/30";
      case "warning": return "bg-warning/10 text-warning border-warning/30";
      case "failed": return "bg-destructive/10 text-destructive border-destructive/30";
      default: return "bg-muted/10 text-muted-foreground border-muted/30";
    }
  };

  return (
    <Card className="bg-vesting-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Security Audit</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {securityMetrics.map((metric, index) => (
            <div key={index} className="p-3 bg-encrypted-bg/30 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">{metric.label}</span>
                {getStatusIcon(metric.status)}
              </div>
              <div className="font-semibold">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Real-time Security Status */}
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-success">System Status</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-success">All Systems Operational</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Smart Contract</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                Secure
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                Stable
              </Badge>
            </div>
          </div>
        </div>

        {/* Audit Trail */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Recent Activity</h4>
            <Button variant="ghost" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 border border-border/30 rounded-lg hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(log.status)}
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-muted-foreground">{log.user}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium">{log.amount}</div>
                  <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                  {log.txHash !== "-" && (
                    <div className="text-xs text-primary font-mono">{log.txHash}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Information */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-primary">Compliance & Certifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">SOC 2 Type II</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                Certified
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ISO 27001</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                Compliant
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GDPR</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                Compliant
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Security Audit</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                Q1 2024
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityAudit;