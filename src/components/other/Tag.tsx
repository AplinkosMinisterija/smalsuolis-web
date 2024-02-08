import styled from 'styled-components';

const Tag = ({
  text,
  color = '#E8F9EC',
  icon,
  onClick,
}: {
  text: string;
  color?: string;
  icon?: any;
  onClick?: () => void;
}) => {
  console.log(text, 'text');
  return (
    <Container onClick={onClick} color={color}>
      {icon}
      <Text>{text}</Text>
    </Container>
  );
};
const Container = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: 17px;
  padding: 4px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  gap: 4px;
  cursor: pointer;
  color: #14532d;
`;

const Text = styled.div`
  font-size: 1.4rem;
`;

export default Tag;
