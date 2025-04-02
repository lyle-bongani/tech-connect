'use client';

import styled from '@emotion/styled';
import { ArrowBack as ArrowBackIcon, NotificationsNone as NotificationsIcon } from '@mui/icons-material';
import Link from 'next/link';
import BottomNavigation from '../../../components/BottomNavigation';

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
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const NotificationIconWrapper = styled.div`
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    color: #007AFF;
  }
`;

const SubTitle = styled.h2`
  font-size: 16px;
  color: #333;
  margin: 0 0 20px 0;
  font-weight: 500;
`;

const MentorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
  padding-bottom: 100px;
`;

const MentorCard = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const MentorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MentorInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
`;

const MentorName = styled.h3`
  font-size: 14px;
  margin: 0 0 4px 0;
  font-weight: 500;
`;

const MentorRole = styled.p`
  font-size: 12px;
  margin: 0;
  opacity: 0.9;
`;

const mentors = [
  {
    id: 1,
    name: 'Rodney Mayo',
    role: 'UX/UI Designer',
    image: '/images/mentor1.jpeg'
  },
  {
    id: 2,
    name: 'Rajesh Moor',
    role: 'UX/UI Designer',
    image: '/images/mentor2.jpeg'
  },
  {
    id: 3,
    name: 'Jane Collins',
    role: 'UX/UI Designer',
    image: '/images/mentor3.jpeg'
  },
  {
    id: 4,
    name: 'David Chikanga',
    role: 'UX/UI Designer',
    image: '/images/mentor4.jpeg'
  },
  {
    id: 5,
    name: 'Sarah Wilson',
    role: 'UX/UI Designer',
    image: '/images/mentor5.jpeg'
  },
  {
    id: 6,
    name: 'Michael Chen',
    role: 'UX/UI Designer',
    image: '/images/mentor6.jpeg'
  }
];

export default function MentorsPage() {
  return (
    <Container>
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
          <HeaderRight>
            <NotificationIconWrapper>
              <NotificationsIcon />
            </NotificationIconWrapper>
            <ProfileImage src="/images/Ellipse 11.png" alt="Profile" />
          </HeaderRight>
        </Header>

        <SubTitle>Mentors Based On Your Profile</SubTitle>

        <MentorsGrid>
          {mentors.map((mentor) => (
            <Link href={`/community/mentorship/mentors/${mentor.id}`} key={mentor.id}>
              <MentorCard>
                <MentorImage src={mentor.image} alt={mentor.name} />
                <MentorInfo>
                  <MentorName>{mentor.name}</MentorName>
                  <MentorRole>{mentor.role}</MentorRole>
                </MentorInfo>
              </MentorCard>
            </Link>
          ))}
        </MentorsGrid>
      </Content>
      <BottomNavigation />
    </Container>
  );
} 