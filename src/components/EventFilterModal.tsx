import styled from 'styled-components';
import { device } from '../styles';
import Icon from './Icons';
import { Button, Modal } from '@aplinkosministerija/design-system';
import FilterPicker, { FilterItem } from './FilterPicker';
import { useState } from 'react';
import { IconName, buttonsTitles, subtitle } from '../utils';

const category = [
  {
    key: '1',
    text: 'Statinio statyba',
  },
  {
    key: '2',
    text: 'Statinio griovimas',
  },
  {
    key: '3',
    text: 'Statinio remontas/rekonstravimas',
  },
  {
    key: '4',
    text: 'Statinio/patalpų paskirties keitimas',
  },
  {
    key: '5',
    text: 'Žuvinimas',
  },
];

const dates = [
  {
    key: '1',
    text: 'Šios dienos',
  },
  {
    key: '2',
    text: 'Šios savaitės',
  },
  {
    key: '3',
    text: 'Šio mėnesio',
  },
  {
    key: '4',
    text: 'Būsimi',
  },
];

const EventFilterModal = ({ onClose, visible = false }: any) => {
  const [selectedCategories, setSelectedCategories] = useState<FilterItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<FilterItem[]>([]);

  const clearFilter = () => {
    setSelectedCategories([]);
    setSelectedDate([]);
  };

  const onFilterClick = () => {};

  return (
    <Modal visible={visible} onClose={onClose}>
      <Container>
        <HeaderWrapper>
          <ClearFilterText onClick={clearFilter}>{buttonsTitles.clearFilter}</ClearFilterText>
          <IconContainer onClick={onClose}>
            <StyledIcon name={IconName.close} />
            <CloseText>{buttonsTitles.close}</CloseText>
          </IconContainer>
        </HeaderWrapper>
        <Title>{buttonsTitles.filter}</Title>

        <FilterGroup>
          <Subtitle>{subtitle.category}</Subtitle>
          <FilterPicker
            allowMultipleSelection
            data={category}
            selectedItems={selectedCategories}
            setSelectedItems={(items) => setSelectedCategories(items)}
          />
        </FilterGroup>

        <FilterGroup>
          <Subtitle>{subtitle.date}</Subtitle>
          <FilterPicker
            data={dates}
            selectedItems={selectedDate}
            setSelectedItems={(items) => setSelectedDate(items)}
          />
        </FilterGroup>
        <FilterButton onClick={onFilterClick}>{buttonsTitles.filter}</FilterButton>
      </Container>
    </Modal>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

const StyledIcon = styled(Icon)`
  font-size: 2.4rem;
`;

const Container = styled.div<{ width?: string; $backgroundImg?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: white;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin: auto;
  padding: 16px;
  ${({ $backgroundImg }) =>
    $backgroundImg
      ? ` background-image: url('/empty-bg.svg');
                background-repeat: no-repeat;
                background-position: 50%;
                background-size: cover;`
      : ''}

  @media ${device.desktop} {
    max-width: 700px;
    height: auto;
    overflow: initial;
    min-height: auto;
    padding: 40px;
    flex-basis: auto;
    border-radius: 16px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  opacity: 0.8;
  text-decoration: none;
`;

const Title = styled.div`
  font-family: Plus Jakarta Sans;
  font-size: 20px;
  font-weight: 700;
  line-height: 25.2px;
  text-align: left;
`;

const CloseText = styled.div`
  font-family: Plus Jakarta Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 20.16px;
  text-align: left;
`;

const ClearFilterText = styled.div`
  font-family: Plus Jakarta Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 20.16px;
  text-align: left;
  color: #1b4c28;
  text-decoration: underline;
  cursor: pointer;
`;

const Subtitle = styled.div`
  font-family: Plus Jakarta Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 20.16px;
  text-align: left;
`;

const FilterButton = styled(Button)`
  font-family: Plus Jakarta Sans;
  font-size: 18px;
  font-weight: 500;
  line-height: 22.68px;
`;

export default EventFilterModal;
