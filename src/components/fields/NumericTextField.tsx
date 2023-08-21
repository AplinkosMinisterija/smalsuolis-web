import FieldWrapper from "./components/FieldWrapper";
import TextFieldInput from "./components/TextFieldInput";

export interface NumericTextFieldProps {
  value?: string | number;
  name?: string;
  error?: string;
  showError?: boolean;
  label?: string;
  icon?: JSX.Element;
  className?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  padding?: string;
  onChange: (option: any) => void;
  ref?: HTMLHeadingElement;
  bottomLabel?: string;
  disabled?: boolean;
  height?: number;
  readOnly?: boolean;
  onInputClick?: () => void;
  placeholder?: string;
  wholeNumber?: boolean;
  secondLabel?: JSX.Element;
  subLabel?: string;
}

const NumericTextField = ({
  value,
  name,
  error,
  label,
  className,
  leftIcon,
  rightIcon,
  padding,
  onChange,
  placeholder,
  disabled,
  height,
  showError,
  wholeNumber = false,
  bottomLabel,
  onInputClick
}: NumericTextFieldProps) => {
  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      const inputValue = value?.toString();
      if (inputValue?.endsWith(".")) {
        onChange(inputValue.replaceAll(".", ""));
      }
    }
  };

  const handleChange = (input: string) => {
    const regex = wholeNumber
      ? /^[0-9]{0,16}$/
      : /^\d{0,100}$|(?=^.{1,10}$)^\d+[.,]\d{0,10}$/;

    if (regex.test(input)) onChange(input.replaceAll(",", "."));
  };

  return (
    <FieldWrapper
      handleBlur={handleBlur}
      padding={padding}
      className={className}
      bottomLabel={bottomLabel}
      label={label}
      error={error}
      showError={showError}
    >
      <TextFieldInput
        value={value}
        name={name}
        error={error}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onChange={handleChange}
        disabled={disabled}
        height={height}
        onInputClick={onInputClick}
        placeholder={placeholder}
      />
    </FieldWrapper>
  );
};

export default NumericTextField;
