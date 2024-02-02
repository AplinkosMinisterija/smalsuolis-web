import styled from 'styled-components';
import Icon from './Icons';

interface ActionCardProps {
  icon: string;
  text: string | JSX.Element;
  onClick: () => void;
}

const ActionCard = ({ icon, text, onClick }: ActionCardProps) => (
  <Container onClick={onClick}>
    <StyledIcon name={icon} />
    <StyledText>{text}</StyledText>
  </Container>
);

const StyledIcon = styled(Icon)`
  font-size: 2.5rem;
  color: #0a196f;
`;

const StyledText = styled.span`
  font-size: 1.4rem;
  color: #595e66;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  padding: 12.5px 20px;
  background: #f5f5f5 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  text-align: center;
`;

export default ActionCard;
