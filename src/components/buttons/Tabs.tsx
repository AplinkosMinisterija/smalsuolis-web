import styled from 'styled-components';
interface SwitchButtonProps {
  options: any[];
  onChange: (value: any) => void;
  value: any;
  className?: string;
}
const Tabs = ({ options, onChange, value, className = '' }: SwitchButtonProps) => {
  return (
    <Container className={className}>
      <Content $numberOfColumns={options.length}>
        {options.map((option: any, index: number) => (
          <Button
            key={`switch_btn_${index}`}
            onClick={() => onChange(option.value)}
            $selected={option.value === value}
          >
            {option.label}
          </Button>
        ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 32px 0;
`;

const Content = styled.div<{ $numberOfColumns?: number }>`
  display: grid;

  grid-template-columns: repeat(${({ $numberOfColumns }) => $numberOfColumns}, 1fr);

  background-color: ${({ theme }) => theme.colors.cardBackground.primary};
  padding: 4px;
  border-radius: 99px;
`;

const Button = styled.div<{ $selected: boolean }>`
  display: flex;
  background-color: ${({ $selected }) => ($selected ? 'rgb(20, 83, 45)' : 'transparent')};
  color: ${({ $selected, theme }) => ($selected ? 'white' : theme.colors.text.primary)};
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  border-radius: 99px;
  cursor: pointer;
`;

export default Tabs;
