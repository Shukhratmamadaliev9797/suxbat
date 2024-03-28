import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import SendCode from "../components/Reset/SendCode";
import CodeVerification from "../components/Reset/CodeVerification";
import FindEmail from "../components/Reset/FindEmail";
import ChangePassword from "../components/Reset/ChangePassword";
import { USER_PASSWORD_CHANGE_RESET } from "../constants/userConstants";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPasswordMatch, setErrorPasswordMatch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify = (message) => toast.error(message);

  const userPasswordChange = useSelector((state) => state.userPasswordChange);
  const {
    loading: loadingPassword,
    error: errorPassword,
    success: successPassword,
  } = userPasswordChange;

  const userFind = useSelector((state) => state.userFind);
  const { loading, user, error, success } = userFind;

  const resetPasswordCodeValidate = useSelector(
    (state) => state.resetPasswordCodeValidate
  );

  const {
    loading: loadingValidate,
    error: errorValidate,
    success: successValidate,
  } = resetPasswordCodeValidate;

  const resetPasswordCodeSend = useSelector(
    (state) => state.resetPasswordCodeSend
  );
  const {
    loading: loadingCode,
    error: errorCode,
    success: successCode,
  } = resetPasswordCodeSend;

  useEffect(() => {
    if (
      error ||
      errorCode ||
      errorValidate ||
      errorPasswordMatch ||
      errorPassword
    ) {
      notify(
        error ||
          errorCode ||
          errorValidate ||
          errorPasswordMatch ||
          errorPassword
      );
    }
    if (success) {
      setStatus("1");
    }
    if (successCode) {
      setStatus("2");
    }
    if (successValidate) {
      setStatus("3");
    }
    if (successPassword) {
      setStatus("");
      navigate("/login");
    }
  }, [
    error,
    success,
    successCode,
    errorCode,
    successValidate,
    errorValidate,
    successPassword,
    errorPassword,
    navigate,
    errorPasswordMatch,
    dispatch,
  ]);

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
      <div className="reset">
        <div className="reset__title">
          <img src="/images/logo1.png" alt="" />
          <Link to="/login">Login</Link>
        </div>
        <div className="reset__container">
          <div className="reset__box">
            {status === "1" ? (
              <SendCode user={user} email={email} loading={loadingCode} />
            ) : status === "2" ? (
              <CodeVerification
                code={code}
                email={email}
                setCode={setCode}
                loading={loadingValidate}
              />
            ) : status === "" ? (
              <FindEmail email={email} setEmail={setEmail} loading={loading} />
            ) : status === "3" ? (
              <ChangePassword
                email={email}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                password={password}
                confirmPassword={confirmPassword}
                setErrorPasswordMatch={setErrorPasswordMatch}
                loading={loadingPassword}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
