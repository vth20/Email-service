import { Form } from 'antd';
import { useController, useFormContext } from 'react-hook-form';
import {styled} from 'styled-components';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from 'react';

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

  .wrapper {
    position: relative;
    .inputText {
      width: 100%;
    }
    .eye-password {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
`;

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`;

const FormPassword = ({
  label,
  name,
  rules,
  placeholder = '',
  defaultValue = '',
  wrapperProps,
  ...rest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const { control } = useFormContext();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });
  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={error ? 'error' : ''}
      help={error?.message}>
      <div className="wrapper">
        <input
          id={name}
          type={isShowPassword ? 'password' : 'text'}
          placeholder={placeholder}
          className="inputText"
          onChange={onChange}
          value={value}
          {...rest}
        />
        {isShowPassword && (
          <EyeOutlined
            className="eye-password"
            onClick={() => setIsShowPassword(false)}
          />
        )}
        {!isShowPassword && (
          <EyeInvisibleOutlined
            className="eye-password"
            onClick={() => setIsShowPassword(true)}
          />
        )}
      </div>
    </WrapperFormItem>
  );
};

export default FormPassword;