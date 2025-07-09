import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Camera, CameraOff, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface QRScannerProps {
  onScan?: (result: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const hasPermission = await QrScanner.hasCamera();
        setHasCamera(hasPermission);
      } catch (err) {
        setHasCamera(false);
        setError('Camera access not available');
      }
    };

    checkCamera();
  }, []);

  const startScanning = async () => {
    if (!videoRef.current || !hasCamera) return;

    try {
      setError(null);
      setIsScanning(true);
      
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScanResult(result.data);
          onScan?.(result.data);
          
          toast({
            title: "QR Code Scanned!",
            description: "Successfully scanned QR code",
          });

          // Auto-stop after successful scan
          stopScanning();
        },
        {
          highlightScanRegion: false,
          highlightCodeOutline: false,
          preferredCamera: 'environment',
        }
      );

      qrScannerRef.current = qrScanner;
      await qrScanner.start();
    } catch (err) {
      setError('Failed to start camera. Please check permissions.');
      setIsScanning(false);
      
      toast({
        title: "Camera Error",
        description: "Please allow camera access to scan QR codes",
        variant: "destructive",
      });
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  if (hasCamera === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">
          Checking camera availability...
        </div>
      </div>
    );
  }

  if (hasCamera === false) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-semibold mb-2">Camera Not Available</h2>
            <p className="text-muted-foreground mb-4">
              Camera access is required to scan QR codes. Please check your permissions and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          QR Code Scanner
        </h1>
        <p className="text-muted-foreground">
          Position the QR code within the frame to scan
        </p>
      </div>

      {/* Scanner Interface */}
      <div className="relative w-full max-w-sm">
        {isScanning ? (
          <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="scanner-frame w-48 h-48 relative">
                <div className="scan-line absolute top-0 left-0 right-0 h-0.5 opacity-80"></div>
                
                {/* Corner frames */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-sm bg-black/50 rounded px-3 py-2">
                Align QR code within the frame
              </p>
            </div>
          </div>
        ) : (
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center space-y-4">
              <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">
                Camera preview will appear here
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {!isScanning ? (
          <Button onClick={startScanning} size="lg" className="px-8">
            <Camera className="w-5 h-5 mr-2" />
            Start Scanning
          </Button>
        ) : (
          <Button onClick={stopScanning} variant="outline" size="lg" className="px-8">
            <CameraOff className="w-5 h-5 mr-2" />
            Stop Scanning
          </Button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <Card className="w-full max-w-md animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan Result */}
      {scanResult && (
        <Card className="w-full max-w-md animate-fade-in">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-success">
                <CheckCircle className="w-5 h-5" />
                <h3 className="font-semibold">Scan Successful!</h3>
              </div>
              <div className="p-3 bg-muted rounded border">
                <p className="text-sm font-mono break-all">{scanResult}</p>
              </div>
              <Button 
                onClick={() => setScanResult(null)} 
                variant="outline" 
                className="w-full"
              >
                Scan Another
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}