"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useCookieConsent } from "../context/CookieConsentContext";

export default function ConditionalScripts() {
  const { hasConsent } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && hasConsent() && !scriptsLoaded) {
      setScriptsLoaded(true);
    }
  }, [mounted, hasConsent, scriptsLoaded]);

  // Don't render scripts until mounted and consent is given
  if (!mounted || !hasConsent() || !scriptsLoaded) {
    return null;
  }

  return (
    <>
      {/* Brevo Conversations - Lazy loaded */}
      <Script id="brevo-conversations" strategy="lazyOnload">
        {`
          (function(d, w, c) {
            w.BrevoConversationsID = '689ad382f05ff79b4003a4d6';
            w[c] = w[c] || function() {
              (w[c].q = w[c].q || []).push(arguments);
            };
            var s = d.createElement('script');
            s.async = true;
            s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
            if (d.head) d.head.appendChild(s);
          })(document, window, 'BrevoConversations');
        `}
      </Script>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-RS2XYV0DC2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RS2XYV0DC2');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vjnwd1dn53");
        `}
      </Script>
    </>
  );
}
