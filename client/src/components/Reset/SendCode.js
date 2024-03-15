import { Button, Space } from "antd";
import React from "react";
import PrButton from "../Buttons/PrButton";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetCode } from "../../actions/emailAction";
import { useDispatch } from "react-redux";

export default function SendCode({ user, email, loading }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendCode = () => {
    dispatch(sendPasswordResetCode(email));
  };

  return (
    <>
      <div className="reset__box-header">
        <h4>Reset Your Password</h4>
      </div>
      <div className="reset__box-body">
        <div className="reset__box-userFound">
          <div className="reset__box-userFound-info">
            <p>How do you want receive the code to reset your password?</p>
            <div className="reset__box-userFound-select">
              <input type="radio" defaultChecked />
              <label htmlFor="">Send code via email {user.email}</label>
            </div>
          </div>
          <div className="reset__box-userFound-img">
            <img src={user.picture} alt="" />
            <p>
              {user.first_name} <br /> Suxbat User
            </p>
          </div>
        </div>
        <Space className="reset__box-body-action">
          <PrButton onClick={() => navigate("/login")}>Cancel</PrButton>
          <PrButton type="primary" onClick={() => sendCode()} loading={loading}>
            Send
          </PrButton>
        </Space>
      </div>
    </>
  );
}
