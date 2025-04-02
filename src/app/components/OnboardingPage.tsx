'use client';

import styled from '@emotion/styled';
import Image from 'next/image';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 45%;
  position: relative;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 55%;
  padding: clamp(24px, 6vw, 32px) clamp(24px, 6vw, 32px) clamp(16px, 4vw, 24px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: auto;
`;

const Title = styled.h1`
  font-size: clamp(24px, 6vw, 28px);
  color: #000000;
  margin-bottom: clamp(16px, 4vh, 24px);
  font-weight: 500;
`;

const Description = styled.p`
  font-size: clamp(14px, 3vw, 15px);
  color: #000000;
  line-height: 1.6;
  text-align: center;
  margin: 0 auto;
  max-width: clamp(280px, 80vw, 300px);
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: auto;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: clamp(16px, 4vh, 24px);
  justify-content: center;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: clamp(6px, 1.5vw, 8px);
  height: clamp(6px, 1.5vw, 8px);
  border-radius: 50%;
  background-color: ${props => props.active ? '#0288D1' : '#E8E8E8'};
`;

const GetStartedButton = styled.button`
  background-color: #0288D1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: clamp(14px, 3vh, 16px);
  width: 85%;
  max-width: 400px;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 500;
  cursor: pointer;
  margin-bottom: clamp(24px, 6vh, 32px);
  height: clamp(48px, 8vh, 52px);

  &:active {
    transform: scale(0.98);
  }
`;

const BottomBar = styled.div`
  width: clamp(100px, 25vw, 134px);
  height: 5px;
  background-color: #000000;
  border-radius: 100px;
  position: absolute;
  bottom: clamp(12px, 3vh, 16px);
  left: 50%;
  transform: translateX(-50%);
`;

interface OnboardingPageProps {
  onDotClick: (index: number) => void;
  activeDot: number;
  onGetStarted: () => void;
}

const OnboardingPage = ({ onDotClick, activeDot, onGetStarted }: OnboardingPageProps) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src="/images/Rectangle 2.png"
          alt="Tech professionals collaborating"
          fill
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center 30%'
          }}
          priority
          sizes="100vw"
        />
      </ImageContainer>
      <ContentContainer>
        <TextContainer>
          <Title>Tech Connect App</Title>
          <Description>
            A place where industry experts and emerging talent come together to connect, 
            share knowledge, and find the guidance needed to thrive in the ever-evolving 
            world of technology.
          </Description>
        </TextContainer>
        <BottomSection>
          <DotsContainer>
            <Dot active={activeDot === 0} onClick={() => onDotClick(0)} style={{ cursor: 'pointer' }} />
            <Dot active={activeDot === 1} onClick={() => onDotClick(1)} style={{ cursor: 'pointer' }} />
          </DotsContainer>
          <GetStartedButton onClick={onGetStarted}>Get Started</GetStartedButton>
        </BottomSection>
      </ContentContainer>
      <BottomBar />
    </Container>
  );
};

export default OnboardingPage; 