import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles';
import Icon, { IconName } from '../other/Icons';
import MobileMenu from '../other/MobileMenu';

const LogoHeader = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <Container>
        <div onClick={() => navigate('/')}>
          <Icon name={IconName.logo} />
        </div>
        <Button onClick={() => setShowMenu(true)}>
          <MenuIcon name={IconName.burger} />
          Meniu
        </Button>
      </Container>
      <MobileMenu visible={showMenu} onClose={() => setShowMenu(false)} />
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
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  font-weight: 600;
  gap: 4px;
`;

const MenuIcon = styled(Icon)`
  margin-right: 4px;
  font-size: 2rem;
`;

export default LogoHeader;
