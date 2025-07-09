import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  onTableSet: (tableNumber: string) => void;
}

const QRCodeGenerator = ({ onTableSet }: QRCodeGeneratorProps) => {
  const [tableNumber, setTableNumber] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Check if URL has table parameter (for QR code scanning)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tableParam = urlParams.get('table');
    if (tableParam) {
      onTableSet(tableParam);
      toast({
        title: "Welcome!",
        description: `You're ordering for Table ${tableParam}`,
      });
    }
  }, [onTableSet, toast]);

  const generateQRCode = async () => {
    if (!tableNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a table number",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const orderUrl = `${window.location.origin}${window.location.pathname}?table=${tableNumber}#restaurant`;
      const qrCode = await QRCode.toDataURL(orderUrl, {
        width: 512,
        margin: 2,
        color: {
          dark: '#2d4a3e', 
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrCode);
      
      toast({
        title: "QR Code Generated",
        description: `QR code for Table ${tableNumber} is ready!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = `table-${tableNumber}-qr-code.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const printQRCode = () => {
    if (!qrCodeUrl) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Table ${tableNumber} QR Code</title>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                text-align: center; 
                font-family: Arial, sans-serif; 
              }
              .qr-container { 
                border: 2px solid #ddd; 
                padding: 20px; 
                border-radius: 10px; 
                display: inline-block; 
              }
              h1 { color: #2d4a3e; margin-bottom: 10px; }
              p { color: #666; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h1>Table ${tableNumber}</h1>
              <img src="${qrCodeUrl}" alt="QR Code for Table ${tableNumber}" />
              <p>Scan to view menu and place order</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Staff: Generate Table QR Codes</CardTitle>
          <CardDescription>
            Create QR codes for tables to enable direct ordering
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="tableNumber">Table Number</Label>
            <Input
              id="tableNumber"
              type="text"
              placeholder="Enter table number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateQRCode()}
            />
          </div>
          
          <Button 
            onClick={generateQRCode} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating..." : "Generate QR Code"}
          </Button>
        </CardContent>
      </Card>

      {qrCodeUrl && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View QR Code</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Table {tableNumber} QR Code</DialogTitle>
              <DialogDescription>
                Customers can scan this code to access the menu and place orders
              </DialogDescription>
            </DialogHeader>
            
            <div className="text-center space-y-4">
              <div className="border rounded-lg p-4 bg-white">
                <img 
                  src={qrCodeUrl} 
                  alt={`QR Code for Table ${tableNumber}`}
                  className="w-full max-w-64 mx-auto"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={downloadQRCode} variant="outline" className="flex-1">
                  Download
                </Button>
                <Button onClick={printQRCode} className="flex-1">
                  Print
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default QRCodeGenerator;