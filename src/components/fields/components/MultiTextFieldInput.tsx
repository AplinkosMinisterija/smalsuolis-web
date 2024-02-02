import { isEmpty } from 'lodash';
import { useRef } from 'react';
import styled from 'styled-components';
import Icon from '../../other/Icons';
export interface MultiTextFieldProps {
  values: any[];
  error?: string;
  name?: string;
  className?: string;
  onRemove: ({ value, index }: any) => void;
  disabled?: boolean;
  handleInputChange: (event: any) => void;
  getOptionLabel: (option: any) => string;
  handleKeyDown?: (event: any) => void;
  placeholder?: string;
  input: string;
  backgroundColor?: string;
}

const MultiTextField = ({
  values = [],
  backgroundColor,
  error,
  name,
  handleInputChange,
  getOptionLabel,
  onRemove,
  handleKeyDown,
  placeholder = '',
  input,
  disabled,
}: MultiTextFieldProps) => {
  const inputRef = useRef<any>(null);

  const handleClick = () => {
    if (!inputRef?.current) return;

    inputRef?.current?.focus();
  };

  return (
    <InputContainer
      className="inputContainer"
      hasBorder={true}
      backgroundColor={backgroundColor || '#ffffff'}
      readOnly={false}
      error={!!error}
      disabled={disabled || false}
      onClick={handleClick}
    >
      <InnerContainer>
        {values?.map((value: any, index) => (
          <SimpleCard key={value + index} disabled={!!disabled}>
            <Name>{getOptionLabel(value)}</Name>
            <IconContainer
              onClick={(e) => {
                e.stopPropagation();
                if (disabled) return;

                onRemove({ value, index });
              }}
            >
              <StyledCloseIcon name="close" />
            </IconContainer>
          </SimpleCard>
        ))}

        {!disabled && (
          <Input
            aria-label={name}
            ref={inputRef}
            placeholder={isEmpty(values) ? placeholder : ''}
            disabled={disabled}
            value={input}
            name={name}
            onChange={(e) => handleInputChange(e?.target?.value)}
            onKeyDown={handleKeyDown}
          />
        )}
      </InnerContainer>
      <DropdownIconContainer>
        <StyledIcons name="dropdownArrow" />
      </DropdownIconContainer>
    </InputContainer>
  );
};

const InputContainer = styled.div<{
  error: boolean;
  readOnly: boolean;
  disabled: boolean;
  hasBorder: boolean;
  backgroundColor: string;
}>`
  ${({ hasBorder, error, theme }) =>
    hasBorder
      ? `
   border: 1px solid
    ${error ? theme.colors.error : theme.colors.border};
  `
      : null}
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  padding: 4px 12px 4px 4px;
  min-height: 40px;
  overflow: hidden;
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  :focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => `${theme.colors.primary}33`};
  }

  width: 100%;
`;

const Input = styled.input`
  border: none;
  display: inline-block;
  min-width: 50px;
  width: 100%;
  height: 100%;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  flex: 1;
  background-color: transparent;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.label};
  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.label + '8F'};
  }
  ::-moz-placeholder {
    color: ${({ theme }) => theme.colors.label + '8F'};
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.label + '8F'};
  }
  :focus {
    outline: none;
  }
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
`;

const StyledCloseIcon = styled(Icon)`
  font-size: 1rem;
  color: black;
`;

const IconContainer = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SimpleCard = styled.label<{ disabled: boolean }>`
  border-radius: 2px;
  color: rgb(51, 51, 51);
  background-color: rgb(230, 230, 230);
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  padding: 3px 3px 3px 6px;
  margin: 2px;
`;

const Name = styled.div`
  font-size: 1.4rem;
`;

const StyledIcons = styled(Icon)`
  color: #cdd5df;
  font-size: 2.4rem;
`;
const DropdownIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MultiTextField;
