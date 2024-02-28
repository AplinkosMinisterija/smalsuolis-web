import styled from 'styled-components';
import { device } from '../../styles';
import { useGetCurrentRoute } from '../../utils';

const ContentLayout = ({ children, title, customSubTitle, customTitle }: any) => {
  const currentRoute = useGetCurrentRoute();

  const pageTitle = title || currentRoute?.title;

  return (
    <Container>
      {customTitle || (pageTitle && <Title>{pageTitle}</Title>)}
      {customSubTitle ||
        (currentRoute?.description && <SubTitle>{currentRoute?.description}</SubTitle>)}
      {children}
    </Container>
  );
};
export default ContentLayout;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  align-self: center;
  align-items: center;
  padding: 0 12px;
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

const Title = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 3.2rem;
  font-weight: 800;
  margin: 16px 0;
  text-align: center;
`;
