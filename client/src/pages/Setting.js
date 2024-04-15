import { Breadcrumb, Descriptions, Switch } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Setting() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

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
                    value={userInfo.setting.darkMode}
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
