import styled from 'styled-components';
import Icon from '../Icons';
import { IconName } from '../../utils';
interface MenuButtonProps {
  label: string;
  icon?: string;
  onClick: () => void;
  isActive?: boolean;
}
const MenuButton = ({ label, icon, onClick, isActive = false }: MenuButtonProps) => {
  //TODO: disable option
  return (
    <Container $isActive={isActive} onClick={onClick}>
      <IconContainer>{icon ? <StyledIcon name={icon} /> : null}</IconContainer>
      {label}
      <Icon name={IconName.right} />
    </Container>
  );
};

const Container = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  grid-template-columns: 48px 1fr 32px;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.largeButton.GREY};
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: grid;
  text-decoration: none;
  gap: 12px;

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    background-color: #f5f6fe;
    border: 1px solid ${theme.colors.primary};
  `};

  &:hover {
    background-color: #f5f6fe;
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;
const IconContainer = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledIcon = styled(Icon)``;

export default MenuButton;
