'use client';

import styled from '@emotion/styled';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

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
  position: relative;
  width: 48px;
  height: 48px;
  
  img {
    filter: ${props => props.active ? 'invert(41%) sepia(98%) saturate(4272%) hue-rotate(199deg) brightness(97%) contrast(101%)' : 'invert(0%)'};
  }

  &[data-ai="true"] {
    width: 64px;
    height: 64px;
  }
`;

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <BottomNav>
      <NavItem active={pathname === '/'} onClick={() => router.push('/')}>
        <Image src="/images/home.png" alt="Home" width={32} height={32} />
      </NavItem>
      <NavItem active={pathname === '/community'} onClick={() => router.push('/community')}>
        <Image src="/images/groups.png" alt="Groups" width={32} height={32} />
      </NavItem>
      <NavItem active={pathname === '/ai'} onClick={() => router.push('/ai')} data-ai="true">
        <Image src="/images/ai.png" alt="AI" width={48} height={48} />
      </NavItem>
      <NavItem active={pathname === '/chat'} onClick={() => router.push('/chat')}>
        <Image src="/images/chat.png" alt="Chat" width={32} height={32} />
      </NavItem>
      <NavItem active={pathname === '/account'} onClick={() => router.push('/account')}>
        <Image src="/images/account.png" alt="Account" width={32} height={32} />
      </NavItem>
    </BottomNav>
  );
};

export default BottomNavigation; 