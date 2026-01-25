"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@/lib/UserContext';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import SanctuaryView from '@/components/dashboard/SanctuaryView';

export default function Home() {
  const { user, isOnboarded } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return <SanctuaryView />;
}
