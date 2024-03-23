import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { signIn } from "../actions/userAction";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import Loader1 from "../components/Loaders/Loader1";
import InputForm from "../components/Inputs/InputForm";
import { Space } from "antd";
import Title from "../components/Typography/Title";
import PrButton from "../components/Buttons/PrButton";
const loginInfos = {
  email: "",
  password: "",
};

export default function Login() {
  const [login, setLogin] = useState(loginInfos);
  const [keepSigned, setKeepSigned] = useState(false);
  const { email, password } = login;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, error, success } = userSignIn;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });
  const notify = (message) => toast.error(message);
  useEffect(() => {
    if (error) {
      notify(error);
    }
    if (success) {
      navigate("/");
    }
  }, [error, success, navigate]);

  const submitHandler = () => {
    dispatch(signIn({ email, password }, keepSigned));
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="snackbar"
      />
      {loading ? <Loader1 /> : ""}
      <div className="login">
        <div className="login__container">
          <div className="login__img">
            <div className="login__logo">
              <img src="/images/logo1.png" alt="" />
            </div>
          </div>
          <div className="login__form">
            <div className="login__form-register">
              <div className="login__form-logo">
                <img src="/images/logo1.png" alt="" />
              </div>
              <Link to="/register">Register</Link>
            </div>
            <div className="login__form-box">
              <Title title="Login to your account" />
              <Formik
                enableReinitialize
                initialValues={{ email, password }}
                validationSchema={loginValidation}
                onSubmit={submitHandler}
              >
                {(formik) => (
                  <Form>
                    <Space direction="vertical" style={{ display: "flex" }}>
                      <InputForm
                        label="Email"
                        name="email"
                        value={email}
                        onChange={handleLoginChange}
                        placeholder="Enter your email"
                      />
                      <InputForm
                        label="Password"
                        name="password"
                        value={password}
                        onChange={handleLoginChange}
                        placeholder="Enter your password"
                        passwordType
                      />
                      <div className="login__form-action">
                        <div className="login__form-remember">
                          <input
                            onChange={(e) => setKeepSigned(e.target.checked)}
                            value={keepSigned}
                            type="checkbox"
                          />
                          <span>Remember me</span>
                        </div>
                        <div className="login__form-forgot">
                          <Link to="/reset">Forgot your Password?</Link>
                        </div>
                      </div>
                      <div className="login__form-btn">
                        <PrButton htmlType="submit" type="primary">
                          Login
                        </PrButton>
                      </div>
                    </Space>
                  </Form>
                )}
              </Formik>
              <div className="login__form-donthave">
                Dont have account <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
