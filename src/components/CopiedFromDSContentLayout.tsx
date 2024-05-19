import styled from 'styled-components';
import { JSX } from 'react';
import { AppRoute, device } from '@aplinkosministerija/design-system';
interface Props {
  children: any;
  title?: string;
  customSubTitle?: any;
  customTitle?: any;
  currentRoute?: AppRoute;
  pageActions?: JSX.Element;
  limitWidth?: boolean;
}
const CopiedFromDSContentLayout = ({
  children,
  title,
  customSubTitle,
  customTitle,
  currentRoute,
  pageActions,
  limitWidth = false,
}: Props) => {
  const pageTitle = title || currentRoute?.title;
  return (
    <Container $limitWidth={limitWidth}>
      {pageActions}
      <InnerContainer>
        {customTitle || (pageTitle && <Title>{pageTitle}</Title>)}
        {customSubTitle ||
          (currentRoute?.description && <SubTitle>{currentRoute?.description}</SubTitle>)}
        {children}
      </InnerContainer>
    </Container>
  );
};
export default CopiedFromDSContentLayout;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.text?.primary || '#101010'};
  margin-bottom: 16px;
`;

const Container = styled.div<{ $limitWidth: boolean }>`
  display: flex;
  gap: 12px;
  width: 100%;
  min-height: 100%;
  padding: 0 12px;
  ${({ $limitWidth }) =>
    $limitWidth &&
    `@media ${device.desktop} {
    max-width: 700px;
  }`}
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  align-self: center;
  align-items: center;
  padding: 0 12px;
  background-color: white;
  @media ${device.desktop} {
    border-radius: 16px;
    margin: 0 auto;
    padding: 40px;
    overflow-y: auto;
    height: fit-content;
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.text?.primary || '#101010'};
  font-size: 3.2rem;
  font-weight: 800;
  margin: 16px 0;
  text-align: center;
`;
