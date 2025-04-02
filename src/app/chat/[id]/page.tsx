'use client';

import styled from '@emotion/styled';
import { 
  ArrowBack as ArrowBackIcon,
  MoreHoriz as MoreIcon,
  Favorite as HeartIcon,
  Image as ImageIcon,
  Mic as MicIcon
} from '@mui/icons-material';
import Link from 'next/link';

const Container = styled.div`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TopHeader = styled.div`
  padding: 8px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 10;
`;

const Header = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #E5E5E5;
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  background: white;
  z-index: 10;
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

const GroupInfo = styled.div`
  flex: 1;
`;

const GroupImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
`;

const GroupName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const GroupMembers = styled.div`
  font-size: 13px;
  color: #666;
`;

const MoreButton = styled.button`
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
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  margin-top: 120px;
  margin-bottom: 80px;
`;

const Message = styled.div<{ isMe?: boolean }>`
  display: flex;
  flex-direction: ${props => props.isMe ? 'row-reverse' : 'row'};
  gap: 8px;
  align-items: flex-start;
`;

const MessageAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageContent = styled.div<{ isMe?: boolean }>`
  background: ${props => props.isMe ? '#007AFF' : '#F0F0F0'};
  color: ${props => props.isMe ? 'white' : '#333'};
  padding: 12px 16px;
  border-radius: 20px;
  max-width: 70%;
`;

const MessageImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
`;

const InputContainer = styled.div`
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 10;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 12px 16px;
  border-radius: 15px;
  border: 1px solid #007AFF;
`;

const Input = styled.input`
  border: none;
  background: none;
  font-size: 15px;
  color: #333;
  width: 100%;
  outline: none;
  &::placeholder {
    color: #999;
  }
`;

const IconButton = styled.button<{ isOutside?: boolean }>`
  background: ${props => props.isOutside ? 'none' : 'transparent'};
  border: ${props => props.isOutside ? '1px solid #007AFF' : 'none'};
  border-radius: ${props => props.isOutside ? '50%' : '0'};
  padding: ${props => props.isOutside ? '10px' : '0'};
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.isOutside ? '40px' : 'auto'};
  height: ${props => props.isOutside ? '40px' : 'auto'};
`;

export default function ChatDetailPage() {
  return (
    <Container>
      <TopHeader>
        <Link href="/chat">
          <BackButton>
            <ArrowBackIcon />
          </BackButton>
        </Link>
      </TopHeader>
      
      <Header>
        <GroupImage src="/images/cat.png" alt="Tech Project Team" />
        <GroupInfo>
          <GroupName>Tech Project Team</GroupName>
          <GroupMembers>12 Members</GroupMembers>
        </GroupInfo>
        <HeartIcon sx={{ color: 'red' }} />
        <MoreButton>
          <MoreIcon />
        </MoreButton>
      </Header>

      <ChatContainer>
        <Message>
          <MessageAvatar src="/images/Ellipse 13.png" alt="User" />
          <MessageContent>Hey guys...</MessageContent>
        </Message>
        <Message>
          <MessageAvatar src="/images/Ellipse 13.png" alt="User" />
          <MessageContent>
            <MessageImage src="/images/cat.png" alt="CAT" />
            <div>Have completed task one. How is the rest of the team doing?</div>
          </MessageContent>
        </Message>
        <Message isMe>
          <MessageAvatar src="/images/Ellipse 13.png" alt="Me" />
          <MessageContent isMe>Hey David, Dropping something soon</MessageContent>
        </Message>
        <Message isMe>
          <MessageAvatar src="/images/Ellipse 13.png" alt="Me" />
          <MessageContent isMe>How looks good David.</MessageContent>
        </Message>
        <Message isMe>
          <MessageAvatar src="/images/Ellipse 13.png" alt="Me" />
          <MessageContent isMe>Sending in my figma link in 30 minutes.</MessageContent>
        </Message>
      </ChatContainer>

      <InputContainer>
        <InputWrapper>
          <IconButton>
            <ImageIcon />
          </IconButton>
          <Input placeholder="Type your message here..." />
        </InputWrapper>
        <IconButton isOutside>
          <MicIcon />
        </IconButton>
      </InputContainer>
    </Container>
  );
} 