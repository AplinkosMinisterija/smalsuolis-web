import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Icon from './Icons';
import {
  Frequency,
  IconName,
  TimeRanges,
  displayCustomDateFilterLabel,
  formatDateAndTime,
  formatDateFrom,
  formatDateTo,
  statsTimeRangeItems,
} from '../utils';
import DateRangePickerModal from './DateRangePickerModal';

const frequencyLabels = {
  [Frequency.DAY]: 'Šiandienos',
  [Frequency.WEEK]: 'Savaitės',
  [Frequency.MONTH]: 'Mėnesio',
  [Frequency.CUSTOM]: 'Pasirinkite datą',
};

export interface DatepickerProps {
  value: string;
  onChange: (val1: string, val2: { $gte: string; $lt: string }) => void;
  selectedDates: {
    $gte: string;
    $lt: string;
  };
}

const Datepicker = ({ value, onChange, selectedDates }: DatepickerProps) => {
  const [open, setOpen] = useState(false);
  const [openDatePickerModal, setOpenDatePickerModal] = useState(false);
  const [date, setDate] = useState({ start: new Date(), end: new Date() });

  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (value === TimeRanges.CUSTOM && selectedDates) {
      setDate({
        start: new Date(selectedDates.$gte),
        end: new Date(selectedDates.$lt),
      });
    }
  }, []);

  return (
    <Container tabIndex={1} onBlur={handleBlur}>
      <FilterButton onClick={() => setOpen(!open)}>
        <SelectedDateLabel>
          {value === TimeRanges.CUSTOM
            ? displayCustomDateFilterLabel({
                start: new Date(selectedDates.$gte),
                end: new Date(selectedDates.$lt),
              })
            : frequencyLabels[value]}
        </SelectedDateLabel>
        <Icon name={IconName.dropdownArrow} />
      </FilterButton>

      {open ? (
        <DateContainer>
          <FilterContainer>
            {statsTimeRangeItems?.map((item) => {
              return (
                <SelectedDateLabel
                  key={item.key}
                  onClick={() => {
                    if (item.key === TimeRanges.CUSTOM) {
                      setOpenDatePickerModal(true);
                      setOpen(false);
                    } else {
                      onChange(item.key, item.query);
                      setDate({ start: new Date(), end: new Date() });
                      setOpen(false);
                    }
                  }}
                >
                  {item.name}
                </SelectedDateLabel>
              );
            })}
          </FilterContainer>
        </DateContainer>
      ) : null}
      {!openDatePickerModal && (
        <DateRangePickerModal
          onDateChange={(val) => {
            val && setDate({ start: val.start, end: val.end });
          }}
          startDate={date.start}
          endDate={date.end}
          setOpen={(val) => {
            onChange(TimeRanges.CUSTOM, {
              $gte: formatDateAndTime(formatDateFrom(date.start)),
              $lt: formatDateAndTime(formatDateTo(date.end || date.start)),
            });
            setOpenDatePickerModal(val);
          }}
        />
      )}
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
  min-width: 170px;
  max-width: fit-content;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 16px;
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

const SelectedDateLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 22px;
  white-space: pre;
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

export default Datepicker;
