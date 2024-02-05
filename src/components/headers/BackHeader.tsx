import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles';
import Icon, { IconName } from '../other/Icons';
import MobileMenu from '../other/MobileMenu';

const BackHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon name={IconName.back} />
        </BackButton>
        <Menu onClick={() => setShowMenu(true)}>
          <MenuIcon name={IconName.burger} />
          Meniu
        </Menu>
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

const Menu = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  font-weight: 600;
  gap: 4px;
`;

const MenuIcon = styled(Icon)`
  margin-right: 4px;
  font-size: 2.4rem;
`;

const BackIcon = styled(Icon)`
  align-items: center;
  display: flex;
  font-size: 2.4rem;
  gap: 4px;
  text-decoration: none;
`;

const BackButton = styled.div`
  padding: 16px 16px 16px 0;
`;
export default BackHeader;
