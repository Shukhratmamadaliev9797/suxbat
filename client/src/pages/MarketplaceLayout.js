import React, { useEffect, useState } from "react";
import {
  Alert,
  Breadcrumb,
  Divider,
  Empty,
  Input,
  Space,
  Dropdown,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import CreateProduct from "../modal/CreateProduct";
import Categories from "../components/Marketplace/Categories";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

export default function MarketplaceLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCreate = useSelector((state) => state.productCreate);
  const { success } = productCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
  }, [dispatch, success]);

  const searchHandler = () => {
    if (setTitle) {
      navigate(`/marketplace/search/${title}`);
    }
  };

  return (
    <div className="marketplace">
      <CreateProduct open={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Space direction="vertical" style={{ display: "flex", width: "100%" }}>
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },

            {
              title: "Marketplace",
            },
          ]}
        />
        <div className="marketplace__search">
          <Search
            placeholder="Search marketplace"
            size="medium"
            enterButton
            allowClear
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onPressEnter={searchHandler}
          />
        </div>
        <Categories />
        <Outlet context={[setIsModalOpen]} />
      </Space>
    </div>
  );
}
