import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../state/hooks";
import { slugs } from "../../utils/routes";
import ProfilesDropdown from "./ProfilesDropdown";

const NavBar = () => {
  const navigate = useNavigate();
  const loggedIn = useAppSelector((state) => state.user?.loggedIn);

  return (
    <Header>
      <InnerContainer>
        <div onClick={() => navigate(slugs.events)}>logo</div>
        <TabContainer>
          <Tab onClick={() => navigate(slugs.events)}>Įvykiai</Tab>
        </TabContainer>
        {loggedIn ? (
          <ProfilesDropdown />
        ) : (
          <Tab onClick={() => navigate(slugs.login)}>Prisijungti</Tab>
        )}
      </InnerContainer>
    </Header>
  );
};

export default NavBar;

const Tab = styled.div`
  font-size: 1.6rem;
  color: #121926;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  margin: 0px 16px;
  flex-wrap: wrap;
`;

const Header = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 65px;
  width: 100%;
  border-bottom: 1px solid #cdd5df;
  padding: 20px;
`;

const InnerContainer = styled.div`
  flex-basis: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
