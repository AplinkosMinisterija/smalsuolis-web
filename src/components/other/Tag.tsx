import styled from 'styled-components';

const Tag = ({
  text,
  backgroundColor = '#E8F9EC',
  color = '#14532d',
  icon,
  onClick,
}: {
  text: string;
  backgroundColor?: string;
  color?: string;
  icon?: any;
  onClick?: () => void;
}) => {
  return (
    <Container onClick={onClick} $color={color} $backgroundColor={backgroundColor}>
      {icon}
      <Text>{text}</Text>
    </Container>
  );
};
const Container = styled.div<{ $color: string; $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 17px;
  padding: 4px 24px;
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  opacity: 1;
  gap: 4px;
  cursor: pointer;
  color: ${({ $color }) => $color};
`;

const Text = styled.div`
  font-size: 1.4rem;
`;

export default Tag;
