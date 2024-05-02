import React from 'react';

export interface ItemT {
  key: string;
}

export interface RenderItemProps<T> {
  item: T;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

export interface ItemPickerProps<T extends ItemT> {
  className?: string;
  data: Array<T>;
  selectedItems: Array<T>;
  setSelectedItems: (items: Array<T>) => void;
  renderItem: (props: RenderItemProps<T>) => React.ReactNode;
  allowMultipleSelection?: boolean;
}

// reusable headless component yra yra nera bus
const ItemPicker = <T extends ItemT>({
  data,
  renderItem,
  selectedItems,
  setSelectedItems,
  allowMultipleSelection = false,
}: ItemPickerProps<T>) => {
  const onItemPress = (item: T) => {
    if (allowMultipleSelection) {
      const foundSelectedIndex = selectedItems.findIndex((selected) => {
        return selected.key === item.key;
      });
      const newSelected = [...selectedItems];
      if (foundSelectedIndex !== -1) {
        newSelected.splice(foundSelectedIndex, 1);
        setSelectedItems(newSelected);
      } else {
        newSelected.push(item);
        setSelectedItems(newSelected);
      }
    } else {
      setSelectedItems([item]);
    }
  };

  const renderPickerItem = ({ item, index }) => {
    const isActive = !!selectedItems.find((selected) => selected.key === item.key);

    return renderItem({ item, isActive, index, onClick: () => onItemPress(item) });
  };

  return <>{data.map((item, index) => renderPickerItem({ item, index }))}</>;
};

export default ItemPicker;
