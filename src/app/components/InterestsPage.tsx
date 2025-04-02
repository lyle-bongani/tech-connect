import { useState } from 'react';
import styled from '@emotion/styled';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomePage from './HomePage';

const Container = styled.div<{ isDark: boolean }>`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.isDark ? '#1a1a1a' : 'white'};
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
`;

const ThemeToggle = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  width: 56px;
  height: 32px;
  background-color: #E0E0E0;
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  z-index: 10;
`;

const ToggleButton = styled.div<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(${props => props.isActive ? 'calc(100% - 4px)' : '0'});
  transition: transform 0.3s ease;
  color: #666;
`;

const Title = styled.h1<{ isDark: boolean }>`
  font-size: 32px;
  color: ${props => props.isDark ? 'white' : 'black'};
  margin-top: 32px;
  margin-bottom: 8px;
  font-weight: 600;
  text-align: center;
`;

const Subtitle = styled.p<{ isDark: boolean }>`
  font-size: 14px;
  color: ${props => props.isDark ? '#ccc' : '#666'};
  text-align: center;
  margin-bottom: 20px;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
`;

const LocationInput = styled.div`
  width: 100%;
  height: 48px;
  background-color: #FAFAFA;
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const LocationText = styled.div`
  flex: 1;
  font-size: 14px;
  color: #666;
`;

const CategorySection = styled.div`
  margin-bottom: 16px;
`;

const CategoryTitle = styled.h2<{ isDark: boolean }>`
  font-size: 16px;
  color: ${props => props.isDark ? 'white' : 'black'};
  margin-bottom: 8px;
  font-weight: 500;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.button<{ isSelected?: boolean }>`
  padding: 8px 12px;
  border-radius: 100px;
  border: none;
  background-color: ${props => props.isSelected ? '#0288D1' : '#F5F5F5'};
  color: ${props => props.isSelected ? 'white' : '#333'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  white-space: nowrap;

  &:active {
    transform: scale(0.98);
  }
`;

const GetStartedButton = styled.button`
  width: calc(100% - 32px);
  height: 48px;
  background-color: #0288D1;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  position: absolute;
  bottom: 32px;
  left: 16px;

  &:active {
    transform: scale(0.98);
  }
`;

const BottomBar = styled.div`
  width: 134px;
  height: 5px;
  background-color: #000000;
  border-radius: 100px;
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
`;

const InterestsPage = ({ onComplete }: { onComplete?: () => void }) => {
  const [isDark, setIsDark] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showHome, setShowHome] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  if (showHome) {
    return <HomePage />;
  }

  const popularCategories = [
    'Software Dev', 'Data Science', 'Web Developer',
    'Cyber-Security', 'UX/UI Design', 'Systems Admin'
  ];

  const featuredCategories = [
    'Digital Marketing', 'AI Research', 'Game Developer',
    'AI Engineering', 'Graphic Design', 'App Dev',
    'Logo Design', 'Back-end dev'
  ];

  return (
    <Container isDark={isDark}>
      <ThemeToggle onClick={toggleTheme}>
        <ToggleButton isActive={isDark}>
          {isDark ? 
            <DarkModeIcon style={{ fontSize: 'clamp(14px, 3vw, 16px)' }} /> : 
            <LightModeIcon style={{ fontSize: 'clamp(14px, 3vw, 16px)' }} />
          }
        </ToggleButton>
      </ThemeToggle>

      <Title isDark={isDark}>Interests</Title>
      <Subtitle isDark={isDark}>
        Enter your tech passions so you can get the most of our app
      </Subtitle>

      <LocationInput>
        <LocationOnIcon style={{ color: '#666', fontSize: '20px' }} />
        <LocationText>Enter Location...</LocationText>
        <KeyboardArrowDownIcon style={{ color: '#666', fontSize: '20px' }} />
      </LocationInput>

      <CategorySection>
        <CategoryTitle isDark={isDark}>Popular Categories</CategoryTitle>
        <TagsContainer>
          {popularCategories.map((category) => (
            <Tag 
              key={category}
              isSelected={selectedTags.includes(category)}
              onClick={() => toggleTag(category)}
            >
              {category}
              {selectedTags.includes(category) && '✓'}
            </Tag>
          ))}
        </TagsContainer>
      </CategorySection>

      <CategorySection>
        <CategoryTitle isDark={isDark}>Featured Categories</CategoryTitle>
        <TagsContainer>
          {featuredCategories.map((category) => (
            <Tag 
              key={category}
              isSelected={selectedTags.includes(category)}
              onClick={() => toggleTag(category)}
            >
              {category}
              {selectedTags.includes(category) && '✓'}
            </Tag>
          ))}
        </TagsContainer>
      </CategorySection>

      <GetStartedButton onClick={() => onComplete ? onComplete() : setShowHome(true)}>Get Started</GetStartedButton>
      <BottomBar />
    </Container>
  );
};

export default InterestsPage; 