declare module 'react-qr-scanner' {
  import { ComponentType } from 'react';

  interface QrReaderProps {
    delay?: number | false;
    onScan?: (data: string | null) => void;
    onError?: (error: any) => void;
    style?: React.CSSProperties;
    className?: string;
  }

  const QrReader: ComponentType<QrReaderProps>;

  export default QrReader;
}
