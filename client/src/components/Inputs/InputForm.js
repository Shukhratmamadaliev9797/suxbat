import React from "react";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";
import { Input, Alert, Space, Radio } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function InputForm({
  placeholder,
  passwordType,
  radioType,
  label,
  radioName,
  textarea,
  rows,
  ...props
}) {
  const [field, meta] = useField(props);
  const { TextArea } = Input;
  const tablet = useMediaQuery({
    query: "(max-width: 992px)",
  });
  return (
    <Space direction="vertical" style={{ display: "flex" }} size="medium">
      <div className="input__label">
        {label ? <label htmlFor="email">{label}</label> : ""}
      </div>
      {passwordType ? (
        <div className="input__input">
          <Input.Password
            status={meta.touched && meta.error && "error"}
            name={field.name}
            type={field.type}
            placeholder={placeholder}
            autoComplete="new-password"
            size={tablet ? "middle" : "large"}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            {...field}
            {...props}
          />
        </div>
      ) : radioType ? (
        <div className="input__radio">
          <Radio
            name={field.name}
            type={field.type}
            placeholder={placeholder}
            {...field}
            {...props}
          >
            {radioName}
          </Radio>
        </div>
      ) : textarea ? (
        <div className="input__input">
          <TextArea
            status={meta.touched && meta.error && "error"}
            name={field.name}
            showCount
            rows={rows}
            maxLength={150}
            placeholder={placeholder}
            {...field}
            {...props}
          />
        </div>
      ) : (
        <div className="input__input">
          <Input
            status={meta.touched && meta.error && "error"}
            name={field.name}
            type={field.type}
            placeholder={placeholder}
            size={tablet ? "middle" : "large"}
            autoComplete="false"
            {...field}
            {...props}
          />
        </div>
      )}
      {meta.touched && meta.error && (
        <Alert
          message={<ErrorMessage name={field.name} />}
          type="error"
          showIcon
        />
      )}
    </Space>
  );
}
