import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Icon from './Icons';
import { Frequency, IconName, statsTimeRangeItems } from '../utils';

const frequencyLabels = {
  [Frequency.DAY]: 'Šiandienos',
  [Frequency.WEEK]: 'Savaitės',
  [Frequency.MONTH]: 'Mėnesio',
};

export interface DatepickerProps {
  value: string;
  onChange: (val1: string, val2: { $gte: string; $lt: string }) => void;
  maxDate?: Date | string;
  minDate?: Date | string;
}

const Datepicker = ({ value, onChange }: DatepickerProps) => {
  const [open, setOpen] = useState(false);
  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <Container tabIndex={1} onBlur={handleBlur}>
      <FilterButton onClick={() => setOpen(!open)}>
        <SelectedDateLabel>{frequencyLabels[value]}</SelectedDateLabel>
        <Icon name={IconName.dropdownArrow} />
      </FilterButton>

      {open ? (
        <DateContainer>
          <FilterContainer>
            {statsTimeRangeItems?.map((item) => (
              <SelectedDateLabel
                key={item.key}
                onClick={() => {
                  onChange(item.key, item.query);
                  setOpen(false);
                }}
              >
                {frequencyLabels[item.key]}
              </SelectedDateLabel>
            ))}
          </FilterContainer>
        </DateContainer>
      ) : null}
    </Container>
  );
};

const DateContainer = styled.div`
  position: relative;
  &:focus {
    outline: none;
  }
`;

const FilterContainer = styled.div`
  position: absolute;
  z-index: 8;
  padding: 32px;
  gap: 24px;
  background-color: white;
  top: 10px;
  border-radius: 16px;
  box-shadow: 0px 18px 41px #121a5529;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  position: relative;
  &:focus {
    outline: none;
  }
`;

const FilterButton = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 16px;
  width: 170px;
  max-width: 160px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 16px;
`;

const SelectedDateLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 22px;
`;

export default Datepicker;
