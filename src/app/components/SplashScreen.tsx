'use client';

import styled from '@emotion/styled';
import { LightbulbOutlined } from '@mui/icons-material';

const SplashContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #0288d1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  max-width: 600px;
  margin: 0 auto;
  right: 0;

  @media (min-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: clamp(32px, 8vw, 40px);
  margin-bottom: clamp(16px, 4vh, 24px);
  font-weight: 500;
`;

const StyledLightbulb = styled(LightbulbOutlined)`
  color: #ffeb3b;
  font-size: clamp(36px, 10vw, 48px);
  animation: float 2s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const SplashScreen = () => {
  return (
    <SplashContainer>
      <Title>Tech Connect</Title>
      <StyledLightbulb />
    </SplashContainer>
  );
};

export default SplashScreen; 