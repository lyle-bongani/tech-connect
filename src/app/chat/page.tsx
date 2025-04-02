'use client';

import styled from '@emotion/styled';
import { 
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  NotificationsNone as NotificationIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  People as CommunityIcon,
  Person as ProfileIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';

const Container = styled.div`
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

const Header = styled.div`
  padding: 12px 16px;
`;

const HeaderTop = styled.div`
  margin-bottom: 16px;
`;

const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  svg {
    font-size: 28px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #007AFF;
  display: flex;
  align-items: center;
  svg {
    font-size: 28px;
  }
`;

const StoriesContainer = styled.div`
  padding: 0 16px 16px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoriesWrapper = styled.div`
  display: inline-flex;
  gap: 8px;
`;

const Story = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

const OnlineIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4CD964;
  position: absolute;
  right: 4px;
  top: 4px;
`;

const SearchContainer = styled.div`
  padding: 0 16px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 12px 16px;
  border-radius: 24px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  font-size: 16px;
  color: #333;
  width: 100%;
  outline: none;
  &::placeholder {
    color: #999;
  }
`;

const FilterContainer = styled.div`
  padding: 16px;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 12px;
`;

const FilterTab = styled.button<{ active?: boolean }>`
  border: ${props => props.active ? 'none' : '1px solid #E5E5E5'};
  background: ${props => props.active ? '#007AFF' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#0066DB' : '#F5F5F5'};
  }
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 60px;
`;

const ChatItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
  align-items: center;
  position: relative;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: #F5F5F5;
  }
`;

const ChatImageContainer = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`;

const ChatImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
`;

const ChatOnlineIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4CD964;
  position: absolute;
  right: -2px;
  top: -2px;
  border: 2px solid white;
`;

const ChatInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChatName = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #333;
`;

const ChatStatus = styled.div`
  font-size: 13px;
  color: #999;
`;

export default function ChatPage() {
  const [mounted, setMounted] = useState(false);
  const mentorImages = [
    '/images/mentor1.jpeg',
    '/images/mentor2.jpeg',
    '/images/mentor3.jpeg',
    '/images/mentor4.jpeg'
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <Link href="/community">
            <BackButton>
              <ArrowBackIcon />
            </BackButton>
          </Link>
        </HeaderTop>
        <HeaderBottom>
          <Title>Messaging</Title>
          <HeaderRight>
            <NotificationButton>
              <NotificationIcon />
            </NotificationButton>
            <ProfileImage src="/images/Ellipse 13.png" alt="Profile" />
          </HeaderRight>
        </HeaderBottom>
      </Header>

      <StoriesContainer>
        <StoriesWrapper>
          {mentorImages.map((image, index) => (
            <Story key={index}>
              <StoryImage src={image} alt={`Mentor ${index + 1}`} />
              <OnlineIndicator />
            </Story>
          ))}
        </StoriesWrapper>
      </StoriesContainer>

      <SearchContainer>
        <SearchBar>
          <SearchIcon sx={{ color: '#999', fontSize: 24 }} />
          <SearchInput placeholder="Search for chat..." />
        </SearchBar>
      </SearchContainer>

      <FilterContainer>
        <FilterTabs>
          <FilterTab active>All Chats</FilterTab>
          <FilterTab>Unread</FilterTab>
          <FilterTab>Groups</FilterTab>
        </FilterTabs>
      </FilterContainer>

      <ChatList>
        <Link href="/chat/tech-project-team" style={{ textDecoration: 'none' }}>
          <ChatItem>
            <ChatImageContainer>
              <ChatImage src="/images/cat.png" alt="Tech Project Team" />
              <ChatOnlineIndicator />
            </ChatImageContainer>
            <ChatInfo>
              <ChatName>Tech Project Team</ChatName>
              <ChatStatus>Daniel is typing...</ChatStatus>
            </ChatInfo>
          </ChatItem>
        </Link>
        <ChatItem>
          <ChatImageContainer>
            <ChatImage src="/images/mentor1.jpeg" alt="Rodney Moyo" />
            <ChatOnlineIndicator />
          </ChatImageContainer>
          <ChatInfo>
            <ChatName>Rodney Moyo</ChatName>
            <ChatStatus>Rodney is typing...</ChatStatus>
          </ChatInfo>
        </ChatItem>
        <ChatItem>
          <ChatImageContainer>
            <ChatImage src="/images/mentor3.jpeg" alt="Rodney Moyo" />
            <ChatOnlineIndicator />
          </ChatImageContainer>
          <ChatInfo>
            <ChatName>Rodney Moyo</ChatName>
            <ChatStatus>Rodney is typing...</ChatStatus>
          </ChatInfo>
        </ChatItem>
        <ChatItem>
          <ChatImageContainer>
            <ChatImage src="/images/mentor4.jpeg" alt="Rodney Moyo" />
            <ChatOnlineIndicator />
          </ChatImageContainer>
          <ChatInfo>
            <ChatName>Rodney Moyo</ChatName>
            <ChatStatus>Rodney is typing...</ChatStatus>
          </ChatInfo>
        </ChatItem>
      </ChatList>

      <BottomNavigation />
    </Container>
  );
} 