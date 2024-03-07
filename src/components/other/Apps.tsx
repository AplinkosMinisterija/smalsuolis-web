import styled from 'styled-components';
import { App, getIconUrl } from '../../utils';

const AppItem = ({
  app,
  onClick,
  selected,
}: {
  app: App;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <AppContainer onClick={onClick} $selected={selected}>
      <AppIcon src={getIconUrl(app.icon)} $selected={selected} />
      <Text>{app.name}</Text>
    </AppContainer>
  );
};

const Apps = ({
  options,
  value,
  onChange,
}: {
  options: App[];
  value: number[];
  onChange: (options: number[]) => void;
}) => {
  const updateValue = (id: number, checked: boolean) => {
    if (checked) {
      return [...value, id];
    } else {
      return value.filter((val) => val !== id);
    }
  };
  return (
    <Container>
      {options.map((option) => {
        const selected = value.includes(option.id);
        return (
          <AppItem
            app={option}
            onClick={() => {
              const updatedValues = updateValue(option.id, !selected);
              onChange(updatedValues);
            }}
            selected={selected}
          />
        );
      })}
    </Container>
  );
};

export default Apps;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
`;

const InputRadio = styled.input`
  z-index: 100;
  height: 0;
  padding: 0;
  margin: 0;
  display: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  align-items: baseline;
  padding: 16px;
  gap: 4px;
  cursor: pointer;
  z-index: 90;
  font-size: 14px;
  border: 1px solid #d4d5de;
  border-radius: 4px;
  font-weight: 500;

  ${InputRadio}:checked + & {
    border-color: ${({ theme }) =>
      theme.colors.primary}; /* Example: change border color when selected */
    background-color: #f4fdf6; /* Example: change background color when selected */
  }
`;

const Title = styled.div`
  font-weight: 600;
`;

const Description = styled.div`
  color: #525252;
  font-weight: 400;
  font-size: 12px;
`;

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
