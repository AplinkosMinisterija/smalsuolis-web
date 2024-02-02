import Div100vh from 'react-div-100vh';
import styled from 'styled-components';
import NavBar from '../other/NavBar';

export interface DefaultLayoutProps {
  children?: React.ReactNode;
  maxWidth?: string;
  onScroll?: any;
}

const DefaultLayout = ({ children, maxWidth = '100%', onScroll }: DefaultLayoutProps) => {
  return (
    <Div100vh>
      <Container>
        <NavBar />
        <Content onScroll={onScroll} maxWidth={maxWidth}>
          {children}
        </Content>
      </Container>
    </Div100vh>
  );
};

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  background-color: white;
`;

const Content = styled.div<{ maxWidth: string }>`
  overflow: auto;
  height: 100%;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  margin: 0 auto;
`;

export default DefaultLayout;
