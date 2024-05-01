import styled from 'styled-components';

const Tag = ({
  text,
  backgroundColor = 'white',
  textColor = 'inherit',
  icon,
  onClick,
}: {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  icon?: any;
  onClick?: () => void;
}) => {
  return (
    <Container onClick={onClick} $color={textColor} $backgroundColor={backgroundColor}>
      {icon}
      <Text>{text}</Text>
    </Container>
  );
};

const Container = styled.div<{ $color: string; $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 4px;
  padding: 4px 12px;
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  opacity: 1;
  gap: 6px;
  cursor: pointer;
  color: ${({ $color }) => $color};
`;

const Text = styled.div`
  font-size: 1.4rem;
`;

export default Tag;
