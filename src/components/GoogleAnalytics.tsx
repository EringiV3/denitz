import Script from 'next/script';
import { GOOGLE_ANALYTICS_ID } from '../config/constants';
import { existsGaId } from '../lib/gtag';

const GoogleAnalytics: React.FC = () => (
  <>
    {existsGaId && (
      <>
        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga" defer strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </>
    )}
  </>
);

export default GoogleAnalytics;
