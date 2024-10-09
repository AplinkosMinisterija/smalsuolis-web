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
  @media ${device.mobileL} {
    margin-top: 8px;
  }
`;

const Container = styled.div`
  .react-datepicker__header {
    background-color: #ffffff !important;
    border: none;
  }
  .react-datepicker__day--outside-month {
    color: #151229;
    opacity: 0.6;
  }
  .react-datepicker__day {
    padding: 12px 32px 12px 20px;
    margin: auto;
    font-size: 1.5rem;
    &:hover {
      background-color: ${({ theme }) => theme.colors.tertiary} !important;
      color: white;
      border-radius: 50%;
    }
    @media ${device.mobileL} {
      padding: 12px 30px 12px 18px;
    }
  }
  .react-datepicker {
    background-color: #ffffff;
    z-index: 8;
    border-radius: 10px;
    padding: 0px 26px 20px 26px;
    border: none;
    @media ${device.mobileL} {
      padding: 0px 16px 20px 16px;
      width: 375px;
    }
  }
  .react-datepicker__day--selected {
    background-color: white;
    position: relative;
    z-index: 1;
    font-size: 1.5rem;
    background-color: ${({ theme }) => theme.colors.tertiary} !important;
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.tertiary};
    color: white;
    text-align: center;
    font-size: 1.5rem;
    border-radius: 50%;
    &:focus {
      outline: none;
    }
    &::before {
      content: '';
      position: absolute;
      background-color: ${({ theme }) => theme.colors.tertiary};
      text-align: center;
      z-index: -1;
    }
  }
  .react-datepicker__day-name {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.tertiary};
    padding: 12px 32px 12px 20px;
    margin: 0;
    @media ${device.mobileL} {
      padding: 12px 30px 12px 18px;
    }
  }
  .react-datepicker__navigation {
    top: 20px;
  }
  .react-datepicker__current-month {
    text-align: center;
    font-size: 1.5rem;
    color: black;
    margin-top: 13px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  .react-datepicker__navigation--previous {
    left: 34px;
    @media ${device.mobileL} {
      left: 24px;
    }
  }
  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.colors.tertiary} !important;
    border-width: 2px 2px 0 0;
  }
  .react-datepicker__navigation--next {
    right: 17px;
  }
  .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.colors.tertiary} !important;
    color: #101828 !important;
    border-radius: 0px !important;
    z-index: 5 !important;
    margin: 0 !important;
    color: white !important;
  }
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: ${({ theme }) => theme.colors.tertiary} !important;
    color: white !important;
    position: relative !important;
    z-index: 1 !important;
  }
  .react-datepicker__day--range-start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .react-datepicker__day--range-end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .react-datepicker__day--range-start::before,
  .react-datepicker__day--range-end::before {
    content: '';
    width: 28px;
    height: 28px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 0px;
    z-index: -1;
  }
  .react-datepicker__day--range-end::before {
    margin-left: 13px;
    transform: translate(-10px, -50%);
  }
  .react-datepicker__day--in-selecting-range {
    background-color: #dff9e5 !important;
    color: #101828;
    border-radius: 50% !important;
  }
`;

export default InlaneDateRangePicker;
