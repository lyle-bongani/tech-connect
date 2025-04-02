'use client';

import styled from '@emotion/styled';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BottomNavigation from '../../../components/BottomNavigation';

const Container = styled.div`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const BlueBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 55vh;
  background-color: #0077B51A;
  z-index: 0;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px 16px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 18px;
  color: #0066FF;
  margin: 0;
  font-weight: 500;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardsImage = styled.img`
  width: 340px;
  height: auto;
  object-fit: contain;
  margin-top: 32px;
`;

const LoadingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  margin-bottom: 120px;
`;

const LoadingSpinner = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 20px;
  color: #333;
  margin: 0;
  font-weight: 500;
`;

const LoadingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/community/mentorship/mentors');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container>
      <BlueBackground />
      <Content>
        <Header>
          <HeaderLeft>
            <Link href="/community/mentorship">
              <BackButton>
                <ArrowBackIcon />
              </BackButton>
            </Link>
            <Title>Tech Connect</Title>
          </HeaderLeft>
        </Header>

        <MainContent>
          <CardsImage src="/images/group 105.png" alt="Mentor Cards" />
          <LoadingSection>
            <LoadingSpinner src="/images/loading-spinner.png" alt="Loading" />
            <LoadingText>Finding A Mentor</LoadingText>
          </LoadingSection>
        </MainContent>
      </Content>
      <BottomNavigation />
    </Container>
  );
};

export default LoadingPage;