import styled from "styled-components";

const Tag = ({
  text,
  color = "#9cd323",
  icon,
  onClick
}: {
  text: string;
  color?: string;
  icon?: any;
  onClick?: () => void;
}) => (
  <Container onClick={onClick} color={color}>
    {icon}
    <Text>{text}</Text>
  </Container>
);
const Container = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: 17px;
  padding: 3px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 1.4rem;
  color: #0f1a00;
`;

export default Tag;
