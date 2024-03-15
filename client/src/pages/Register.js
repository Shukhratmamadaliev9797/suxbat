import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import Loader1 from "../components/Loaders/Loader1";
import InputForm from "../components/Inputs/InputForm";
import { Alert, Button, Space } from "antd";
import { useMediaQuery } from "react-responsive";
import SelectForm from "../components/Inputs/SelectForm";
import Title from "../components/Typography/Title";

export default function Register() {
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const tablet = useMediaQuery({
    query: "(max-width: 992px)",
  });
  const screen500 = useMediaQuery({
    query: "(max-width: 500px",
  });
  const [user, setUser] = useState(userInfos);
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [termError, setTermError] = useState("");
  const [termAccept, setTermAccept] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (message) => toast.error(message);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const tempYear = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => tempYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What is your First name")
      .min(2, "First name must be between 2 and 16 characters")
      .max(16, "First name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    last_name: Yup.string()
      .required("What is your Last name")
      .min(2, "Last name must be between 2 and 16 characters")
      .max(16, "Last name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    email: Yup.string()
      .required("You will need email when login in")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required(
        "Password should contain capital letter, number, and special characters"
      )
      .min(6, "Paassword must be at least 6 characters")
      .max(36, "Password can't be more than 36 characters"),
  });

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;
  useEffect(() => {
    if (error || termError) {
      notify(error || termError);
    }
    if (success) {
      navigate("/");
    }
  }, [success, navigate, error, termError]);
  const submitHandler = () => {
    let currentDate = new Date();
    let pickedDate = new Date(bYear, bMonth - 1, bDay);
    let atleast14 = new Date(1970 + 14, 0, 1);
    let noMoreThan70 = new Date(1970 + 70, 0, 1);
    if (currentDate - pickedDate < atleast14) {
      setDateError("It looks like you are too young to register.");
    } else if (currentDate - pickedDate > noMoreThan70) {
      setDateError("It looks like you are very old to register");
    } else if (gender === "") {
      setGenderError("You must choose gender");
    } else if (termAccept === false) {
      setTermError("Accept Term and Conditions");
    } else {
      setDateError("");
      setGenderError("");
      setTermError("");
      dispatch(
        register({
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        })
      );
    }
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
      <div className="register">
        <div className="register__img">
          <div className="register__logo">
            <img src="/images/logo1.png" alt="" />
          </div>
        </div>
        <div className="register__form">
          <div className="register__form-login">
            <div className="register__form-logo">
              <img src="/images/logo1.png" alt="" />
            </div>
            <Link to="/login">Login</Link>
          </div>
          <div className="register__form-box">
            <Title title="Create your account" />
            <Formik
              enableReinitialize
              initialValues={{
                first_name,
                last_name,
                email,
                password,
                bDay: 1,
                bMonth,
                bYear,
                gender,
              }}
              validationSchema={registerValidation}
              onSubmit={submitHandler}
            >
              {(formik) => (
                <Form>
                  <Space direction="vertical" style={{ display: "flex" }}>
                    <div className="register__form-inputRow">
                      <InputForm
                        type="text"
                        label="First Name"
                        name="first_name"
                        onChange={handleRegisterChange}
                        placeholder="Enter first name"
                      />
                      <InputForm
                        type="text"
                        label="Last Name"
                        name="last_name"
                        placeholder="Enter last Name"
                        onChange={handleRegisterChange}
                      />
                    </div>
                    <InputForm
                      type="text"
                      label="Email address"
                      name="email"
                      placeholder="Enter email address"
                      onChange={handleRegisterChange}
                    />
                    <InputForm
                      type="password"
                      label="Password"
                      name="password"
                      placeholder="Enter new password"
                      onChange={handleRegisterChange}
                      passwordType
                    />
                    <Space
                      direction="vertical"
                      style={{ display: "flex" }}
                      className="register__form-selectBox"
                    >
                      <label htmlFor="">
                        Date of Birth <i className="info_icon"></i>
                      </label>
                      <div className="register__form-selectContainer">
                        <SelectForm
                          name="bDay"
                          value={bDay}
                          values={days}
                          handleChange={handleRegisterChange}
                        />

                        <SelectForm
                          name="bMonth"
                          value={bMonth}
                          values={months}
                          handleChange={handleRegisterChange}
                        />

                        <SelectForm
                          name="bYear"
                          value={bYear}
                          values={years}
                          handleChange={handleRegisterChange}
                        />
                      </div>
                      {dateError && (
                        <Alert message={dateError} type="error" showIcon />
                      )}
                    </Space>
                    <Space direction="vertical" style={{ display: "flex" }}>
                      <label htmlFor="">
                        Gender <i className="info_icon"></i>
                      </label>

                      <div className="register__form-radioBox-radio">
                        <label htmlFor="male">
                          Male
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            onChange={handleRegisterChange}
                          />
                        </label>
                        <label htmlFor="female">
                          Female
                          <input
                            type="radio"
                            value="female"
                            id="female"
                            name="gender"
                            onChange={handleRegisterChange}
                          />
                        </label>
                        <label htmlFor="custom">
                          Custom
                          <input
                            type="radio"
                            id="custom"
                            value="custom"
                            name="gender"
                            onChange={handleRegisterChange}
                          />
                        </label>
                      </div>
                      {genderError && (
                        <Alert message={genderError} type="error" showIcon />
                      )}
                    </Space>
                    <div className="register__form-action">
                      <input
                        onChange={(e) => setTermAccept(e.target.checked)}
                        type="checkbox"
                        value={termAccept}
                      />
                      <span>Accept Term and Conditions</span>
                    </div>
                    <div className="register__form-btn">
                      <Button
                        htmlType="submit"
                        size={tablet ? "middle" : "large"}
                        type="primary"
                      >
                        Register
                      </Button>
                    </div>
                  </Space>
                </Form>
              )}
            </Formik>
            <div className="login__form-donthave">
              Already have account <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
