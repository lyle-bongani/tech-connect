'use client';

import styled from '@emotion/styled';
import { ArrowBack as ArrowBackIcon, LocationOn as LocationIcon, AccessTime as TimeIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import Link from 'next/link';

const Container = styled.div`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%);
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const LikeButton = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EventDetails = styled.div`
  padding: 24px;
  background: white;
  border-radius: 20px 20px 0 0;
  margin-top: -20px;
  position: relative;
  z-index: 2;
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FreeTag = styled.span`
  color: #666;
  font-size: 13px;
  display: flex;
  align-items: center;
  
  &:after {
    content: "•";
    margin-left: 4px;
    margin-right: 4px;
  }
`;

const ViewAllLink = styled.a`
  color: #0066FF;
  font-size: 13px;
  text-decoration: none;
`;

const EventTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  
  svg {
    color: #0066FF;
    width: 24px;
    height: 24px;
  }
  
  span {
    font-size: 14px;
    color: #666;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #0066FF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 24px;
`;

const EventPage = () => {
  return (
    <Container>
      <ScrollableContent>
        <ImageContainer>
          <EventImage src="/images/africanvr.jpeg" alt="VR Update Launch" />
          <Overlay />
          <Header>
            <Link href="/events">
              <BackButton>
                <ArrowBackIcon />
              </BackButton>
            </Link>
            <LikeButton>
              <FavoriteIcon sx={{ color: '#FF0000' }} />
            </LikeButton>
          </Header>
        </ImageContainer>

        <EventDetails>
          <EventHeader>
            <FreeTag>Free Entry</FreeTag>
            <ViewAllLink href="#">View All</ViewAllLink>
          </EventHeader>
          <EventTitle>VR Update Launch</EventTitle>
          <InfoItem>
            <LocationIcon />
            <span>Zimbabwe International Trade Fair</span>
          </InfoItem>
          <InfoItem>
            <TimeIcon />
            <span>10:00 - 14:00</span>
          </InfoItem>
          <ConfirmButton>Confirm Attendance</ConfirmButton>
        </EventDetails>
      </ScrollableContent>
    </Container>
  );
};

export default EventPage; 