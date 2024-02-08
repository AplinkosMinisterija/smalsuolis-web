import styled from 'styled-components';
import { useGetCurrentRoute } from '../../utils';
import { ContentLayoutContainer, ContentLayoutTitle } from '../other/CommonStyles';

const ContentLayout = ({ children, title }: any) => {
  const currentRoute = useGetCurrentRoute();

  return (
    <ContentLayoutContainer>
      {currentRoute?.title && <ContentLayoutTitle>{currentRoute?.title}</ContentLayoutTitle>}
      {currentRoute?.description && <Description>{currentRoute?.description}</Description>}
      {children}
    </ContentLayoutContainer>
  );
};
export default ContentLayout;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;
