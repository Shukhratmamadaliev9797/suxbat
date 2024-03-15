import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../../actions/userAction";
import InputForm from "../Inputs/InputForm";
import PrButton from "../Buttons/PrButton";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ChangePassword({
  email,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  setErrorPasswordMatch,
  loading,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetValidation = Yup.object({
    email: Yup.string()
      .required("You will need email to reset your password")
      .email("Enter a valid email address"),
  });

  const changedPassword = () => {
    if (password === confirmPassword) {
      dispatch(changePassword(email, password));
    } else {
      setErrorPasswordMatch("Password didn't match");
    }
  };
  return (
    <>
      <div className="reset__box-header">
        <h4>Change Password</h4>
      </div>
      <div className="reset__box-body">
        <Formik
          enableReinitialize
          initialValues={{ email }}
          validationSchema={resetValidation}
          onSubmit={changedPassword}
        >
          {(formik) => {
            return (
              <Form>
                <div className="reset__box-body-input">
                  <InputForm
                    label="Select New Password"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    passwordType
                  />

                  <InputForm
                    type="password"
                    name="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    passwordType
                  />
                </div>

                <Space className="reset__box-body-action">
                  <PrButton onClick={() => navigate("/login")}>Cancel</PrButton>
                  <PrButton type="primary" htmlType="submit" loading={loading}>
                    Reset
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
