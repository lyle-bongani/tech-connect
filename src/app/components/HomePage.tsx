'use client';

import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  NotificationsNone as NotificationsIcon,
  MoreHoriz as MoreHorizIcon,
  FavoriteBorder as HeartIcon,
  ChatBubbleOutline as CommentIcon,
  IosShare as ShareIcon
} from '@mui/icons-material';

import BottomNavigation from './BottomNavigation';

const SplashScreen = dynamic(() => import('./SplashScreen'), {
  ssr: false
});

const MobileContainer = styled.div`
  background: white;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (min-width: 769px) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    
    &::after {
      content: 'Please view on a mobile device';
      font-size: 1.5rem;
      color: #666;
    }

    > * {
      display: none;
    }
  }
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 80px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

const HeaderTitle = styled.h1`
  font-size: 22px;
  margin: 0;
  color: #007AFF;
  font-weight: 600;
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NotificationIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
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

const RecentUpdates = styled.div`
  padding: 0 16px 8px;
`;

const UpdatesTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: #333;
`;

const StoriesContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Story = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const StoryImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #007AFF;
`;

const StoryName = styled.span`
  font-size: 10px;
  color: #666;
  max-width: 48px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MentorMatch = styled.div`
  margin: 4px 16px 12px;
  background: #0066CC;
  border-radius: 16px;
  padding: 12px;
  color: white;
`;

const MatchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const MatchTitle = styled.h3`
  font-size: 14px;
  margin: 0;
  color: white;
`;

const CloseIcon = styled.span`
  cursor: pointer;
  font-size: 18px;
  color: white;
`;

const MatchContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MatchTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MatchText = styled.p`
  font-size: 14px;
  margin: 0;
  color: white;
  font-weight: 600;
  line-height: 1.2;
`;

const MatchSubText = styled.p`
  font-size: 12px;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`;

const MatchProfileGroup = styled.div`
  display: flex;
  margin: 8px 0;
  
  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: -12px;
    border: 2px solid white;
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

const MatchButton = styled.button`
  background: white;
  color: #0066CC;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  span {
    font-size: 18px;
    margin-left: 2px;
  }
`;

const Post = styled.div`
  margin: 0 16px 16px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px 6px;
`;

const PostUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const UserMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const UserRole = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 1px;
`;

const TimeStamp = styled.time`
  font-size: 12px;
  color: #888;
`;

const MoreHorizWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    color: #666;
  }
`;

const PostContent = styled.p`
  margin: 0;
  padding: 6px 12px 12px;
  font-size: 13px;
  line-height: 1.3;
  color: #333;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 24px;
  border-top: 1px solid #eee;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  
  svg {
    width: 22px;
    height: 22px;
    color: #666;
  }
`;

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Client-side only code
    if (typeof window !== 'undefined') {
      // Check if we should skip the splash screen (coming from onboarding flow)
      const skipSplash = localStorage.getItem('skipSplash') === 'true';
      
      if (skipSplash) {
        setShowSplash(false);
        return;
      }
    }
    
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const stories = [
    { id: 1, name: 'Add To Story', image: '/images/Ellipse 11.png' },
    { id: 2, name: 'Rodney Marvin', image: '/images/Ellipse 12.png' },
    { id: 3, name: 'Natasha Don', image: '/images/Ellipse 13.png' },
    { id: 4, name: 'Henry Nathan', image: '/images/Ellipse 14.png' },
    { id: 5, name: 'Holly McQueen', image: '/images/Ellipse 15.png' },
    { id: 6, name: 'Robert Fox', image: '/images/Ellipse 16.png' }
  ];

  return (
    <MobileContainer>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <Header>
            <HeaderTitle>Tech Connect</HeaderTitle>
            <HeaderIcons>
              <NotificationIconWrapper>
                <NotificationsIcon />
              </NotificationIconWrapper>
              <div style={{ position: 'relative', width: '32px', height: '32px' }}>
                <Image 
                  src="/images/Ellipse 11.png" 
                  alt="Profile"
                  width={32}
                  height={32}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
            </HeaderIcons>
          </Header>

          <ScrollableContent>
            <RecentUpdates>
              <UpdatesTitle>Recent Updates</UpdatesTitle>
              <StoriesContainer>
                {stories.map((story) => (
                  <Story key={story.id}>
                    <div style={{ position: 'relative', width: '48px', height: '48px' }}>
                      <Image 
                        src={story.image} 
                        alt={story.name}
                        width={48}
                        height={48}
                        style={{ 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          border: '1.5px solid #007AFF'
                        }}
                      />
                    </div>
                    <StoryName>{story.name}</StoryName>
                  </Story>
                ))}
              </StoriesContainer>
            </RecentUpdates>

            <MentorMatch>
              <MatchHeader>
                <MatchTitle>Tech Connect App</MatchTitle>
                <CloseIcon>✕</CloseIcon>
              </MatchHeader>
              <MatchContent>
                <div>
                  <MatchTextGroup>
                    <MatchText>Connect With A Mentor Today!</MatchText>
                    <MatchSubText>Over 500+ Mentors</MatchSubText>
                  </MatchTextGroup>
                  <MatchProfileGroup>
                    <div style={{ position: 'relative', width: '28px', height: '28px', marginRight: '-12px' }}>
                      <Image 
                        src="/images/Ellipse 12.png" 
                        alt="Mentor 1"
                        width={28}
                        height={28}
                        style={{ 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          border: '2px solid white'
                        }}
                      />
                    </div>
                    <div style={{ position: 'relative', width: '28px', height: '28px', marginRight: '-12px' }}>
                      <Image 
                        src="/images/Ellipse 13.png" 
                        alt="Mentor 2"
                        width={28}
                        height={28}
                        style={{ 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          border: '2px solid white'
                        }}
                      />
                    </div>
                    <div style={{ position: 'relative', width: '28px', height: '28px' }}>
                      <Image 
                        src="/images/Ellipse 14.png" 
                        alt="Mentor 3"
                        width={28}
                        height={28}
                        style={{ 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          border: '2px solid white'
                        }}
                      />
                    </div>
                  </MatchProfileGroup>
                </div>
                <MatchButton>
                  Connect
                  <span>›</span>
                </MatchButton>
              </MatchContent>
            </MentorMatch>

            <Post>
              <PostHeader>
                <PostUser>
                  <ProfileImage src="/images/Ellipse 11.png" alt="HenryDev" />
                  <UserInfo>
                    <UserMeta>
                      <UserName>HenryDev</UserName>
                      <TimeStamp>30 min ago</TimeStamp>
                    </UserMeta>
                    <UserRole>Web Developer</UserRole>
                  </UserInfo>
                </PostUser>
                <MoreHorizWrapper>
                  <MoreHorizIcon />
                </MoreHorizWrapper>
              </PostHeader>
              <PostContent>
                Had an exciting day presenting my new VR program at the Bulawayo International Fair.
              </PostContent>
              <PostImage src="/images/pexels-henri-mathieu-8348740 1.png" alt="VR Demo" />
              <PostActions>
                <Action>
                  <HeartIcon />
                  1.4k
                </Action>
                <Action>
                  <CommentIcon />
                  29
                </Action>
                <Action>
                  <ShareIcon />
                  4
                </Action>
              </PostActions>
            </Post>
          </ScrollableContent>

          <BottomNavigation />
        </>
      )}
    </MobileContainer>
  );
};

export default HomePage; 