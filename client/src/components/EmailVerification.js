import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendVerificationLink } from "../actions/emailAction";

export default function EmailVerification() {
  const dispatch = useDispatch();

  const verificationEmailLinkSend = useSelector(
    (state) => state.verificationEmailLinkSend
  );
  const { loading, error, success, message } = verificationEmailLinkSend;

  const emailVerify = useSelector((state) => state.emailVerify);
  const { success: successUpdate } = emailVerify;

  const submitHandler = () => {
    dispatch(sendVerificationLink());
  };
  console.log(successUpdate);

  return successUpdate ? (
    ""
  ) : (
    <div className="emailVerification">
      <p>
        Your account is not verified, Please verify your account before it gets
        deleted after a month from creating.
      </p>
      <button onClick={submitHandler}>
        Click here to resend verification email
      </button>
      <div>{message ? message : ""}</div>
    </div>
  );
}
