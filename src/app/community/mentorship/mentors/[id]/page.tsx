'use client';

import styled from '@emotion/styled';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import BottomNavigation from '../../../../components/BottomNavigation';

const Container = styled.div`
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: -60px;
`;

const CardContent = styled.div`
  background: white;
  border-radius: 24px 24px 0 0;
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

const ProfileInfo = styled.div`
  text-align: center;
  margin-bottom: 0;
`;

const Name = styled.h1`
  font-size: 20px;
  color: #333;
  margin: 0 0 4px 0;
  font-weight: 500;
`;

const Role = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const DescriptionSection = styled.div`
`;

const DescriptionTitle = styled.h2`
  font-size: 16px;
  color: #333;
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

const ReadMore = styled.span`
  color: #007AFF;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const RequestButton = styled.button`
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
`;

const ExploreButton = styled.button`
  background: white;
  color: #007AFF;
  border: 1px solid #EEEEEE;
  border-radius: 25px;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
`;

const mentors = [
  {
    id: 1,
    name: 'Rodney Mayo',
    role: 'UX/UI Designer',
    image: '/images/mentor1.jpeg',
    description: 'Rodney Moyo, a leading User Experience Designer in crafting highly beautiful and clean animated websites, applications, ...'
  },
  {
    id: 2,
    name: 'Rajesh Moor',
    role: 'UX/UI Designer',
    image: '/images/mentor2.jpeg',
    description: 'Rajesh Moor, an experienced UX/UI Designer specializing in creating intuitive and engaging user interfaces for mobile and web applications.'
  },
  {
    id: 3,
    name: 'Jane Collins',
    role: 'UX/UI Designer',
    image: '/images/mentor3.jpeg',
    description: 'Jane Collins, a passionate UX/UI Designer focused on creating accessible and user-friendly digital experiences that make a difference.'
  },
  {
    id: 4,
    name: 'David Smith',
    role: 'UX/UI Designer',
    image: '/images/mentor4.jpeg',
    description: 'David Smith, a creative UX/UI Designer with expertise in designing innovative solutions for complex user problems.'
  },
  {
    id: 5,
    name: 'Sarah Wilson',
    role: 'UX/UI Designer',
    image: '/images/mentor5.jpeg',
    description: 'Sarah Wilson, a detail-oriented UX/UI Designer dedicated to crafting seamless and delightful user experiences.'
  },
  {
    id: 6,
    name: 'Michael Chen',
    role: 'UX/UI Designer',
    image: '/images/mentor6.jpeg',
    description: 'Michael Chen, a forward-thinking UX/UI Designer specializing in creating modern and engaging digital interfaces.'
  }
];

export default function MentorProfilePage() {
  const params = useParams();
  const mentorId = parseInt(params.id as string);
  const mentor = mentors.find(m => m.id === mentorId);

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  return (
    <Container>
      <Content>
        <Header>
          <Link href="/community/mentorship/mentors">
            <BackButton>
              <ArrowBackIcon />
            </BackButton>
          </Link>
        </Header>

        <ProfileImage src={mentor.image} alt={mentor.name} />
        
        <CardContent>
          <ProfileInfo>
            <Name>{mentor.name}</Name>
            <Role>{mentor.role}</Role>
          </ProfileInfo>

          <DescriptionSection>
            <DescriptionTitle>Description</DescriptionTitle>
            <Description>
              {mentor.description}<ReadMore>Read More</ReadMore>
            </Description>
          </DescriptionSection>

          <ButtonsContainer>
            <RequestButton>Request Mentorship</RequestButton>
            <ExploreButton>Explore More</ExploreButton>
          </ButtonsContainer>
        </CardContent>
      </Content>
      <BottomNavigation />
    </Container>
  );
} 