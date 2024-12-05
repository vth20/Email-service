import { Form } from "antd";
import { useController, useFormContext, FieldValues, ControllerProps } from "react-hook-form";
import { styled } from "styled-components";

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
  }

  .ant-form-item-label {
    font-size: 14px;
    overflow: unset;
    white-space: unset;

    .ant-form-item-no-colon {
      height: 100%;
    }
  }

  .inputText {
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
  }

  .inputText:focus {
    border-color: #40a9ff;
    outline: none;
  }
`;

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
`;

type FormInputProps<T extends FieldValues> = {
  label?: string; // Optional label for the input
  type?: string; // Type of the input (e.g., "text", "password", etc.)
  name: ControllerProps<T>["name"]; // Name of the field, strongly typed to match form fields
  rules?: ControllerProps<T>["rules"]; // Validation rules from React Hook Form
  placeholder?: string; // Placeholder text
  defaultValue?: string; // Default value for the field
  // deno-lint-ignore no-explicit-any
  wrapperProps?: Record<string, any>; // Props for the AntD `Form.Item` wrapper
} & React.InputHTMLAttributes<HTMLInputElement>; // Add default input attributes

const FormInput = <T extends FieldValues>({
  label,
  type = "text",
  name,
  rules,
  placeholder = "",
  defaultValue = "",
  wrapperProps,
  ...rest
}: FormInputProps<T>) => {
  const { control } = useFormContext(); // Access React Hook Form context
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={error ? "error" : ""}
      help={error?.message}
    >
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className="inputText"
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? ""} // Ensure value is not undefined
        {...rest}
      />
    </WrapperFormItem>
  );
};

export default FormInput;
