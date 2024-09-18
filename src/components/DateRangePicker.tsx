import { lt } from 'date-fns/locale';
import Datepicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { device, useWindowSize } from '@aplinkosministerija/design-system';
import Icon from './Icons';
import { IconName } from '../utils';

registerLocale('lt', lt);

export interface DateRangePickerProps {
  onDateChange: ({ start, end }) => void;
  endDate: Date;
  startDate: Date;
  setOpen: (val: boolean) => void;
}

const DateRangePicker = ({ onDateChange, endDate, startDate, setOpen }: DateRangePickerProps) => {
  const isMobile = useWindowSize(device.mobileL);
  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <Container tabIndex={1} onBlur={handleBlur}>
      <DateContainer>
        {isMobile && (
          <div
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon name={IconName.close} />
          </div>
        )}
        <Datepicker
          locale="lt"
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            onDateChange({ start, end: end });
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          onClickOutside={() => setOpen(false)}
          inline
        />
      </DateContainer>
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
    font-size: 1.5rem;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      &::before {
        content: '';
        position: absolute;
        background-color: ${({ theme }) => theme.colors.primary};
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
    top: 5px;
    z-index: 8;
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
    font-size: 1.6rem;
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
    font-size: 1.5rem;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: white;
    font-size: 1.5rem;
    color: #121a55;
  }
  .react-datepicker__day--selected::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

    background-color: ${({ theme }) => theme.colors.primary};
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

  }

  .react-datepicker__day-name {
    font-size: 1.4rem;
    font-weight: bold;

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
    font-size: 1.6rem;
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
  .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default DateRangePicker;
