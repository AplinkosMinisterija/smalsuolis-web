import styled from 'styled-components';
import { App } from '../../utils';
import AppItem from './AppsItem';

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
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
