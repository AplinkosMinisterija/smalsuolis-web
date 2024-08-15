import { format } from 'date-fns';
import lt from 'date-fns/locale/lt';
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useWindowSize } from '@aplinkosministerija/design-system';
import { device } from '../styles';
import Icon from './Icons';
import { IconName } from '../utils';

registerLocale('lt', lt);

export interface DatepickerProps {
  startDate?: Date;
  setStartDate?: React.Dispatch<React.SetStateAction<Date>>;
  disabled?: boolean;
  value?: Date | string;
  padding?: string;
  error?: string;
  onChange: (date?: Date) => void;
  label?: string;
  name?: string;
  className?: string;
  maxDate?: Date | string;
  minDate?: Date | string;
  bottom?: boolean;
}

const Datepicker = ({
  value,
  onChange,
  disabled = false,
  maxDate,
  minDate,
  bottom = false,
}: DatepickerProps) => {
  const daterRegex = /^\d{4}-\d{2}-\d{2}$/;
  const isMobile = useWindowSize(device.mobileL);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  const handleBlurInput = (event: any) => {
    if (disabled) return;

    if (!event.currentTarget.contains(event.relatedTarget)) {
      if (!validDate(inputValue)) {
        setInputValue('');
        onChange(undefined);
      }
    }
  };

  useEffect(() => {
    if (!value) {
      setInputValue('');
    } else {
      setInputValue(format(new Date(value), 'yyyy-MM-dd'));
    }
  }, [value]);

  const isLessThanMaxDate = (value: string) => {
    if (maxDate) {
      return new Date(value) <= new Date(maxDate);
    }
    return true;
  };

  const isMoreThanMinDate = (value: string) => {
    if (minDate) {
      return new Date(value) >= new Date(minDate);
    }
    return true;
  };

  const validDate = (date: string) =>
    daterRegex.test(date) &&
    new Date(date).toString() !== 'Invalid Date' &&
    isMoreThanMinDate(date) &&
    isLessThanMaxDate(date);

  const handleChange = (date: any) => {
    setInputValue(date);
    if (validDate(date)) {
      onChange(new Date(date));
    }
  };

  const textValue = validDate(inputValue) ? format(new Date(inputValue), 'yyyy-MM') : inputValue;

  return (
    <Container tabIndex={1} onBlur={handleBlur}>
      <div tabIndex={2} onBlur={handleBlurInput}>
        <FilterButton onClick={() => setOpen(!open)}>
          <SelectedDateLabel>{textValue}</SelectedDateLabel>
          <Icon name={IconName.dropdownArrow} />
        </FilterButton>
      </div>

      {open && !disabled ? (
        <DateContainer>
          {isMobile && (
            <div onClick={() => setOpen(false)}>
              <CloseIcon name="close" />
            </div>
          )}
          <DatePicker
            locale="lt"
            open={open}
            maxDate={new Date(new Date().setDate(new Date().getDate()))}
            selected={value ? new Date(value as any) : null}
            onClickOutside={() => setOpen(false)}
            onSelect={() => setOpen(false)}
            onChange={(date: Date) => {
              onChange(date);
              setOpen(false);
            }}
            inline
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
          ></DatePicker>
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
  @media ${device.mobileL} {
    position: fixed;
    z-index: 9;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const CloseIcon = styled(Icon)`
  color: white;
  font-size: 2.8rem;
  align-self: center;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const Container = styled.div`
  position: relative;
  &:focus {
    outline: none;
  }
  .react-datepicker__header {
    color: black;
    background-color: #ffffff !important;
    border: none;
    font-size: 1.6rem;
  }
  .react-datepicker__month {
    margin: 20px;
    text-align: center;
    font-size: 1.6rem;
    text-align: center;
    .react-datepicker__month-text,
    .react-datepicker__quarter-text {
      display: inline-block;
      width: 5rem;
      margin: 15px;
    }
  }

  .react-datepicker__input-time-container {
    margin: 0;
  }
  .react-datepicker {
    width: 350px;
    position: absolute;
    top: 0;
    z-index: 8;
    background-color: #ffffff;
    box-shadow: 0px 2px 16px #121a5529;
    border-radius: 10px;
    padding: 0px 16px 16px 16px;
    border: none;
    @media ${device.mobileL} {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    @media ${device.mobileS} {
      width: 95%;
    }
  }
`;

const FilterButton = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 16px;
  width: 150px;
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
