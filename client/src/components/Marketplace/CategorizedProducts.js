import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../../actions/productAction";
import { Alert, Empty } from "antd";

export default function CategorizedProducts() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProductList,
    error: errorProductList,
    products,
  } = productList;

  useEffect(() => {
    dispatch(listProducts({ category: category, title: "" }));
  }, [dispatch, category]);

  return (
    <div>
      {" "}
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
        <Empty />
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
  );
}
