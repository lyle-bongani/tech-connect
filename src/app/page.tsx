'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports to prevent SSR issues
const SplashScreen = dynamic(() => import('./components/SplashScreen'), { ssr: false });
const OnboardingPage = dynamic(() => import('./components/OnboardingPage'), { ssr: false });
const OnboardingPage3 = dynamic(() => import('./components/OnboardingPage3'), { ssr: false });
const LoginPage = dynamic(() => import('./components/LoginPage'), { ssr: false });
const SignUpPage = dynamic(() => import('./components/SignUpPage'), { ssr: false });
const InterestsPage = dynamic(() => import('./components/InterestsPage'), { ssr: false });
const HomePage = dynamic(() => import('./components/HomePage'), { ssr: false });

export default function Home() {
  // Define the flow stages
  const FLOW_STAGES = {
    SPLASH: 'splash',
    ONBOARDING: 'onboarding',
    ONBOARDING3: 'onboarding3',
    LOGIN: 'login',
    SIGNUP: 'signup',
    INTERESTS: 'interests',
    HOME: 'home'
  };

  const [currentStage, setCurrentStage] = useState(FLOW_STAGES.SPLASH);

  // Auto-advance from splash screen after delay
  useEffect(() => {
    if (currentStage === FLOW_STAGES.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentStage(FLOW_STAGES.ONBOARDING);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  // Custom handlers for each page
  const handleOnboardingComplete = () => {
    setCurrentStage(FLOW_STAGES.ONBOARDING3);
  };

  const handleOnboarding3Complete = () => {
    setCurrentStage(FLOW_STAGES.LOGIN);
  };

  const handleLoginComplete = () => {
    setCurrentStage(FLOW_STAGES.SIGNUP);
  };

  const handleSignUpComplete = () => {
    setCurrentStage(FLOW_STAGES.INTERESTS);
  };

  const handleInterestsComplete = () => {
    setCurrentStage(FLOW_STAGES.HOME);
  };

  // Remove HomePage auto-splash - only run on client
  useEffect(() => {
    // Make sure we're in the browser environment before using localStorage
    if (typeof window !== 'undefined') {
      // Disable SplashScreen in HomePage
      localStorage.setItem('skipSplash', 'true');
      
      return () => {
        localStorage.removeItem('skipSplash');
      };
    }
  }, []);

  // Render the appropriate component based on the current stage
  switch (currentStage) {
    case FLOW_STAGES.SPLASH:
      return <SplashScreen />;
    case FLOW_STAGES.ONBOARDING:
      return <OnboardingPage 
        onDotClick={() => {}} 
        activeDot={0} 
        onGetStarted={handleOnboardingComplete} />;
    case FLOW_STAGES.ONBOARDING3:
      return <OnboardingPage3 
        onDotClick={() => {}} 
        activeDot={1} 
        onGetStarted={handleOnboarding3Complete} />;
    case FLOW_STAGES.LOGIN:
      return <LoginPage onComplete={handleLoginComplete} />;
    case FLOW_STAGES.SIGNUP:
      return <SignUpPage onComplete={handleSignUpComplete} />;
    case FLOW_STAGES.INTERESTS:
      return <InterestsPage onComplete={handleInterestsComplete} />;
    case FLOW_STAGES.HOME:
    default:
      return <HomePage />;
  }
}
