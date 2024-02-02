import { useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import styled from 'styled-components';
import FieldWrapper from './components/FieldWrapper';

export interface TextFieldProps {
  value?: string | number;
  name?: string;
  error?: string;
  showError?: boolean;
  label?: string;
  icon?: JSX.Element;
  className?: string;
  left?: JSX.Element;
  right?: JSX.Element;
  padding?: string;
  onChange: (props: any) => void;
  onClick?: () => void;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
}

const TextAreaField = (props: TextFieldProps) => {
  const {
    value,
    name,
    error,
    showError = true,
    label,
    className,
    onChange,
    onClick,
    rows = 5,
    placeholder,
    padding,
    disabled = false,
  } = props;

  const { width, ref } = useResizeDetector();

  useEffect(() => {
    if (rows * 20 < ref.current.scrollHeight) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [ref, value, width, rows]);

  return (
    <FieldWrapper
      onClick={onClick}
      padding={padding}
      className={className}
      label={label}
      error={error}
      showError={showError}
    >
      <InputContainer disabled={disabled} error={!!error}>
        <StyledTextArea
          aria-label={name}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          value={value}
          name={name}
          onChange={(e) => onChange && onChange(e.target.value || '')}
        />
      </InputContainer>
    </FieldWrapper>
  );
};

const InputContainer = styled.div<{ error: boolean; disabled: boolean }>`
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  display: flex;
  height: auto;
  overflow: hidden;
  justify-content: space-between;
  padding: 8px;
  box-sizing: border-box;
  background-color: white;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  border-radius: 4px;
  :focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => `${theme.colors.primary}33`};
  }
`;

const StyledTextArea = styled.textarea`
  border: none;
  font-size: 1.6rem;
  line-height: 2rem;
  width: 100%;
  overflow-y: hidden;
  resize: none;
  color: ${({ theme }) => theme.colors.label};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  background-color: transparent;
  :focus {
    outline: none;
  }
`;

export default TextAreaField;
