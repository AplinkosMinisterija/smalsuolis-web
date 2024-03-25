import styled from 'styled-components';
import { svgToUrl } from '@aplinkosministerija/design-system';
import { App } from '../utils';

const AppItem = ({
  app,
  onClick,
  selected,
  icon,
  text,
}: {
  selected: boolean;
  onClick?: () => void;
  app?: App;
  icon?: JSX.Element;
  text?: string;
}) => {
  return (
    <AppContainer onClick={onClick} $selected={selected}>
      {icon ? icon : app ? <AppIcon src={svgToUrl(app.icon)} $selected={selected} /> : null}
      <Text>{text ? text : app?.name || ''}</Text>
    </AppContainer>
  );
};

export default AppItem;

const AppIcon = styled.img<{ $selected: boolean }>`
  height: 16px;
  filter: ${({ $selected }) =>
    $selected
      ? 'invert(20%) sepia(37%) saturate(900%) hue-rotate(83deg) brightness(94%) contrast(86%)'
      : 'invert(26%) sepia(13%) saturate(0%) hue-rotate(263deg) brightness(110%) contrast(86%)'};
`;

const AppContainer = styled.div<{ $selected: boolean }>`
  background-color: ${({ $selected }) => ($selected ? '#E8F9EC' : 'white')};
  border: 1px solid ${({ $selected, theme }) => ($selected ? '#73DC8C' : '#D4D5DE')};
  border-radius: 17px;
  padding: 4px 12px;
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  opacity: 1;
  gap: 6px;
  cursor: pointer;
  color: ${({ $selected }) => ($selected ? '#1B4C28' : '#525252')};
`;

const Text = styled.div`
  font-size: 1.4rem;
`;
