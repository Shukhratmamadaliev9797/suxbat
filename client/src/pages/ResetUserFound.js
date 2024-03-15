import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import LoginInput from "../components/LoginInput";
import * as Yup from "yup";
import { findUser } from "../actions/userAction";
export default function Reset() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  return (
    <div className="reset">
      <div className="reset__title">
        <div className="login__logo">
          <img src="/icons/logo4.png" alt="" />
          <span>Suxbat</span>
        </div>
        <Link to="/login">Login</Link>
      </div>
      <div className="reset__container">
        <div className="reset__box">
          <div className="reset__box-header">
            <h4>Find Your Account</h4>
          </div>
          <div className="reset__box-body">
            <InputForm
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
