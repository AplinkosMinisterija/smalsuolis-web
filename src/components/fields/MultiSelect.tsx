import FieldWrapper from './components/FieldWrapper';
import MultiTextField from './components/MultiTextFieldInput';
import OptionsContainer from './components/OptionsContainer';
import { filterSelectedOptions, handleRemove } from './utils/functions';
import { useSelectData } from './utils/hooks';

export interface SelectOption {
  id?: string;
  label?: string;
  [key: string]: any;
}

export interface SelectFieldProps {
  id?: string;
  name?: string;
  label?: string;
  values?: any;
  error?: string;
  showError?: boolean;
  editable?: boolean;
  options: SelectOption[] | string[];
  left?: JSX.Element;
  right?: JSX.Element;
  padding?: string;
  onChange: (option: any) => void;
  handleLogs?: (data: any) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  backgroundColor?: string;
  hasBorder?: boolean;
  getOptionLabel?: (option: any) => string;
  getOptionValue?: (option: any) => any;
  isSearchable?: boolean;
}

const MultiSelect = ({
  label,
  values = [],
  error,
  options = [],
  onChange,
  disabled = false,
  getOptionLabel = (option) => option.label,
  getOptionValue = (option) => option.id,
}: SelectFieldProps) => {
  const {
    suggestions,
    input,
    handleToggleSelect,
    showSelect,
    handleBlur,
    handleClick,
    handleOnChange,
  } = useSelectData({
    options,
    disabled,
    onChange: (option: any) => onChange([...values, option]),
    getOptionLabel,
  });

  return (
    <FieldWrapper onClick={handleToggleSelect} label={label} error={error} handleBlur={handleBlur}>
      <MultiTextField
        values={values}
        input={input}
        error={error}
        onRemove={({ index }) => {
          handleRemove(index, onChange, values);
        }}
        disabled={disabled}
        handleInputChange={handleOnChange}
        getOptionLabel={getOptionLabel}
      />
      <OptionsContainer
        values={filterSelectedOptions(suggestions, values, getOptionValue)}
        getOptionLabel={getOptionLabel}
        showSelect={showSelect}
        handleClick={handleClick}
      />
    </FieldWrapper>
  );
};

export default MultiSelect;
