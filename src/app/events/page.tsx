'use client';

import styled from '@emotion/styled';
import { NotificationsNone as NotificationsIcon, Search as SearchIcon, ArrowBack as ArrowBackIcon, VerifiedUser as VerifiedIcon, AccessTime as TimeIcon } from '@mui/icons-material';
import Link from 'next/link';
import BottomNavigation from '../components/BottomNavigation';

const Container = styled.div`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 80px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
  font-size: 22px;
  color: #0066FF;
  margin: 0;
  font-weight: 500;
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

const SearchBar = styled.div`
  background: #F8F8F8;
  border-radius: 24px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  border: 1px solid #EEEEEE;

  svg {
    color: #999;
    width: 18px;
    height: 18px;
  }

  input {
    border: none;
    background: none;
    flex: 1;
    font-size: 14px;
    color: #333;
    outline: none;
    &::placeholder {
      color: #999;
    }
  }
`;

const CategorySection = styled.div`
  margin-bottom: 20px;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 24px;
`;

const CategoryTitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ViewAll = styled.a`
  font-size: 13px;
  color: #0066FF;
  text-decoration: none;
`;

const ChipsContainer = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Chip = styled.div<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  white-space: nowrap;
  cursor: pointer;
  background: ${props => props.active ? '#0066FF' : '#F8F8F8'};
  color: ${props => props.active ? 'white' : '#333'};
`;

const EventsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 200px);
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EventCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const EventImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const EventInfo = styled.div`
  padding: 12px;
`;

const EventTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const EventMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #666;
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    
    svg {
      width: 14px;
      height: 14px;
      color: #0066FF;
    }
    
    span {
      font-size: 11px;
    }
  }
`;

const BackToHomeButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 24px;
`;

const EventsPage = () => {
  const categories = [
    { id: 1, name: 'All', active: true },
    { id: 2, name: 'UI/UX Design', active: false },
    { id: 3, name: 'Software', active: false },
    { id: 4, name: 'Digital Marketing', active: false },
  ];

  const events = [
    {
      id: 1,
      title: 'VR Update Launch',
      image: '/images/africanvr.jpeg',
      verified: true,
      date: '20 April 2024/ 2pm-5pm'
    },
    {
      id: 2,
      title: 'Design Mindset 101',
      image: '/images/poster.jpeg',
      verified: true,
      date: '22 April 2024/ 2pm-5pm'
    }
  ];

  return (
    <Container>
      <ScrollableContent>
        <Header>
          <HeaderLeft>
            <Link href="/">
              <BackButton>
                <ArrowBackIcon />
              </BackButton>
            </Link>
            <Title>Events</Title>
          </HeaderLeft>
          <HeaderIcons>
            <NotificationIconWrapper>
              <NotificationsIcon />
            </NotificationIconWrapper>
            <ProfileImage src="/images/Ellipse 11.png" alt="Profile" />
          </HeaderIcons>
        </Header>

        <SearchBar>
          <SearchIcon />
          <input placeholder="Discover Latest Events..." />
        </SearchBar>

        <CategorySection>
          <CategoryHeader>
            <CategoryTitle>Category Events</CategoryTitle>
          </CategoryHeader>
          <ChipsContainer>
            {categories.map((category) => (
              <Chip key={category.id} active={category.active}>
                {category.name}
              </Chip>
            ))}
          </ChipsContainer>
        </CategorySection>

        <CategoryHeader>
          <CategoryTitle>UI/UX Design</CategoryTitle>
          <ViewAll href="#">View All</ViewAll>
        </CategoryHeader>

        <EventsList>
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id} style={{ textDecoration: 'none' }}>
              <EventCard>
                <EventImage src={event.image} alt={event.title} />
                <EventInfo>
                  <EventTitle>{event.title}</EventTitle>
                  <EventMeta>
                    <div className="meta-item">
                      <VerifiedIcon />
                      <span>Premium</span>
                    </div>
                    <div className="meta-item">
                      <TimeIcon />
                      <span>{event.date}</span>
                    </div>
                  </EventMeta>
                </EventInfo>
              </EventCard>
            </Link>
          ))}
        </EventsList>

        <Link href="/">
          <BackToHomeButton>Back To Home Screen</BackToHomeButton>
        </Link>
      </ScrollableContent>

      <BottomNavigation />
    </Container>
  );
};

export default EventsPage; 