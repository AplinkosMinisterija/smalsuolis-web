import styled from 'styled-components';
import { device } from '../styles';
import Icon from './Icons';
import { Button, Modal, useStorage } from '@aplinkosministerija/design-system';
import FilterPicker from './FilterPicker';
import { useContext, useEffect, useState } from 'react';
import {
  App,
  Filters,
  IconName,
  TimeRangeItem,
  buttonsTitles,
  subtitle,
  timeRangeItems,
} from '../utils';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { UserContext, UserContextType } from './UserProvider';

const EventFilterModal = ({ onClose, visible = false }: any) => {
  const { loggedIn } = useContext<UserContextType>(UserContext);
  const {
    value: filters,
    setValue: setFilters,
    resetValue: resetFilters,
  } = useStorage<Filters>('filters', {}, true);

  const [selectedApps, setSelectedApps] = useState<App[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRangeItem[]>([]);

  const { data: appsResponse } = useQuery({
    queryKey: ['apps'],
    queryFn: () => api.getApps({ page: 1 }),
    enabled: loggedIn,
  });
  const apps: App[] = appsResponse?.rows || [];

  const clearFilter = () => {
    resetFilters();
    onClose();
  };

  useEffect(() => {
    if (visible) {
      setSelectedApps(filters.apps || []);
      setSelectedTimeRange(filters.timeRange ? [filters.timeRange] : []);
    }
  }, [visible]);

  const onFilterClick = () => {
    setFilters({
      ...(selectedApps.length > 0 ? { apps: selectedApps } : null),
      ...(selectedTimeRange ? { timeRange: selectedTimeRange[0] } : null),
    });
    onClose();
  };

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
        {apps.length > 0 && (
          <FilterGroup>
            <Subtitle>{subtitle.category}</Subtitle>
            <FilterPicker
              allowMultipleSelection
              data={apps}
              selectedItems={selectedApps}
              setSelectedItems={(items) => setSelectedApps(items)}
            />
          </FilterGroup>
        )}

        <FilterGroup>
          <Subtitle>{subtitle.date}</Subtitle>
          <FilterPicker
            data={timeRangeItems}
            selectedItems={selectedTimeRange}
            setSelectedItems={(items) => setSelectedTimeRange(items)}
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
