'use client';

import styled from '@emotion/styled';
import { ArrowBack as ArrowBackIcon, NotificationsNone as NotificationsIcon, KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material';
import Link from 'next/link';
import BottomNavigation from '../../components/BottomNavigation';

const Container = styled.div`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px 16px 0;
  display: flex;
  flex-direction: column;
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

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NotificationIconWrapper = styled.div`
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    color: #007AFF;
  }
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  padding-top: 25px;
  justify-content: center;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px 20px;
  border: 1px solid #EEEEEE;
  border-radius: 30px;
  background: white;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  min-width: 100px;

  svg {
    width: 20px;
    height: 20px;
    color: #666;
  }
`;

const MainContent = styled.div`
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0 0 16px 0;
`;

const MentorsImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 45vh;
  object-fit: contain;
  margin-bottom: 16px;
  border-radius: 16px;
`;

const ContinueButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #0066FF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
`;

const MentorshipPage = () => {
  return (
    <Container>
      <Content>
        <Header>
          <HeaderLeft>
            <Link href="/community">
              <BackButton>
                <ArrowBackIcon />
              </BackButton>
            </Link>
            <Title>Tech Connect</Title>
          </HeaderLeft>
          <HeaderRight>
            <NotificationIconWrapper>
              <NotificationsIcon />
            </NotificationIconWrapper>
            <ProfileImage src="/images/Ellipse 11.png" alt="Profile" />
          </HeaderRight>
        </Header>

        <FilterSection>
          <FilterButton>
            Industry <ArrowDownIcon />
          </FilterButton>
          <FilterButton>
            Age <ArrowDownIcon />
          </FilterButton>
          <FilterButton>
            Country <ArrowDownIcon />
          </FilterButton>
        </FilterSection>

        <MainContent>
          <MainTitle>Find A Mentor</MainTitle>
          <Subtitle>Let the perfect mentor to you to help kickstart your journey</Subtitle>
          <MentorsImage src="/images/big.png" alt="Mentors" />
          <Link href="/community/mentorship/loading">
            <ContinueButton>Continue</ContinueButton>
          </Link>
        </MainContent>
      </Content>
      <BottomNavigation />
    </Container>
  );
};

export default MentorshipPage; 