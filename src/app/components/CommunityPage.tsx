'use client';

import styled from '@emotion/styled';
import { NotificationsNone as NotificationsIcon } from '@mui/icons-material';
import Link from 'next/link';
import BottomNavigation from './BottomNavigation';

const Container = styled.div`
  background: white;
  min-height: 100vh;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #007AFF;
  margin: 0;
  font-weight: 600;
`;

const HeaderIcons = styled.div`
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

const Subtitle = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0 0 32px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
`;

const Card = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const BackButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #0066CC;
  }
`;

const CommunityPage = () => {
  const options = [
    {
      title: 'Event Listing',
      image: '/images/event-listing.jpeg',
      link: '/events'
    },
    {
      title: 'Mentorship',
      image: '/images/mentorship.jpeg',
      link: '/community/mentorship'
    },
    {
      title: 'Project Colloboration',
      image: '/images/project-collaboration.jpeg',
      link: '/projects'
    },
    {
      title: 'Job Board',
      image: '/images/job-board.jpeg',
      link: '/jobs'
    }
  ];

  return (
    <Container>
      <Header>
        <Title>Community</Title>
        <HeaderIcons>
          <NotificationIconWrapper>
            <NotificationsIcon />
          </NotificationIconWrapper>
          <ProfileImage src="/images/Ellipse 11.png" alt="Profile" />
        </HeaderIcons>
      </Header>
      
      <Subtitle>Explore The Best Of Our Community</Subtitle>
      
      <Grid>
        {options.map((option) => (
          <Link href={option.link} key={option.title}>
            <Card>
              <CardImage src={option.image} alt={option.title} />
              <CardTitle>{option.title}</CardTitle>
            </Card>
          </Link>
        ))}
      </Grid>

      <Link href="/">
        <BackButton>Back To Home Screen</BackButton>
      </Link>

      <BottomNavigation />
    </Container>
  );
};

export default CommunityPage; 