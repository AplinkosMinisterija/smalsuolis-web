import Div100vh from 'react-div-100vh';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../../styles';
import { filterMenuRoutes, IconName, slugs, useLogout } from '../../../utils';
import MenuButton from './MenuButton';
import Icon from './../Icons';
import Modal from './../Modal';
import { useContext } from 'react';
import { UserContext, UserContextType } from '../../UserProvider';

const MobileMenu = ({ onClose, visible = true }: any) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const { loggedIn } = useContext<UserContextType>(UserContext);
  const { mutateAsync: logout } = useLogout();

  const routes = filterMenuRoutes(loggedIn);

  return (
    <Modal visible={visible} onClose={onClose}>
      <Container>
        <InnerContainer>
          <Header>
            <IconContainer onClick={onClose}>
              <StyledIcon name="close" />
              Uždaryti
            </IconContainer>
          </Header>
          <Headings>
            <Title>Meniu</Title>
            <Subtitle>Pasirinkite dominančią sritį</Subtitle>
          </Headings>
          {routes?.map((route, index) => {
            return (
              <MenuButton
                key={`menu_button_${index}`}
                isActive={!!matchPath({ path: route.slug, end: false }, currentLocation.pathname)}
                label={route.title || ''}
                icon={route.iconName}
                onClick={() => {
                  navigate(route.slug);
                  onClose();
                }}
              />
            );
          })}
          <MenuButton
            label={loggedIn ? 'Atsijungti' : 'Prisijungti'}
            icon={IconName.logout}
            onClick={() => {
              if (loggedIn) {
                logout();
              } else {
                navigate(slugs.login);
                onClose();
              }
            }}
          />
        </InnerContainer>
      </Container>
    </Modal>
  );
};

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2.4rem;
`;

const Container = styled(Div100vh)`
  width: 100%;
`;

const InnerContainer = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 0 16px 24px 16px;
  @media ${device.desktop} {
    max-width: 700px;
    padding: 40px;
    flex-basis: auto;
    border-radius: 16px;
    min-height: fit-content;
  }
`;

const IconContainer = styled.div`
  align-items: center;
  display: flex;
  font-weight: 600;
  gap: 4px;
  text-decoration: none;
  margin: 0 0 0 auto;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  height: 48px;
  justify-content: space-between;
  padding: 16px 0;
`;

const Headings = styled.div`
  margin: 16px 0 32px 0;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 800;
  text-align: center;
`;

const Subtitle = styled.div`
  line-height: 26px;
  margin-top: 4px;
  text-align: center;
`;

export default MobileMenu;
