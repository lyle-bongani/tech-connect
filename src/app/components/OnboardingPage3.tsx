'use client';

import styled from '@emotion/styled';
import Image from 'next/image';

const Container = styled.div`
  width: 100%;
  height: 100vh;
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
  padding: 32px 32px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: auto;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #000000;
  margin-bottom: 24px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Description = styled.p`
  font-size: 15px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  margin: 0 auto;
  max-width: 320px;
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
  margin-bottom: 24px;
  justify-content: center;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#0288D1' : '#E8E8E8'};
`;

const GetStartedButton = styled.button`
  background-color: #0288D1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  width: 85%;
  max-width: 400px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 32px;

  &:active {
    transform: scale(0.98);
  }
`;

const BottomBar = styled.div`
  width: 134px;
  height: 5px;
  background-color: #000000;
  border-radius: 100px;
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
`;

interface OnboardingPageProps {
  onDotClick: (index: number) => void;
  activeDot: number;
  onGetStarted: () => void;
}

const OnboardingPage3 = ({ onDotClick, activeDot, onGetStarted }: OnboardingPageProps) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src="/images/Rectangle 3.png"
          alt="Mentorship session"
          fill
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          priority
          sizes="100vw"
        />
      </ImageContainer>
      <ContentContainer>
        <TextContainer>
          <Title>
            Mentorship. Growth.
            <span>Connection.</span>
          </Title>
          <Description>
            Tech Connect empowers growth through mentorship, connecting 
            tech professionals with experienced mentors to foster development 
            and collaboration in a thriving community.
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

export default OnboardingPage3; 