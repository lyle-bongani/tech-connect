'use client';

import styled from '@emotion/styled';
import { useRouter, usePathname } from 'next/navigation';

const BottomNav = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  padding: 12px 32px;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const NavItem = styled.div<{ active?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  
  img {
    width: 32px;
    height: 32px;
    filter: ${props => props.active ? 'invert(41%) sepia(98%) saturate(4272%) hue-rotate(199deg) brightness(97%) contrast(101%)' : 'invert(0%)'};
  }

  &[data-ai="true"] img {
    width: 48px;
    height: 48px;
  }
`;

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <BottomNav>
      <NavItem active={pathname === '/'} onClick={() => router.push('/')}>
        <img src="/images/home.png" alt="Home" />
      </NavItem>
      <NavItem active={pathname === '/community'} onClick={() => router.push('/community')}>
        <img src="/images/groups.png" alt="Groups" />
      </NavItem>
      <NavItem active={pathname === '/ai'} onClick={() => router.push('/ai')} data-ai="true">
        <img src="/images/ai.png" alt="AI" />
      </NavItem>
      <NavItem active={pathname === '/chat'} onClick={() => router.push('/chat')}>
        <img src="/images/chat.png" alt="Chat" />
      </NavItem>
      <NavItem active={pathname === '/account'} onClick={() => router.push('/account')}>
        <img src="/images/account.png" alt="Account" />
      </NavItem>
    </BottomNav>
  );
};

export default BottomNavigation; 