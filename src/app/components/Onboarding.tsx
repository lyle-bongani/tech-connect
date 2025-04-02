'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const Container = styled.div`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SlideContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
`;

const ImageContainer = styled.div`
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const OnboardingImage = styled.img`
  max-width: 70%;
  height: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #007AFF;
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 48px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 24px;
`;

const PrimaryButton = styled.button`
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 24px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #0066CC;
  }
`;

const SkipButton = styled.button`
  background: transparent;
  color: #666;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 12px;
  position: absolute;
  top: 24px;
  right: 24px;
`;

const Indicators = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 32px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#007AFF' : '#E5E5E5'};
  transition: background 0.3s ease;
`;

const slides = [
  {
    image: '/images/onboarding-1.svg',
    title: 'Welcome to Tech Connect',
    description: 'Your gateway to networking with tech professionals and finding mentorship opportunities.',
  },
  {
    image: '/images/onboarding-2.svg',
    title: 'Find Your Mentor',
    description: 'Connect with industry experts who can guide you through your tech career journey.',
  },
  {
    image: '/images/onboarding-3.svg',
    title: 'Explore Opportunities',
    description: 'Discover job listings, events, and collaboration projects tailored to your interests.',
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const skipOnboarding = () => {
    onComplete();
  };

  return (
    <Container>
      <SkipButton onClick={skipOnboarding}>Skip</SkipButton>
      
      <SlideContainer>
        <ImageContainer>
          <OnboardingImage src={slides[currentSlide].image} alt={slides[currentSlide].title} />
        </ImageContainer>
        
        <Title>{slides[currentSlide].title}</Title>
        <Description>{slides[currentSlide].description}</Description>
        
        <Indicators>
          {slides.map((_, index) => (
            <Dot key={index} active={index === currentSlide} />
          ))}
        </Indicators>
      </SlideContainer>
      
      <ButtonContainer>
        <PrimaryButton onClick={nextSlide}>
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          {currentSlide !== slides.length - 1 && <ArrowForwardIcon />}
        </PrimaryButton>
      </ButtonContainer>
    </Container>
  );
};

export default Onboarding; 