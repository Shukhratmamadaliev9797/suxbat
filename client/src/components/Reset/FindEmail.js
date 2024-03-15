import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputForm from "../Inputs/InputForm";
import { Space } from "antd";
import PrButton from "../Buttons/PrButton";
import { findUser } from "../../actions/userAction";

export default function FindEmail({ email, setEmail, loading }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetValidation = Yup.object({
    email: Yup.string()
      .required("You will need email to reset your password")
      .email("Enter a valid email address"),
  });

  const submitHandler = () => {
    dispatch(findUser(email));
  };
  return (
    <>
      <div className="reset__box-header">
        <h4>Find Your Account</h4>
      </div>
      <div className="reset__box-body">
        <Formik
          enableReinitialize
          initialValues={{ email }}
          validationSchema={resetValidation}
          onSubmit={submitHandler}
        >
          {(formik) => {
            return (
              <Form>
                <div className="reset__box-body-input">
                  <InputForm
                    label=" Please enter your email address to search for your
                account"
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </div>

                <Space className="reset__box-body-action">
                  <PrButton onClick={() => navigate("/login")}>Cancel</PrButton>
                  <PrButton type="primary" htmlType="submit" loading={loading}>
                    Search
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
