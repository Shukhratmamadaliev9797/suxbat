import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { listCategoriesProducts } from "../../actions/productAction";
import { NavLink, useNavigate } from "react-router-dom";
export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productCategoriesList = useSelector(
    (state) => state.productCategoriesList
  );

  const { loading, error, categories } = productCategoriesList;

  useEffect(() => {
    dispatch(listCategoriesProducts());
  }, [dispatch]);
  return loading ? (
    "loading"
  ) : error ? (
    error
  ) : (
    <Swiper
      slidesPerView={10}
      spaceBetween={5}
      pagination={{
        clickable: true,
      }}
      className="marketplace__caterogies"
    >
      <SwiperSlide
        onClick={() => navigate(`/marketplace`)}
        className="marketplace__category"
      >
        <span>All</span>
      </SwiperSlide>
      {categories.map((category) => {
        return (
          <SwiperSlide
            onClick={() => navigate(`/marketplace/${category.category}`)}
            className="marketplace__category"
          >
            <span>{category.category}</span>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
