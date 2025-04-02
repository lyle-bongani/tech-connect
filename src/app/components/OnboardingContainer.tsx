'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingPage1 from './OnboardingPage';
import OnboardingPage3 from './OnboardingPage3';
import AuthPage from './AuthPage';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  overflow: hidden;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    justify-content: center;
  }
`;

const PageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const OnboardingContainer = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [showAuth, setShowAuth] = useState(false);

  const paginate = (newDirection: number) => {
    if ((page === 0 && newDirection === -1) || (page === 1 && newDirection === 1)) return;
    setPage([page + newDirection, newDirection]);
  };

  const handleDotClick = (index: number) => {
    if (index === page) return;
    paginate(index > page ? 1 : -1);
  };

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  if (showAuth) {
    return <AuthPage />;
  }

  return (
    <Container>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {page === 0 ? (
          <PageWrapper
            key="page1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <OnboardingPage1 onDotClick={handleDotClick} activeDot={0} onGetStarted={handleGetStarted} />
          </PageWrapper>
        ) : (
          <PageWrapper
            key="page3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <OnboardingPage3 onDotClick={handleDotClick} activeDot={1} onGetStarted={handleGetStarted} />
          </PageWrapper>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default OnboardingContainer; 