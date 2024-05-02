import React from 'react';
import ItemPicker, { ItemPickerProps, ItemT, RenderItemProps } from './ItemPicker';
import styled from 'styled-components';

export interface FilterItem extends ItemT {
  text: string;
}

export type FilterPickerProps = Omit<ItemPickerProps<FilterItem>, 'renderItem'>;

const FilterPicker = (props: FilterPickerProps) => {
  const renderItem = (item: RenderItemProps<FilterItem>) => {
    const { text, key } = item.item;
    const { isActive, onClick } = item;
    return (
      <Container key={key} isActive={isActive} onClick={onClick}>
        <Text>{text}</Text>
      </Container>
    );
  };

  return (
    <Wrapper>
      <ItemPicker {...props} renderItem={renderItem} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const Container = styled.div<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#DFF9E5' : '#F7F7F7')};
  border: 1px solid ${({ isActive }) => (isActive ? '#73DC8C' : 'transparent')};
  border-radius: 200px;
  padding: 11px 12px;
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  opacity: 1;
  gap: 6px;
  cursor: pointer;
  &:hover,
  &:focus {
    cursor: pointer;
  }
  color: ${({ isActive }) => (isActive ? '#1B4C28' : '#4B5768')};
`;

const Text = styled.div`
  font-size: 1.4rem;
`;

export default FilterPicker;
