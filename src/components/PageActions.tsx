import styled from 'styled-components';
import { IconName, useWindowSize } from '../utils';
import React from 'react';
import Icon from './other/Icons';
import { device } from '../styles';
import { useNavigate } from 'react-router-dom';

const PageActions = ({
  onGoBack,
  action,
}: {
  onGoBack: () => void;
  action?: { icon: IconName; label: string; destructive: boolean; onClick: () => void };
}) => {
  return (
    <ActionsContainer>
      <Action onClick={onGoBack}>
        <StyledIcon name={IconName.back} />
        <ActionLabel>Grįžti atgal</ActionLabel>
      </Action>

      {action ? (
        <Action $destructive={action.destructive} onClick={action.onClick}>
          <StyledIcon name={action.icon} />
          <ActionLabel>{action.label}</ActionLabel>
        </Action>
      ) : null}
    </ActionsContainer>
  );
};

export default PageActions;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Action = styled.div<{ $destructive?: boolean }>`
  color: ${({ theme, $destructive }) => ($destructive ? theme.colors.error : '#1f5c2e')};
  font-size: 1.6rem;
  font-weight: 500;
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 20px 0 8px 0;
  margin-left: ${({ $destructive }) => ($destructive ? 'auto' : 0)};
`;

const StyledIcon = styled(Icon)`
  margin-right: 4px;
`;

const ActionLabel = styled.div``;
