import Div100vh from "react-div-100vh";
import styled from "styled-components";
import { device } from "../../styles";

export interface LoginLayoutProps {
  children?: React.ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <Div100vh>
      <Container>
        <Content>{children}</Content>
      </Container>
    </Div100vh>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  overflow-y: auto;
`;

const Content = styled.div`
  margin: auto;

  background-color: #ffffff;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  width: 430px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media ${device.mobileL} {
    padding: 32px 16px 32px 16px;
    width: 100%;
    height: 100%;
    justify-content: center;
    border-radius: 0px;
  }
`;

export default LoginLayout;
