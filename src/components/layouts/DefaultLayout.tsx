import Div100vh from 'react-div-100vh';
import styled from 'styled-components';
import { device } from '../../styles';
import { useGetCurrentRoute, useWindowSize } from '../../utils';
import BackHeader from '../headers/BackHeader';
import LogoHeader from '../headers/LogoHeader';
import SideBar from '../other/SideBar';
import LoaderComponent from '../other/LoaderComponent';
import { useContext } from 'react';
import { UserContext, UserContextType } from '../UserProvider';

const DefaultLayout = ({ children, onScroll = () => {} }: any) => {
  const isMobile = useWindowSize(device.mobileL);
  const currentRoute = useGetCurrentRoute();
  const { isLoading, loggedIn } = useContext<UserContextType>(UserContext);

  if (isLoading) {
    return (
      <Container>
        <ScrollableContainer onScroll={onScroll}>
          <InnerContainer>
            {currentRoute?.back ? <BackHeader /> : <LogoHeader />}
            <LoaderComponent />
          </InnerContainer>
        </ScrollableContainer>
      </Container>
    );
  }
  return (
    <Container>
      {!isMobile && <SideBar loggedIn={loggedIn} />}
      <ScrollableContainer onScroll={onScroll}>
        <InnerContainer>
          {currentRoute?.back ? <BackHeader /> : <LogoHeader />}
          {children}
        </InnerContainer>
      </ScrollableContainer>
    </Container>
  );
};
export default DefaultLayout;

const Container = styled(Div100vh)`
  width: 100vw;
  display: flex;
`;

const ScrollableContainer = styled.div`
  width: 100%;
  min-height: 100%;
  overflow-y: scroll;
  background-color: white;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
  @media ${device.desktop} {
    padding: 40px 16px;
    height: fit-content;
    background-color: #f7f7f7;
  }
`;
