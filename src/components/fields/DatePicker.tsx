import { format } from 'date-fns';
import lt from 'date-fns/locale/lt';
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { device } from '../../styles';
import Icons from '../other/Icons';
import TextField from './TextField';
import { useWindowSize } from '../../utils';

registerLocale('lt', lt);

export interface DatepickerProps {
  startDate?: Date;
  setStartDate?: React.Dispatch<React.SetStateAction<Date>>;
  disabled?: boolean;
  value?: Date;
  padding?: string;
  error?: string;
  onChange: (date?: Date) => void;
  label?: string;
  name?: string;
  className?: string;
  maxDate?: Date;
  minDate?: Date;
  bottom?: boolean;
}

const Datepicker = ({
  value,
  error,
  onChange,
  label,
  disabled = false,
  padding,
  className,
  name,
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

  const handleChange = (date: string) => {
    setInputValue(date);
    if (validDate(date)) {
      onChange(new Date(date));
    }
  };

  const textValue = validDate(inputValue) ? format(new Date(inputValue), 'yyyy-MM-dd') : inputValue;

  return (
    <Container bottom={bottom} tabIndex={1} onBlur={handleBlur} disabled={disabled}>
      <div tabIndex={2} onBlur={handleBlurInput}>
        <TextField
          placeholder="2000-01-01"
          className={className}
          name={name}
          onChange={handleChange}
          label={label}
          padding={padding}
          value={textValue}
          error={error}
          rightIcon={
            <IconContainer disabled={disabled} onClick={() => setOpen(!open)}>
              <CalendarIcon name={'calendar'} />
            </IconContainer>
          }
          disabled={disabled}
        />
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
            {...(maxDate ? { maxDate } : {})}
            {...(minDate ? { minDate } : {})}
            selected={value ? new Date(value as any) : null}
            onClickOutside={() => setOpen(false)}
            onSelect={() => setOpen(false)}
            onChange={(date: Date) => {
              onChange(date as Date);
              setOpen(false);
            }}
            inline
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

const CalendarIcon = styled(Icons)`
  color: rgb(122, 126, 159);
  vertical-align: middle;
  margin-right: 8px;
  font-size: 2.8rem;
  align-self: center;
`;

const CloseIcon = styled(Icons)`
  color: white;
  font-size: 2.8rem;
  align-self: center;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const IconContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Container = styled.div<{ disabled: boolean; bottom: boolean }>`
  width: 100%;
  &:focus {
    outline: none;
  }
  .react-datepicker__header {
    color: #121a55;
    background-color: #ffffff !important;
    border: none;
  }
  .react-datepicker__month {
    margin: 0;
  }
  .react-datepicker__day--outside-month {
    color: #151229;
    opacity: 0.6;
  }
  .react-datepicker__input-time-container {
    text-align: center;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__day {
    &:focus {
      outline: none;
    }
    margin: 26px 32px 0px 0px;
    position: relative;
    font: normal normal normal 1.5rem/21px Atkinson Hyperlegible;
    &:hover {
      background-color: #febc1d;
      &::before {
        content: '';
        position: absolute;
        background-color: #febc1d;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        width: 50px;
        height: 50px;
        border-radius: 25px;
      }
    }

    @media ${device.mobileS} {
      margin: 26px 16px 0px 0px;
      &:hover {
        &::before {
          content: '';
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  .react-datepicker__input-time-container {
    margin: 0;
  }
  .react-datepicker {
    width: 364px;
    position: absolute;
    top: ${({ bottom }) => (bottom ? '-450px' : '0px')};
    z-index: 2;
    background-color: #ffffff;
    box-shadow: 0px 2px 16px #121a5529;
    border-radius: 10px;
    padding: 0px 26px 20px 26px;
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
  .react-datepicker-time__caption {
    font: normal normal 600 1.6rem/40px Atkinson Hyperlegible;
    display: block !important;
    margin: 15px 0px 10px 0px;
    text-align: center;
    color: #0b1f51;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  .react-datepicker__day--selected {
    background-color: white;
    position: relative;
    z-index: 1;
    font: normal normal normal 1.5rem/21px Atkinson Hyperlegible;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: white;
    font: normal normal normal 1.5rem/21px Atkinson Hyperlegible;
    color: #121a55;
  }
  .react-datepicker__day--selected::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    background: #febc1d 0% 0% no-repeat padding-box;
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  @media ${device.mobileS} {
    .react-datepicker__day--selected::before {
      content: '';
      width: 30px;
      height: 30px;
    }
  }
  .react-datepicker__day-name {
    font: normal normal bold 14px/19px Atkinson Hyperlegible;
    letter-spacing: 0px;
    color: #151229;
    margin: 26px 32px 0px 0px;
    border: none;
  }

  @media ${device.mobileS} {
    .react-datepicker__day-name {
      margin: 26px 16px 0px 0px;
    }
  }
  .react-datepicker__navigation {
    top: 20px;
  }
  .react-datepicker__current-month {
    text-align: center;
    font: normal normal 600 1.6rem/22px Atkinson Hyperlegible;
    letter-spacing: 0px;
    color: #121a55;
    margin-top: 13px;
    text-transform: capitalize;
  }
  .react-datepicker__navigation--previous {
    left: 17px;
  }
  .react-datepicker__navigation--next {
    right: 17px;
  }
  .react-datepicker__month-container {
    float: none;
  }
`;

export default Datepicker;
