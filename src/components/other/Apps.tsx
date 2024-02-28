import styled from 'styled-components';
import { App, getIconUrl } from '../../utils';

const AppItem = ({ id, checked, onChange, app }: any) => {
  const appIcon = getIconUrl(app.icon);
  return (
    <Button>
      <InputRadio type="checkbox" id={id} checked={checked} onChange={onChange} />
      <Label htmlFor={id}>
        <Logo src={appIcon} />
        <Title>{app.name}</Title>
        <Description>{app.description || 'Aprašymas'}</Description>
      </Label>
    </Button>
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
      {options.map((option) => (
        <AppItem
          key={option.id}
          id={option.id}
          checked={value.includes(option.id)}
          onChange={(e: any) => {
            const updatedValues = updateValue(option.id, e.target.checked);
            onChange(updatedValues);
          }}
          app={option}
        />
      ))}
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

const Button = styled.div``;

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

const Logo = styled.img`
  height: 24px;
  filter: invert(100%) sepia(17%) saturate(5026%) hue-rotate(56deg) brightness(89%) contrast(99%);
`;
