"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@/lib/UserContext';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import SanctuaryView from '@/components/dashboard/SanctuaryView';
import IntroSplash from '@/components/layout/IntroSplash';

export default function Home() {
  const { user, isOnboarded } = useUser();
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-manifest-background text-manifest-text">
        <div className="animate-pulse">Yükleniyor...</div>
      </div>
    );
  }

  // If user is returning (onboarded), show Splash with autoEnter, then Dashboard
  // If user is returning (onboarded), Dashboard handles the Splash Overlay internally for concurrent loading
  if (isOnboarded) {
    return <SanctuaryView />;
  }

  // If new user, show Onboarding Flow (which likely has its own splash internally or we just show flow)
  // Actually, standard flow was: Page -> IntroSplash -> Onboarding if !isOnboarded?
  // Previous code was: if (!isOnboarded) return <OnboardingFlow />; else <SanctuaryView />;
  // So returning users NEVER saw the splash in previous code?
  // Wait, let's check OnboardingFlow. It has "STEP 0: INTRO" which looks like a splash but inline.
  // BUT the user specifically asked for "IntroSplash" (Logo + TheManifest) to appear for 0.5s.

  return <OnboardingFlow />;
}
