"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "rc-consent";

type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Consent Mode v2. The tag loads with analytics_storage denied, so no analytics
 * cookies are written until the visitor accepts. The same gate covers AdSense later via
 * ad_storage / ad_personalization.
 */
export default function Analytics({ measurementId }: { measurementId?: string }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setConsent(stored === "granted" || stored === "denied" ? stored : null);
    setReady(true);
  }, []);

  const decide = (value: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    window.gtag?.("consent", "update", {
      analytics_storage: value,
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
    });
  };

  if (!measurementId) return null;

  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>

      {ready && consent === null && (
        <div className="consent-banner" role="dialog" aria-label="Cookie consent">
          <p>
            We use cookies for analytics to understand which pages are useful. You can accept or decline. See our{" "}
            <a href="/cookie-policy">cookie policy</a>.
          </p>
          <div className="consent-actions">
            <button className="button" type="button" onClick={() => decide("granted")}>
              Accept
            </button>
            <button className="button secondary" type="button" onClick={() => decide("denied")}>
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
