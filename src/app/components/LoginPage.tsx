'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/firebase';
import { 
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  LightbulbOutlined as LightbulbIcon
} from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  position: relative;
`;

const DarkModeToggle = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  height: 24px;
  background: #E0E0E0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 2px;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  
  h1 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #000000;
  }
`;

const LightBulbWrapper = styled.div`
  color: #FFD700;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background-color: #F5F5F5;
  color: #000000;
  
  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    background-color: #EEEEEE;
  }
`;

const PasswordInput = styled.div`
  position: relative;
  width: 100%;
`;

const VisibilityButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background-color: #0077CC;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 20px 0;
  color: #666;
  font-size: 14px;
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 4px;
`;

const SocialButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #666;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 28px;
    height: 28px;
  }
`;

const SignUpText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;

  a {
    color: #0077CC;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  color: #ff3b30;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
`;

interface LoginPageProps {
  onComplete?: () => void;
  onSwitchToSignUp?: () => void;
}

const LoginPage = ({ onComplete, onSwitchToSignUp }: LoginPageProps) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.push('/home');
      if (onComplete) onComplete();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <DarkModeToggle />
      
      <Logo>
        <h1>Tech Connect</h1>
        <LightBulbWrapper>
          <LightbulbIcon style={{ fontSize: 32 }} />
        </LightBulbWrapper>
      </Logo>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter Full Name..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <PasswordInput>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <VisibilityButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </VisibilityButton>
        </PasswordInput>

        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
        </LoginButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Divider>Or Log In With</Divider>

        <SocialButtons>
          <SocialButton type="button">
            <svg viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </SocialButton>
          <SocialButton type="button">
            <svg viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </SocialButton>
          <SocialButton type="button">
            <svg viewBox="0 0 24 24" fill="#000000">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.54-1.07-.36-2.05-.35-3.15 0-1.35.44-2.06.31-2.92-.54C3.24 15.77 4.53 8.12 9.44 7.72c1.16.06 2.02.45 2.78.45.73 0 2.109-.46 3.12-.38 5.31.44 7.37 7.51 2.71 12.49M12.03 7.25c-.79-.95-.67-2.25-.49-2.75.96-.21 2.17.46 2.81 1.25.63.77.87 2.06.71 2.73-1.08.08-2.29-.46-3.03-1.23"/>
            </svg>
          </SocialButton>
        </SocialButtons>

        <SignUpText>
          Don&apos;t have an account? <a onClick={onSwitchToSignUp}>Sign up</a>
        </SignUpText>
      </Form>
    </Container>
  );
};

export default LoginPage; 