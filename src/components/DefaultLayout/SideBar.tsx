import styled from 'styled-components';
import { DefaultLayoutProps } from './index';
import Icon from '../Icons';
import { IconName } from '../../utils';

const SideBar = ({
  loggedIn,
  loginSlug,
  menuRoutes,
  logo,
  onLogin,
  onLogout,
  onRouteSelected,
  currentRoute,
}: DefaultLayoutProps) => {
  return (
    <Container>
      <LogoContainer>{logo}</LogoContainer>
      {menuRoutes.map((route: any, index: any) => {
        return (
          <Item
            key={`sidebar_btn_${route.slug}_${index}`}
            onClick={() => onRouteSelected(route.slug)}
            $isActive={!!currentRoute?.slug.includes(route.slug)}
          >
            <IconWrapper>{route.icon}</IconWrapper>
            <Label>{route.title}</Label>
          </Item>
        );
      })}
      <Divider />
      {loggedIn ? (
        <Item onClick={() => onLogout()} $isActive={false}>
          <IconWrapper>
            <Icon name={IconName.logout} />
          </IconWrapper>
          <Label>Atsijungti</Label>
        </Item>
      ) : (
        <Item onClick={onLogin} $isActive={loginSlug === currentRoute?.slug}>
          <IconWrapper>
            <Icon name={IconName.logout} />
          </IconWrapper>
          <Label>Prisijungti</Label>
        </Item>
      )}
    </Container>
  );
};

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  font-size: 2.4rem;
  svg {
    stroke: ${({ theme }) => theme.colors.primary};
  }
  rect {
    stroke: ${({ theme }) => theme.colors.primary};
  }
  path {
    stroke: ${({ theme }) => theme.colors.primary};
  }
  circle {
    stroke: ${({ theme }) => theme.colors.primary};
  }
  polyline {
    stroke: ${({ theme }) => theme.colors.primary};
  }
  line {
    stroke: ${({ theme }) => theme.colors.primary};
  }
`;
const Label = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`;

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 32px;
  height: 100%;
  min-width: 320px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.02);
  gap: 4px;
`;

const Item = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 8px;
  border-radius: 5px;
  transition: all 0.2s ease-out;
  color: ${({ theme }) => theme.colors.text?.primary || '#101010'};

  ${({ $isActive, theme }) =>
    $isActive &&
    `


 ${IconWrapper} {
  rect {
      stroke: black;
    }
    path {
      stroke: black;
    }
    circle {
      stroke: black;
    }
    polyline {
      stroke: black;
    }
    line {
      stroke: black;
    }
  }

    background-color: ${theme.colors.primary};
  
  
  `};

  &:hover ${IconWrapper} {
    rect {
      stroke: black;
    }
    path {
      stroke: black;
    }
    circle {
      stroke: black;
    }
    polyline {
      stroke: black;
    }
    line {
      stroke: black;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d4d5de;
  margin: 16px 0;
`;

export default SideBar;
