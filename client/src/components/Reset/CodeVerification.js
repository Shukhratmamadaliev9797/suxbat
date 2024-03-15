import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputForm from "../Inputs/InputForm";
import { Space } from "antd";
import PrButton from "../Buttons/PrButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateResetCode } from "../../actions/emailAction";

export default function CodeVerification({ code, setCode, email, loading }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const codeValidation = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min("5", "Code must be 5 characters.")
      .max("5", "Code must be 5 characters."),
  });
  const validateCode = () => {
    dispatch(validateResetCode(email, code));
  };
  return (
    <>
      <div className="reset__box-header">
        <h4>Code Verification</h4>
      </div>
      <div className="reset__box-body">
        <Formik
          enableReinitialize
          initialValues={{ code }}
          validationSchema={codeValidation}
          onSubmit={validateCode}
        >
          {(formik) => {
            return (
              <Form>
                <div className="reset__box-body-input">
                  <InputForm
                    label="Please enter code that has been sent to your email"
                    type="number"
                    name="code"
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Code"
                  />
                </div>

                <Space className="reset__box-body-action">
                  <PrButton onClick={() => navigate("/login")}>Cancel</PrButton>
                  <PrButton type="primary" htmlType="submit" loading={loading}>
                    Continue
                  </PrButton>
                </Space>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
