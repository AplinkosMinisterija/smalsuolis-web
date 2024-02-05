import { useState } from 'react';
import styled from 'styled-components';
export interface TextFieldProps {
  value?: string | number;
  name?: string;
  error?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onChange?: (option?: any) => void;
  disabled?: boolean;
  height?: number;
  readOnly?: boolean;
  onInputClick?: () => void;
  placeholder?: string;
  type?: string;
  selectedValue?: boolean;
  onBlur?: () => void;
  testId?: string;
}

const TextFieldInput = ({
  value,
  name,
  error,
  readOnly = false,
  leftIcon,
  onBlur,
  rightIcon,
  onChange,
  placeholder,
  type = 'text',
  disabled,
  height,
  selectedValue = false,
  onInputClick,
  testId,
  ...rest
}: TextFieldProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [delayHandler, setDelayHandler] = useState<any>(null);
  const canShowTooltip = disabled && (value || selectedValue);

  const handleMouseEnter = () => {
    if (!canShowTooltip) return;

    setShowTooltip(true);
    clearTimeout(delayHandler);
  };

  const handleMouseLeave = () => {
    if (!canShowTooltip) return;

    setDelayHandler(
      setTimeout(() => {
        setShowTooltip(false);
      }, 500),
    );

    clearTimeout(delayHandler);
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <InputContainer
        error={!!error}
        height={height || 40}
        onBlur={onBlur}
        disabled={disabled || false}
      >
        {leftIcon}
        <TextInput
          aria-label={name}
          selectedValue={selectedValue}
          onClick={() => (onInputClick ? onInputClick() : null)}
          readOnly={readOnly}
          type={type}
          name={name}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange && onChange(e?.target?.value || '')}
          placeholder={placeholder}
          disabled={disabled}
          data-testid={testId}
          {...rest}
        />
        {rightIcon}
      </InputContainer>
      {showTooltip && <TooltipBox>{value || placeholder}</TooltipBox>}
    </Container>
  );
};

export const TooltipBox = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  z-index: 1111;
  left: -5px;
  color: transparent;
  background-color: transparent;
  padding: 4px 4px;
  max-width: 100%;
  border-radius: 4px;
  word-break: break-all;
  opacity: 1 !important;
  &:before {
    content: '';
    z-index: 38;
    width: 0;
    height: 0;
    left: 3px;
    top: -4px;
    position: absolute;
    border: 5px solid transparent;
    transform: rotate(135deg);
  }

  display: block;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 4px 4px;
  &:before {
    border-color: transparent transparent rgba(0, 0, 0, 0.8) rgba(0, 0, 0, 0.8);
  }
`;

export const Container = styled.div`
  position: relative;
`;

const InputContainer = styled.div<{
  error: boolean;
  height: number;
  disabled: boolean;
}>`
  display: flex;
  height: ${({ height }) => (height ? `${height}px` : `40px`)};
  background-color: white;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  :focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => `${theme.colors.primary}33`};
  }

  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
`;

const TextInput = styled.input<{ readOnly: boolean; selectedValue: boolean }>`
  border: none;
  padding: 0 12px;
  width: 100%;
  height: 100%;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};

  background-color: white;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.label};

  &:focus {
    outline: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-input-placeholder {
    color: ${({ theme, selectedValue }) => theme.colors.label + `${!selectedValue ? '8F' : ''}`};
  }
  ::-moz-placeholder {
    color: ${({ theme, selectedValue }) => theme.colors.label + `${!selectedValue ? '8F' : ''}`};
  }
  ::-ms-placeholder {
    color: ${({ theme, selectedValue }) => theme.colors.label + `${!selectedValue ? '8F' : ''}`};
  }
  ::placeholder {
    color: ${({ theme, selectedValue }) => theme.colors.label + `${!selectedValue ? '8F' : ''}`};
  }
`;

export default TextFieldInput;
