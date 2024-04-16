import { Breadcrumb, Descriptions, Switch } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { switchDarkMode } from "../actions/userAction";
import { USER_DARK_MODE_RESET } from "../constants/userConstants";

export default function Setting({ darkMode, toggleDarkMode }) {
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const darkModeSwitch = useSelector((state) => state.darkModeSwitch);
  const { success } = darkModeSwitch;

  const darkModeHandler = () => {
    dispatch(switchDarkMode());
  };
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Home</Link>,
          },

          {
            title: "Setting",
          },
        ]}
      />
      <div className="setting">
        <Descriptions
          title="Setting"
          layout="vertical"
          items={[
            {
              key: "1",
              label: "Dark mode",
              span: 3,
              children: (
                <>
                  <Switch
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                  />
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
