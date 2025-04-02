import { useState } from 'react';
import styled from '@emotion/styled';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlineIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import InterestsPage from './InterestsPage';

const Container = styled.div<{ isDark: boolean }>`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${props => props.isDark ? '#1a1a1a' : 'white'};
  display: flex;
  flex-direction: column;
  padding: clamp(16px, 5vw, 24px);
  position: relative;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    justify-content: center;
  }
`;

const ThemeToggle = styled.div`
  position: absolute;
  top: clamp(16px, 5vw, 24px);
  left: clamp(16px, 5vw, 24px);
  width: clamp(48px, 8vw, 56px);
  height: clamp(28px, 5vw, 32px);
  background-color: #E0E0E0;
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  z-index: 10;
`;

const ToggleButton = styled.div<{ isActive: boolean }>`
  width: clamp(20px, 4vw, 24px);
  height: clamp(20px, 4vw, 24px);
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(${props => props.isActive ? 'calc(100% - 4px)' : '0'});
  transition: transform 0.3s ease;
  color: #666;
`;

const Header = styled.div`
  margin-top: clamp(24px, 8vh, 32px);
  text-align: center;
  margin-bottom: clamp(32px, 8vh, 40px);
`;

const Title = styled.h1<{ isDark: boolean }>`
  font-size: clamp(24px, 6vw, 32px);
  color: ${props => props.isDark ? 'white' : 'black'};
  margin-bottom: clamp(8px, 2vh, 12px);
  font-weight: 600;
`;

const IconWrapper = styled.div`
  color: #FFD700;
  svg {
    font-size: clamp(36px, 8vw, 48px);
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 4vh, 20px);
  margin-bottom: clamp(16px, 4vh, 20px);
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: clamp(48px, 8vh, 52px);
  background-color: #F5F5F5;
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 0 clamp(16px, 4vw, 20px);
  gap: 12px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: clamp(14px, 3vw, 15px);
  color: #333;
  &::placeholder {
    color: #666;
  }
  &:focus {
    outline: none;
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  height: clamp(48px, 8vh, 52px);
  background-color: #0288D1;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 500;
  cursor: pointer;
  margin-bottom: clamp(32px, 8vh, 40px);
`;

const OrText = styled.div`
  text-align: center;
  color: #666;
  font-size: clamp(12px, 2.5vw, 14px);
  margin-bottom: clamp(12px, 3vh, 16px);
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(24px, 6vw, 32px);
  margin-bottom: auto;
  padding: clamp(16px, 4vh, 24px) 0;
`;

const SocialButton = styled.button`
  width: clamp(36px, 8vw, 40px);
  height: clamp(36px, 8vw, 40px);
  border-radius: 50%;
  border: none;
  background: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
`;

const LoginText = styled.div<{ isDark: boolean }>`
  text-align: center;
  color: ${props => props.isDark ? '#fff' : '#333'};
  font-size: clamp(12px, 2.5vw, 14px);
  margin-bottom: clamp(24px, 6vh, 32px);
  a {
    color: #0288D1;
    text-decoration: none;
    margin-left: 4px;
    font-weight: 500;
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

const SignUpPage = ({ onComplete }: { onComplete?: () => void }) => {
  const [isDark, setIsDark] = useState(false);
  const [showInterests, setShowInterests] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (showInterests) {
    return <InterestsPage onComplete={onComplete} />;
  }

  return (
    <Container isDark={isDark}>
      <ThemeToggle onClick={toggleTheme}>
        <ToggleButton isActive={isDark}>
          {isDark ? 
            <DarkModeIcon style={{ fontSize: 'clamp(14px, 3vw, 16px)' }} /> : 
            <LightModeIcon style={{ fontSize: 'clamp(14px, 3vw, 16px)' }} />
          }
        </ToggleButton>
      </ThemeToggle>
      
      <Header>
        <Title isDark={isDark}>Tech Connect</Title>
        <IconWrapper>
          <LightbulbIcon />
        </IconWrapper>
      </Header>

      <InputContainer>
        <InputWrapper>
          <PersonOutlineIcon style={{ color: '#666', fontSize: 'clamp(18px, 4vw, 20px)' }} />
          <Input placeholder="Enter Full Name..." />
        </InputWrapper>
        <InputWrapper>
          <EmailOutlineIcon style={{ color: '#666', fontSize: 'clamp(18px, 4vw, 20px)' }} />
          <Input placeholder="Enter Email..." />
        </InputWrapper>
        <InputWrapper>
          <LockOutlinedIcon style={{ color: '#666', fontSize: 'clamp(18px, 4vw, 20px)' }} />
          <Input type="password" placeholder="Enter Password..." />
        </InputWrapper>
      </InputContainer>

      <SignUpButton onClick={() => onComplete ? onComplete() : setShowInterests(true)}>Sign Up</SignUpButton>

      <OrText>Or Sign Up With</OrText>

      <SocialContainer>
        <SocialButton>
          <FacebookIcon style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#1877F2' }} />
        </SocialButton>
        <SocialButton>
          <GoogleIcon style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#DB4437' }} />
        </SocialButton>
        <SocialButton>
          <AppleIcon style={{ fontSize: 'clamp(20px, 5vw, 24px)', color: '#000000' }} />
        </SocialButton>
      </SocialContainer>

      <LoginText isDark={isDark}>
        Already have an account?
        <a href="#">Log in</a>
      </LoginText>

      <BottomBar />
    </Container>
  );
};

export default SignUpPage; 