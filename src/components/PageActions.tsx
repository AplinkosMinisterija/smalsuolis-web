import styled from 'styled-components';
import { IconName, useWindowSize } from '../utils';
import React from 'react';
import Icon from './other/Icons';
import { device } from '../styles';
import { useNavigate } from 'react-router-dom';

const PageActions = ({
  action,
  children,
}: {
  action?: { icon: IconName; label: string; destructive: boolean; onClick: () => void };
  children: any;
}) => {
  const navigate = useNavigate();
  const isMobile = useWindowSize(device.mobileL);

  return (
    <div>
      <ActionsContainer>
        {!isMobile && (
          <Action onClick={() => navigate(-1)}>
            <GoBackIcon name={IconName.back} />
            <ActionLabel>Grįžti atgal</ActionLabel>
          </Action>
        )}
        {action && (
          <Action $destructive={action.destructive} onClick={action.onClick}>
            <DeleteIcon name={action.icon} />
            <ActionLabel>{action.label}</ActionLabel>
          </Action>
        )}
      </ActionsContainer>
      {children}
    </div>
  );
};

export default PageActions;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media ${device.mobileL} {
    padding: 0 16px;
  }
`;

const Action = styled.div<{ $destructive?: boolean }>`
  color: ${({ theme, $destructive }) => ($destructive ? theme.colors.error : '#1f5c2e')};
  font-size: 1.4rem;
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 16px 0;
  margin-left: ${({ $destructive }) => ($destructive ? 'auto' : 0)};
`;

const GoBackIcon = styled(Icon)`
  margin-right: 8px;
`;

const DeleteIcon = styled(Icon)`
  margin-right: 8px;
`;

const ActionLabel = styled.div``;
