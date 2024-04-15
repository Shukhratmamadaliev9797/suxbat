import React from "react";
import { Select, Space } from "antd";
import { useField } from "formik";
import { useMediaQuery } from "react-responsive";

export default function SelectForm({
  label,
  values,
  handleChange,
  placeholder,
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  const tablet = useMediaQuery({
    query: "(max-width: 992px)",
  });
  const handleSelectChange = (value) => {
    helpers.setValue(value); // Manually update formik field value
    handleChange({ target: { name: props.name, value: value } }); // Notify parent component
  };

  return (
    <Space direction="vertical" style={{ display: "flex" }}>
      {label && <label>{label}</label>}
      <Select
        className="input__input"
        placeholder={placeholder}
        defaultValue={field.value} // Use formik field value as default
        style={{ width: "100%" }}
        options={values?.map((value) => {
          return { value: value, label: value };
        })}
        onChange={handleSelectChange} // Use custom onChange handler
        size={tablet ? "middle" : "large"}
      />
    </Space>
  );
}
