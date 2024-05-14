import React from 'react';
import HeadlessItemPicker, {
  HeadlessItemPickerProps,
  HeadlessItemT,
  RenderItemProps,
} from './HeadlessItemPicker';
import styled from 'styled-components';

export interface FilterItem {
  name: string;
}

export type FilterPickerProps = Omit<HeadlessItemPickerProps<FilterItem>, 'renderItem'>;

export type PodcastPickerProps<T extends FilterItem = FilterItem> = Omit<
  HeadlessItemPickerProps<T>,
  'renderItem' | 'contentContainerStyle'
>;

const FilterPicker = <T extends FilterItem = FilterItem>(props: PodcastPickerProps<T>) => {
  const renderItem = (item: RenderItemProps<T>) => {
    const { name } = item.item;
    const { isActive, onClick } = item;
    return (
      <FilterPickerItem key={props.getItemKey(item.item)} $isActive={isActive} onClick={onClick}>
        <FilterPickerItemText>{name}</FilterPickerItemText>
      </FilterPickerItem>
    );
  };

  return (
    <FilterPickerWrapper>
      <HeadlessItemPicker {...props} renderItem={renderItem} />
    </FilterPickerWrapper>
  );
};

const FilterPickerWrapper = styled.div`
  display: flex;
  justify-content: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterPickerItem = styled.div<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) => ($isActive ? '#DFF9E5' : '#F7F7F7')};
  border: 1px solid ${({ $isActive }) => ($isActive ? '#73DC8C' : 'transparent')};
  border-radius: 200px;
  padding: 11px 12px;
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  opacity: 1;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  &:hover,
  &:focus {
    cursor: pointer;
  }
  color: ${({ $isActive }) => ($isActive ? '#1B4C28' : '#4B5768')};
`;

const FilterPickerItemText = styled.div`
  font-size: 1.4rem;
`;

export default FilterPicker;
