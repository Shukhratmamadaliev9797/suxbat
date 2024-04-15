import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ImageGallery from "react-image-gallery";
import MobileHeader from "../Mobile/Components/MobileHeader";
import Header from "../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProduct } from "../actions/productAction";
import { Alert, Space, Descriptions, Divider } from "antd";
import PrButton from "../components/Buttons/PrButton";
export default function Product({ notificationCount }) {
  const { id } = useParams();
  const mobile = useMediaQuery({
    query: "(max-width: 800px)",
  });
  const tablet = useMediaQuery({
    query: "(max-width: 1200px)",
  });

  const dispatch = useDispatch();

  const productFind = useSelector((state) => state.productFind);
  const { loading, error, product } = productFind;

  useEffect(() => {
    dispatch(findProduct(id));
  }, [dispatch, id]);

  return (
    <div className="product">
      {mobile ? (
        <MobileHeader notificationCount={notificationCount} />
      ) : (
        <Header notificationCount={notificationCount} />
      )}
      <div className="product__product">
        {loading ? (
          "loading"
        ) : error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <Space
            direction="vertical"
            style={{ display: "flex", width: "100%" }}
            className="product__product-content"
          >
            <ImageGallery
              showNav={false}
              showPlayButton={false}
              thumbnailPosition="left"
              items={product.images.map((img) => {
                return {
                  original: img.url,
                  thumbnail: img.url,
                  originalClass: "product__product-image",
                  thumbnailClass: "product__product-images",
                };
              })}
            />

            <h4>{product.title}</h4>
            <h5>£{product.price}</h5>
            <span>Listed on {product.createdAt.substring(0, 10)}</span>
            <div className="product__product-action">
              <PrButton size="medium" type="primary">
                <i class="fas fa-comment-dots"></i> <span> Message</span>
              </PrButton>
              <PrButton size="medium" type="default">
                <i class="fas fa-bookmark"></i> <span>Save</span>
              </PrButton>
              <PrButton size="medium" type="default">
                <i class="fas fa-share"></i> <span>Share</span>
              </PrButton>
            </div>
            <Descriptions
              title="Details"
              layout="vertical"
              items={[
                {
                  key: "1",
                  label: "Description",
                  span: 3,
                  children: product.description,
                },
                {
                  key: "2",
                  label: "Condition",
                  children: product.condition,
                },
                {
                  key: "3",
                  label: "Category",
                  children: product.category,
                },
                {
                  key: "4",
                  label: "Availability",
                  children: product.availability,
                },
                {
                  key: "5",
                  label: "Location",
                  span: 3,
                  children: product.location,
                },
              ]}
            />
            <Divider />
            <h6>Seller information</h6>
            <Link
              to={`/profile/${product.user.username}`}
              className="product__product-seller"
            >
              <div className="product__product-seller-img">
                <img src={product.user.picture} alt="" />
              </div>
              <div className="product__product-seller-name">
                <span>
                  {product.user.first_name} {product.user.last_name}
                </span>
                <span>
                  Joined Suxbat in {product.user.createdAt.substring(0, 4)}
                </span>
              </div>
            </Link>
          </Space>
        )}
      </div>
    </div>
  );
}
