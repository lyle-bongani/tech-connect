'use client';

import styled from '@emotion/styled';
import { 
  ArrowBack as ArrowBackIcon, 
  NotificationsNone as NotificationIcon, 
  ChevronRight as ChevronRightIcon,
  NotificationsNone as BellIcon,
  Analytics as AnalyticsIcon,
  Groups as CollaborationIcon,
  People as ConnectionsIcon,
  Logout as LogoutIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logOut, getCurrentUserData, UserData } from '@/lib/firebase';
import { useState, useEffect } from 'react';

const Container = styled.div`
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
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

const NotificationButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #007AFF;
  display: flex;
  align-items: center;
`;

const ProfileSection = styled.div`
  padding: 24px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 32px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const Role = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContactText = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 16px;
  margin-bottom: 16px;
`;

const StatCard = styled.div`
  flex: 1;
  background: #007AFF;
  padding: 12px;
  border-radius: 12px;
  color: white;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const StatLabel = styled.div`
  font-size: 13px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  
  &:last-child {
    svg:first-of-type {
      color: #FF3B30;
    }
  }

  svg:last-child {
    color: #999;
  }
`;

const MenuItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #333;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const MenuItemText = styled.span`
  font-size: 16px;
`;

export default function AccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUserData();
        if (!data) {
          router.push('/'); // Redirect to login if no user data
          return;
        }
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/'); // Redirect to login on error
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logOut();
      router.push('/'); // Redirect to home/login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>; // You might want to create a proper loading component
  }

  return (
    <Container>
      <Header>
        <Link href="/community">
          <BackButton>
            <ArrowBackIcon />
          </BackButton>
        </Link>
        <NotificationButton>
          <NotificationIcon />
        </NotificationButton>
      </Header>

      <ProfileSection>
        <ProfileTop>
          <ProfileImage src={userData.profileImage || "/images/Ellipse 13.png"} alt={userData.fullName} />
          <ProfileInfo>
            <Name>{userData.fullName}</Name>
            <Role>{userData.role || 'New Member'}</Role>
          </ProfileInfo>
        </ProfileTop>
        <ContactInfo>
          {userData.phoneNumber && (
            <ContactItem>
              <PhoneIcon sx={{ fontSize: 20, color: '#333', fontWeight: 500 }} />
              <ContactText>{userData.phoneNumber}</ContactText>
            </ContactItem>
          )}
          <ContactItem>
            <EmailIcon sx={{ fontSize: 20, color: '#333', fontWeight: 500 }} />
            <ContactText>{userData.email}</ContactText>
          </ContactItem>
        </ContactInfo>
      </ProfileSection>

      <StatsContainer>
        <StatCard>
          <StatNumber>{userData.connections || 0}</StatNumber>
          <StatLabel>Connections</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{userData.groupProjects || 0}</StatNumber>
          <StatLabel>Group Projects</StatLabel>
        </StatCard>
      </StatsContainer>

      <MenuList>
        <MenuItem>
          <MenuItemLeft>
            <BellIcon />
            <MenuItemText>Your Notifications</MenuItemText>
          </MenuItemLeft>
          <ChevronRightIcon />
        </MenuItem>
        <MenuItem>
          <MenuItemLeft>
            <AnalyticsIcon />
            <MenuItemText>Analytics</MenuItemText>
          </MenuItemLeft>
          <ChevronRightIcon />
        </MenuItem>
        <MenuItem>
          <MenuItemLeft>
            <CollaborationIcon />
            <MenuItemText>Project Collaborations</MenuItemText>
          </MenuItemLeft>
          <ChevronRightIcon />
        </MenuItem>
        <MenuItem>
          <MenuItemLeft>
            <ConnectionsIcon />
            <MenuItemText>Your connections</MenuItemText>
          </MenuItemLeft>
          <ChevronRightIcon />
        </MenuItem>
        <MenuItem 
          onClick={handleLogout}
          style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          <MenuItemLeft>
            <LogoutIcon />
            <MenuItemText>{isLoading ? 'Logging out...' : 'Log Out'}</MenuItemText>
          </MenuItemLeft>
          <ChevronRightIcon />
        </MenuItem>
      </MenuList>
    </Container>
  );
} 