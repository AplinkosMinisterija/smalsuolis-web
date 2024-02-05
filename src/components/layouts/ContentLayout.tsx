import styled from 'styled-components';
import { device } from '../../styles';
import { useGetCurrentRoute } from '../../utils';

const ContentLayout = ({ children }: any) => {
  const currentRoute = useGetCurrentRoute();
  return (
    <Content>
      {currentRoute?.title && <Title>{currentRoute?.title}</Title>}
      {children}
    </Content>
  );
};
export default ContentLayout;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 3.2rem;
  font-weight: 800;
  margin: 16px 0;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  align-self: center;
  align-items: center;
  padding: 0 40px;
  background-color: white;
  @media ${device.desktop} {
    max-width: 700px;
    border-radius: 16px;
    margin: 0 auto;
    padding: 40px;
    overflow-y: auto;
    height: fit-content;
  }
`;
