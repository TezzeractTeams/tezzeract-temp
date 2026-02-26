"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CookieConsentData {
  accepted: boolean;
  timestamp: number;
  version: string;
}

interface CookieConsentContextValue {
  consent: CookieConsentData | null;
  hasConsent: () => boolean;
  acceptCookies: () => void;
  rejectCookies: () => void;
  isBannerVisible: boolean;
  setBannerVisible: (visible: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

const STORAGE_KEY = "cookie-consent";
const CONSENT_VERSION = "1.0";

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentData | null>(null);
  const [isBannerVisible, setBannerVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load consent from localStorage on mount (SSR-safe)
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: CookieConsentData = JSON.parse(stored);
          setConsent(parsed);
          // Only show banner if consent hasn't been given or is outdated
          setBannerVisible(!parsed.accepted || parsed.version !== CONSENT_VERSION);
        } else {
          // No consent stored, show banner
          setBannerVisible(true);
        }
      } catch (error) {
        console.error("Error reading cookie consent:", error);
        setBannerVisible(true);
      }
    }
  }, []);

  const hasConsent = (): boolean => {
    if (!isMounted || !consent) return false;
    return consent.accepted && consent.version === CONSENT_VERSION;
  };

  const acceptCookies = () => {
    const consentData: CookieConsentData = {
      accepted: true,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    setConsent(consentData);
    setBannerVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    }
  };

  const rejectCookies = () => {
    const consentData: CookieConsentData = {
      accepted: false,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    setConsent(consentData);
    setBannerVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    }
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsent,
        acceptCookies,
        rejectCookies,
        isBannerVisible,
        setBannerVisible,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}
