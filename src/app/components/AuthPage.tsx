import { useState } from 'react';
import styled from '@emotion/styled';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #0288D1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: clamp(20vh, 25vh, 30vh);
  position: relative;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    justify-content: center;
    padding-top: 0;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: clamp(24px, 6vw, 32px);
  margin-bottom: clamp(12px, 3vh, 16px);
  font-weight: 500;
`;

const IconWrapper = styled.div`
  margin-bottom: clamp(60px, 12vh, 80px);
  color: #FFD700;
  svg {
    font-size: clamp(36px, 8vw, 48px);
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 4vh, 24px);
  padding: 0 clamp(24px, 6vw, 32px);
  max-width: 500px;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: clamp(44px, 7vh, 48px);
  padding: clamp(12px, 2vh, 14px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 100px;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 400;
  cursor: pointer;
  background: transparent;
  color: white;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: clamp(44px, 7vh, 48px);
  padding: clamp(12px, 2vh, 14px);
  border: none;
  border-radius: 100px;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 400;
  cursor: pointer;
  background: white;
  color: #0288D1;
  transition: all 0.2s ease;

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

const AuthPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (showSignUp) {
    return <SignUpPage />;
  }

  if (showLogin) {
    return <LoginPage />;
  }

  return (
    <Container>
      <Title>Tech Connect</Title>
      <IconWrapper>
        <LightbulbIcon />
      </IconWrapper>
      <ButtonsContainer>
        <SignUpButton onClick={() => setShowSignUp(true)}>Sign Up</SignUpButton>
        <LoginButton onClick={() => setShowLogin(true)}>Login</LoginButton>
      </ButtonsContainer>
      <BottomBar />
    </Container>
  );
};

export default AuthPage; 