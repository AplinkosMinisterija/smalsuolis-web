import FieldWrapper from "./components/FieldWrapper";
import MultiTextField from "./components/MultiTextFieldInput";
import OptionsContainer from "./components/OptionsContainer";
import { filterSelectedOptions, handleRemove } from "./utils/functions";
import { useAsyncSelectData } from "./utils/hooks";

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
  onChange: (option: any) => void;
  disabled?: boolean;
  getOptionLabel: (option: any) => string;
  getOptionValue?: (option: any) => any;
  loadOptions: (search: string, page: any) => any;
  optionsKey?: string;
}

const AsyncMultiSelect = ({
  label,
  values = [],
  error,
  onChange,
  disabled = false,
  getOptionLabel,
  optionsKey = "rows",
  getOptionValue = (option) => option.id,
  loadOptions
}: SelectFieldProps) => {
  const {
    loading,
    observerRef,
    suggestions,
    handleInputChange,
    handleToggleSelect,
    input,
    showSelect,
    handleBlur,
    handleClick
  } = useAsyncSelectData({
    loadOptions,
    disabled,
    optionsKey,
    onChange: (option: any) => onChange([...values, option])
  });

  return (
    <FieldWrapper
      onClick={handleToggleSelect}
      label={label}
      error={error}
      handleBlur={handleBlur}
    >
      <MultiTextField
        values={values}
        onRemove={({ index }) => {
          handleRemove(index, onChange, values);
        }}
        input={input}
        error={error}
        disabled={disabled}
        handleInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
      />
      <OptionsContainer
        values={filterSelectedOptions(suggestions, values, getOptionValue)}
        getOptionLabel={getOptionLabel}
        loading={loading}
        showSelect={showSelect}
        handleClick={handleClick}
        observerRef={observerRef}
      />
    </FieldWrapper>
  );
};

export default AsyncMultiSelect;
