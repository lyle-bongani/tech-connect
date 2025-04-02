'use client';

import styled from '@emotion/styled';
import { ArrowBack as ArrowBackIcon, MoreHoriz as MenuIcon } from '@mui/icons-material';
import { KeyboardVoice as VoiceIcon, CameraAlt as CameraIcon } from '@mui/icons-material';
import Link from 'next/link';

const Container = styled.div`
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #EEEEEE;
`;

const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MainHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  filter: invert(31%) sepia(98%) saturate(3400%) hue-rotate(210deg) brightness(104%) contrast(101%);
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
  color: #333;
  margin: 0;
  font-weight: 500;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
`;

const ChatContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Message = styled.div<{ isAI?: boolean }>`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  ${props => props.isAI && `
    flex-direction: row-reverse;
  `}
  margin-bottom: 8px;
`;

const ProfilePic = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageBubble = styled.div<{ isAI?: boolean }>`
  background: ${props => props.isAI ? '#007AFF' : '#EEEEEE'};
  color: ${props => props.isAI ? 'white' : '#333'};
  padding: 12px 16px;
  border-radius: 20px;
  max-width: 70%;
  font-size: 14px;
`;

const InputContainer = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  position: sticky;
  bottom: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  background: white;
  border-radius: 15px;
  padding: 8px 16px;
  border: 1px solid #007AFF;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  font-size: 14px;
  outline: none;
  background: transparent;
  color: #333;
  &::placeholder {
    color: #333;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
  }
  &:last-child {
    border: 1px solid #007AFF;
    border-radius: 50%;
    padding: 10px;
    svg {
      width: 24px;
      height: 24px;
      stroke-width: 2;
    }
  }
`;

const messages = [
  { id: 1, text: 'Hey', isUser: true },
  { id: 2, text: 'Hey David, How may I help you?', isAI: true },
  { id: 3, text: 'Who designed this application?', isUser: true },
  { id: 4, text: 'Tech Connect is an application that was designed by the UX/UI enthusiast Daniel Madimba', isAI: true },
  { id: 5, text: 'What inspired him?', isUser: true },
  { id: 6, text: '...', isAI: true }
];

export default function AIPage() {
  return (
    <Container>
      <Header>
        <BackButtonContainer>
          <Link href="/community">
            <BackButton>
              <ArrowBackIcon />
            </BackButton>
          </Link>
        </BackButtonContainer>
        <MainHeader>
          <TitleContainer>
            <Logo src="/images/ai.png" alt="Tech Connect" />
            <Title>Tech Connect A.I</Title>
          </TitleContainer>
          <MenuButton>
            <MenuIcon />
          </MenuButton>
        </MainHeader>
      </Header>

      <ChatContainer>
        {messages.map((message) => (
          <Message key={message.id} isAI={message.isAI}>
            <ProfilePic 
              src={message.isUser ? "/images/Ellipse 11.png" : "/images/ai.png"} 
              alt={message.isUser ? "User" : "AI"}
            />
            <MessageBubble isAI={message.isAI}>
              {message.text}
            </MessageBubble>
          </Message>
        ))}
      </ChatContainer>

      <InputContainer>
        <InputWrapper>
          <IconButton>
            <CameraIcon />
          </IconButton>
          <Input placeholder="Type your message here..." />
        </InputWrapper>
        <IconButton>
          <VoiceIcon />
        </IconButton>
      </InputContainer>
    </Container>
  );
} 