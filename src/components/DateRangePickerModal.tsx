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

const DateRangePickerModal = ({
  onDateChange,
  endDate,
  startDate,
  setOpen,
}: DateRangePickerProps) => {
  const isMobile = useWindowSize(device.mobileL);
  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  const getDayClass = (date) => {
    if (startDate && endDate) {
      if (date.getTime() === startDate.getTime()) {
        return 'start-day';
      }
      if (date.getTime() === endDate.getTime()) {
        return 'end-day';
      }
    }
    return '';
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
          dayClassName={(date) => getDayClass(date)}
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
    background-color: white !important;
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
    &:focus {
      outline: none;
    }
    padding: 12px 34px 12px 22px;
    margin: auto;
    font-size: 1.5rem;
    &:hover {
      background-color: ${({ theme }) => theme.colors.tertiary} !important;
      color: white;
      border-radius: 50%;
    }
  }
  .react-datepicker {
    position: absolute;
    top: 5px;
    z-index: 8;
    background-color: #ffffff;
    box-shadow: 0px 2px 16px #121a5529;
    border-radius: 10px;
    padding: 0px 26px 20px 26px;
    border: none;
    @media ${device.mobileL} {
      padding: 0px 16px 20px 16px;
      width: 375px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    @media ${device.mobileM} {
      width: 364px;
    }
  }
  .react-datepicker__day--selected {
    position: relative;
    text-align: center;
    z-index: 1;
    font-size: 1.5rem;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.tertiary};
    color: white;
    text-align: center;
    font-size: 1.5rem;
    &::before {
      content: '';
      position: absolute;
      background-color: ${({ theme }) => theme.colors.tertiary};
      text-align: center;
      z-index: -1;
    }
  }
  .react-datepicker__day--selected::before {
    content: '';
    position: absolute;
    z-index: -1;
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
  @media ${device.mobileS} {
    .react-datepicker__day--selected::before {
      content: '';
      width: 30px;
      height: 30px;
    }
  }
  .react-datepicker__day-name {
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 0px;
    color: #151229;
    padding: 12px 26px 16px 26px;
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
    color: black;
    margin-top: 13px;
    margin-bottom: 13px;
    text-transform: capitalize;
  }
  .react-datepicker__navigation--previous {
    left: 34px;
  }
  .react-datepicker__navigation--next {
    right: 17px;
  }
  .react-datepicker__month-container {
    float: none;
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
  .react-datepicker__day--range-start::before {
    margin-left: 0px;
    transform: translate(1px, -50%);
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

export default DateRangePickerModal;
