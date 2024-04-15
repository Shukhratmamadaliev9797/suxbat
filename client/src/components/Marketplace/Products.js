import React, { useEffect, useState } from "react";
import { Alert, Divider, Empty, Dropdown } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { listProducts, listYourProducts } from "../../actions/productAction";
import PrButton from "../Buttons/PrButton";
import { Link, useOutletContext } from "react-router-dom";
export default function Products() {
  const dispatch = useDispatch();
  const yourProductList = useSelector((state) => state.yourProductList);
  const { loading, error, yourProducts } = yourProductList;
  const [setIsModalOpen] = useOutletContext();
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProductList,
    error: errorProductList,
    products,
  } = productList;

  useEffect(() => {
    dispatch(listYourProducts());
    dispatch(listProducts({ category: "", title: "" }));
  }, [dispatch]);

  const items = [
    {
      key: "1",
      label: (
        <Link className="posts__post-postMenu marketplace__products-product-dropdown">
          <i class="fas fa-pencil-alt"></i>
          <div>
            <span>Edit</span>
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div className="posts__post-postMenu marketplace__products-product-dropdown">
          <i className="fas fa-trash-alt"></i>
          <div>
            <span>Delete</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="marketplace__products">
      {yourProducts?.length > 0 && (
        <div className="marketplace__product-createBtn">
          <PrButton
            size="4rem"
            width="5rem"
            type="primary"
            ghost
            onClick={() => setIsModalOpen(true)}
          >
            Create
          </PrButton>
        </div>
      )}

      <div className="marketplacee__products-section">
        <div className="marketplace__products-section-title">
          <h6>Your listings</h6>
          <Link>See all</Link>
        </div>
        <Divider />
        {loading ? (
          "loading"
        ) : error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : yourProducts.length <= 0 ? (
          <Empty>
            <PrButton
              onClick={() => setIsModalOpen(true)}
              size="medium"
              width="8rem"
              type="primary"
            >
              Create Now
            </PrButton>
          </Empty>
        ) : (
          <div className="marketplace__products-products">
            {yourProducts.slice(0, 5).map((product) => {
              return (
                <div className="marketplace__products-product">
                  <Link to={`/products/${product._id}`}>
                    <img src={product.images[0].url} alt="" />
                    <div className="marketplace__products-product-content">
                      <h6>{product.title}</h6>
                      <span>{product.price} £</span>
                      <p>Listed on {product.createdAt.substring(0, 10)}</p>
                      <Dropdown
                        menu={{
                          items,
                        }}
                        placement="bottomRight"
                        arrow
                        className="post__menu "
                      >
                        <PrButton
                          size="medium"
                          width="3rem"
                          className="marketplace__products-product-action"
                        >
                          <i class="fas fa-ellipsis-h"></i>
                        </PrButton>
                      </Dropdown>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        <br />
        <div className="marketplace__products-section-title">
          <h6>New for you Today's picks</h6>
          <Link>See all</Link>
        </div>
        <Divider />
        {loadingProductList ? (
          "loading"
        ) : errorProductList ? (
          <Alert
            message="Error"
            description={errorProductList}
            type="error"
            showIcon
          />
        ) : products.length <= 0 ? (
          <Empty></Empty>
        ) : (
          <div className="marketplace__products-products">
            {products.slice(0, 20).map((product) => {
              return (
                <div className="marketplace__products-product">
                  <Link to={`/products/${product._id}`}>
                    <img src={product.images[0].url} alt="" />
                    <div className="marketplace__products-product-content">
                      <h6>{product.title}</h6>
                      <span>{product.price} £</span>
                      <p>{product.location}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
