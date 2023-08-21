import { map } from "lodash";
import styled from "styled-components";
import { device } from "../../styles";

export interface ButtonGroupProps {
  options: any[];
  onChange: (option?: any) => void;
  isSelected: (option: any) => boolean;
  disabled?: boolean;
  className?: string;
  getOptionLabel?: (option: any) => string;
}

const NavButtonGroup = ({
  options,
  onChange,
  disabled,
  isSelected,
  className,
  getOptionLabel
}: ButtonGroupProps) => {
  return (
    <Container className={className}>
      {map(options, (option, index) => (
        <StyledButton
          type="button"
          disabled={disabled || option?.disabled}
          key={`group-button${index}`}
          left={index === 0}
          right={index === options.length - 1}
          selected={isSelected(option)}
          onClick={() => (disabled ? {} : onChange(option))}
        >
          {getOptionLabel ? getOptionLabel(option) : option.name}
        </StyledButton>
      ))}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 4px;
  display: grid;
  width: 100%;
  padding: 4px;
  background-color: #edf1f2;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%/3, max(64px, 100%/5)), 1fr)
  );
  @media ${device.mobileS} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledButton = styled.button<{
  left: boolean;
  right: boolean;
  selected: boolean;
  disabled?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 12px;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 13px;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  :hover {
    opacity: ${({ disabled }) => (disabled ? 0.48 : 0.6)};
  }
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  box-shadow: ${({ selected }) =>
    selected ? "0px 3px 6px #00000029" : "none"};
  border-radius: ${({ selected }) => (selected ? "14px" : "0")};
  background-color: ${({ selected }) => (selected ? "white" : "#EDF1F2")};
  color: #121926;
  justify-content: center;
  border-width: 1px;
  border-top-left-radius: ${({ left }) => (left ? "4px" : 0)};
  border-bottom-left-radius: ${({ left }) => (left ? "4px" : 0)};
  border-top-right-radius: ${({ right }) => (right ? "4px" : 0)};
  border-bottom-right-radius: ${({ right }) => (right ? "4px" : 0)};
`;

export default NavButtonGroup;
