import { device } from '@aplinkosministerija/design-system';
import { lt } from 'date-fns/locale';
import Datepicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

registerLocale('lt', lt);

export interface DateRangePickerProps {
  onDateChange: ({ start, end }) => void;
  endDate?: Date;
  startDate?: Date;
}

const InlaneDateRangePicker = ({ onDateChange, endDate, startDate }: DateRangePickerProps) => {
  return (
    <Container>
      <DateContainer>
        <Datepicker
          locale="lt"
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            onDateChange({ start, end });
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </DateContainer>
    </Container>
  );
};

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
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
  .react-datepicker__day {
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
  }
  .react-datepicker {
    width: 364px;
    background-color: #ffffff;
    z-index: 8;
    border-radius: 10px;
    padding: 0px 26px 20px 26px;
    border: ${({ theme }) => `1px solid ${theme.colors.greyDarker}`};
    @media ${device.mobileM} {
      padding: 0px 16px 20px 16px;
    }
  }
  .react-datepicker-time__caption {
    font-size: 1.6rem;
    margin: 15px 0px 10px 0px;
    text-align: center;
    color: #0b1f51;
  }
  .react-datepicker__day--selected {
    background-color: white;
    position: relative;
    z-index: 1;
    font-size: 1.5rem;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    font-size: 1.5rem;
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
  .react-datepicker__day-name {
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 0px;
    color: #151229;
    margin: 26px 32px 0px 0px;
    border: none;
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

export default InlaneDateRangePicker;
