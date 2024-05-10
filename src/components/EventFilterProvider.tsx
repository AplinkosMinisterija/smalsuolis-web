import { createContext } from 'react';
import { App, formatDateAndTime, formatDateFrom, formatDateTo, formatToZonedDate } from '../utils';
import { subWeeks, subMonths } from 'date-fns/fp';
import { flow } from 'lodash';
import { useStorage } from '@aplinkosministerija/design-system';

enum TimeRanges {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  FUTURE = 'FUTURE',
}

export interface TimeRangeItem {
  key: TimeRanges;
  query: any;
  name: string;
}

const timeRangeQuery = {
  [TimeRanges.FUTURE]: {
    $gte: flow(formatToZonedDate, formatDateAndTime)(new Date()),
  },
  [TimeRanges.DAY]: {
    $gte: flow(formatDateFrom, formatDateAndTime)(new Date()),
    $lt: flow(formatDateTo, formatDateAndTime)(new Date()),
  },
  [TimeRanges.WEEK]: {
    $gte: flow(formatDateFrom, subWeeks(1), formatDateAndTime)(new Date()),
    $lt: flow(formatDateTo, formatDateAndTime)(new Date()),
  },
  [TimeRanges.MONTH]: {
    $gte: flow(formatDateFrom, subMonths(1), formatDateAndTime)(new Date()),
    $lt: flow(formatDateTo, formatDateAndTime)(new Date()),
  },
};

const timeRangeItems: TimeRangeItem[] = [
  {
    key: TimeRanges.DAY,
    query: timeRangeQuery[TimeRanges.DAY],
    name: 'Šios dienos',
  },
  {
    key: TimeRanges.WEEK,
    query: timeRangeQuery[TimeRanges.WEEK],
    name: 'Šios savaitės',
  },
  {
    key: TimeRanges.MONTH,
    query: timeRangeQuery[TimeRanges.MONTH],
    name: 'Šio mėnesio',
  },
  {
    key: TimeRanges.FUTURE,
    query: timeRangeQuery[TimeRanges.FUTURE],
    name: 'Būsimi',
  },
];

interface Filters {
  apps?: App[];
  timeRange?: TimeRangeItem;
}

export type EventFilterContextType = {
  timeRangeItems: TimeRangeItem[];
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
  filters: Filters;
};

const defaultValue: EventFilterContextType = {
  timeRangeItems,
  setFilters: () => {},
  resetFilters: () => {},
  filters: {},
};

export const EventFilterContext: any = createContext<EventFilterContextType>(defaultValue);

export const EventFilterProvider = ({ children }: any) => {
  const filterStorage = useStorage<Filters>('filters', {}, true);

  return (
    <EventFilterContext.Provider
      value={{
        timeRangeItems,
        filters: filterStorage.value,
        setFilters: filterStorage.setValue,
        resetFilters: filterStorage.resetValue,
      }}
    >
      {children}
    </EventFilterContext.Provider>
  );
};
