import { useState } from 'react';
import styled from 'styled-components';
import MobileMenu from './MobileMenu';
import { device } from '@aplinkosministerija/design-system';
import { DefaultLayoutProps } from './index';
import Icon from '../Icons';
import { IconName } from '../../utils';

const LogoHeader = (props: DefaultLayoutProps) => {
  const { onGoHome, logo } = props;
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <Container>
        <div onClick={onGoHome}>{logo}</div>
        <Button onClick={() => setShowMenu(true)}>
          <MenuIcon name={IconName.burger} />
          Meniu
        </Button>
      </Container>
      <MobileMenu visible={showMenu} onClose={() => setShowMenu(false)} {...props} />
    </>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  height: 80px;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  background-color: white;
  @media ${device.desktop} {
    display: none;
  }
`;

const Button = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.text?.primary || '#101010'};
  display: flex;
  font-weight: 600;
  gap: 4px;
`;

const MenuIcon = styled(Icon)`
  margin-right: 4px;
  font-size: 2rem;
`;

export default LogoHeader;
