import styled from "styled-components";
import Icon from "../other/Icons";
import FieldWrapper from "./components/FieldWrapper";
import OptionsContainer from "./components/OptionsContainer";
import TextFieldInput from "./components/TextFieldInput";
import { useSelectData } from "./utils/hooks";
import { inputLabels } from "../../utils/texts";

export interface SelectFieldProps {
  id?: string;
  name?: string;
  label?: string;
  value?: any;
  placeholder?: string;
  error?: string;
  showError?: boolean;
  options?: any[];
  left?: JSX.Element;
  padding?: string;
  onChange: (option: any) => void;
  disabled?: boolean;
  getOptionLabel: (option: any) => string;
  className?: string;
}

const SelectField = ({
  label,
  value,
  name,
  error,
  showError = true,
  options,
  className,
  left,
  padding,
  placeholder = inputLabels.chooseOption,
  getOptionLabel,
  onChange,
  disabled
}: SelectFieldProps) => {
  const {
    suggestions,
    input,
    handleToggleSelect,
    showSelect,
    handleBlur,
    handleClick,
    handleOnChange
  } = useSelectData({ options, disabled, onChange, getOptionLabel });

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
        rightIcon={<StyledIcon name={"dropdownArrow"} />}
        onChange={handleOnChange}
        disabled={disabled}
        placeholder={(value && getOptionLabel(value)) || placeholder}
        selectedValue={value}
      />
      <OptionsContainer
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

export default SelectField;
