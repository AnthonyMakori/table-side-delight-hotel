import { QRScanner } from '../../src/components/QRScanner';

const Index = () => {
  const handleScan = (result: string) => {
    console.log('QR Code scanned:', result);
  };

  return (
    <div className="min-h-screen bg-background">
      <QRScanner onScan={handleScan} />
    </div>
  );
};

export default Index;