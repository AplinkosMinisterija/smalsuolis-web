import styled from 'styled-components';
import Icon from '../other/Icons';
import FieldWrapper from './components/FieldWrapper';
import OptionsContainer from './components/OptionsContainer';
import TextFieldInput from './components/TextFieldInput';
import { useAsyncSelectData } from './utils/hooks';

export interface AsyncSelectFieldProps {
  id?: string;
  name?: string;
  label?: string;
  value?: any;
  error?: string;
  showError?: boolean;
  editable?: boolean;
  left?: JSX.Element;
  handleLogs?: (data: any) => void;
  right?: JSX.Element;
  padding?: string;
  onChange: (option: any) => void;
  disabled?: boolean;
  getOptionLabel: (option: any) => string;
  getInputLabel?: (option: any) => string;
  className?: string;
  placeholder?: string;
  backgroundColor?: string;
  hasBorder?: boolean;
  loadOptions: (input: any, page: string, id?: any) => any;
  dependantId?: string;
  optionsKey?: string;
}

const AsyncSelectField = ({
  label,
  value,
  name,
  error,
  hasBorder,
  showError = true,
  editable = true,
  className,
  left,
  right,
  padding,
  onChange,
  handleLogs,
  disabled = false,
  backgroundColor,
  getOptionLabel,
  optionsKey = 'rows',
  loadOptions,
  dependantId,
  ...rest
}: AsyncSelectFieldProps) => {
  const {
    loading,
    observerRef,
    suggestions,
    handleInputChange,
    handleToggleSelect,
    input,
    showSelect,
    handleBlur,
    handleClick,
  } = useAsyncSelectData({
    loadOptions,
    name,
    optionsKey,
    disabled,
    onChange,
  });

  return (
    <FieldWrapper
      onClick={handleToggleSelect}
      handleBlur={handleBlur}
      padding={padding}
      className={className}
      label={label}
      error={error}
      showError={showError}
    >
      <TextFieldInput
        value={input}
        name={name}
        error={error}
        leftIcon={left}
        rightIcon={<StyledIcon name={'dropdownArrow'} />}
        onChange={handleInputChange}
        disabled={disabled}
        placeholder={(value && getOptionLabel(value)) || 'Pasirinkite'}
        selectedValue={value}
      />

      <OptionsContainer
        loading={loading}
        observerRef={observerRef}
        values={suggestions}
        getOptionLabel={getOptionLabel}
        showSelect={showSelect}
        handleClick={handleClick}
      />
    </FieldWrapper>
  );
};

const StyledIcon = styled(Icon)`
  color: #cdd5df;
  font-size: 2.4rem;
  margin-right: 12px;
`;

export default AsyncSelectField;
