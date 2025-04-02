'use client';

import styled from '@emotion/styled';
import { ArrowBack as ArrowBackIcon, LocationOn as LocationIcon, Notifications as NotificationIcon, KeyboardArrowDown as ArrowDownIcon, Search as SearchIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';

const Container = styled.div`
  background: white;
  min-height: 100vh;
  padding: 16px;
  padding-bottom: 80px; // Space for bottom navigation
`;

const HeaderFixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 10;
  padding: 16px;
`;

const MainContent = styled.div`
  margin-top: 140px; // Space for fixed header
`;

const TopHeader = styled.div`
  margin-bottom: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
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
  font-size: 24px;
  font-weight: 600;
  color: #007AFF;
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  gap: 12px;
`;

const SearchIconWrapper = styled.div`
  color: #666;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
  &::placeholder {
    color: #666;
  }
`;

const DropdownIcon = styled.div`
  color: #666;
  display: flex;
  align-items: center;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const FilterChip = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: ${props => props.active ? 'none' : '1px solid #007AFF'};
  background: ${props => props.active ? '#007AFF' : 'white'};
  color: ${props => props.active ? 'white' : '#007AFF'};
  font-size: 14px;
  cursor: pointer;
`;

const JobList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const JobCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const JobImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
`;

const JobInfo = styled.div`
  flex: 1;
`;

const JobTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const JobType = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const JobLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
`;

const DetailsButton = styled.button`
  background: none;
  border: 1px solid #007AFF;
  color: #007AFF;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
`;

const NavigationFixed = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: white;
`;

export default function JobBoardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Container>
      <HeaderFixed>
        <TopHeader>
          <Link href="/community">
            <BackButton>
              <ArrowBackIcon />
            </BackButton>
          </Link>
        </TopHeader>
        
        <Header>
          <Title>Job Board</Title>
          <HeaderRight>
            <ProfileImage src="/images/Ellipse 13.png" alt="Profile" />
            <NotificationButton>
              <NotificationIcon />
            </NotificationButton>
          </HeaderRight>
        </Header>

        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon sx={{ fontSize: 20 }} />
          </SearchIconWrapper>
          <SearchInput placeholder="Search Industry..." />
          <DropdownIcon>
            <ArrowDownIcon />
          </DropdownIcon>
        </SearchContainer>
      </HeaderFixed>

      <MainContent>
        <FilterContainer>
          <FilterChip active>Full Time</FilterChip>
          <FilterChip>Remote</FilterChip>
          <FilterChip>Internship</FilterChip>
        </FilterContainer>

        <JobList>
          {[1, 2, 3].map((index) => (
            <JobCard key={index}>
              <JobImage src="/images/cat.png" alt="CAT" />
              <JobInfo>
                <JobTitle>Software Developer</JobTitle>
                <JobType>Full Time</JobType>
                <JobLocation>
                  <LocationIcon sx={{ fontSize: 16 }} />
                  Remote Job
                </JobLocation>
                <DetailsButton>Details</DetailsButton>
              </JobInfo>
            </JobCard>
          ))}
        </JobList>
      </MainContent>

      <NavigationFixed>
        <BottomNavigation />
      </NavigationFixed>
    </Container>
  );
} 