import React, { useRef } from "react";
import { Modal, Space } from "antd";
import PrButton from "../components/Buttons/PrButton";
import InputForm from "../components/Inputs/InputForm";
import SelectForm from "../components/Inputs/SelectForm";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Masonry from "react-responsive-masonry";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import dataURItoBlob from "../helper/dataURItoBlob";
import { uploadImages } from "../actions/uploadImages";
import { createProduct } from "../actions/productAction";
import { IMAGES_UPLOAD_RESET } from "../constants/uploadImagesConstants";

const productInfos = {
  title: "",
  description: "",
  price: "",
  category: "",
  condition: "",
  availability: "",
  location: "",
};
export default function CreateProduct({ open, setIsModalOpen }) {
  const [product, setProduct] = useState(productInfos);
  const [images, setImages] = useState([]);
  const {
    title,
    description,
    price,
    category,
    condition,
    availability,
    location,
  } = product;
  const dispatch = useDispatch();
  const notify = (message) => toast.error(message);
  const imageInputRef = useRef(null);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const imageUpload = useSelector((state) => state.imageUpload);
  const {
    loading: loadingImages,
    error: errorImages,
    allImages,
    success: successImages,
  } = imageUpload;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  useEffect(() => {
    if (error) {
      notify(error);
    }
    if (success) {
      setIsModalOpen(false);
    }
  }, [success, error]);

  useEffect(() => {
    if (successImages) {
      dispatch(
        createProduct(
          allImages,
          title,
          description,
          price,
          category,
          condition,
          availability,
          location,
          userInfo.id
        )
      );
      dispatch({ type: IMAGES_UPLOAD_RESET });
    }
  }, [
    successImages,
    dispatch,
    allImages,
    title,
    description,
    price,
    category,
    condition,
    availability,
    location,
    userInfo.id,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const productValidation = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.string().required("Price is required"),
    category: Yup.string().required("Category is required"),
    condition: Yup.string().required("Condition required"),
    availability: Yup.string().required("Availability is required"),
    location: Yup.string().required("Location is required"),
  });

  const getMediaType = (dataURL) => {
    const prefix = dataURL.substring(0, dataURL.indexOf(";"));
    return prefix.includes("image")
      ? "image"
      : prefix.includes("video")
      ? "video"
      : null;
  };

  const isSupportedFormat = (type) => {
    return (
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "image/webp" ||
      type === "image/gif" ||
      type === "video/mp4" ||
      type === "video/webm" ||
      type === "video/quicktime"
    );
  };

  const handleMedia = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((media) => {
      if (
        (media.type.startsWith("image/") || media.type.startsWith("video/")) &&
        isSupportedFormat(media.type)
      ) {
        if (media.size > 1024 * 1024 * 40) {
          setImageCheck(`${media.name} size is too large. Max 5MB allowed.`);
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(media);
          reader.onload = (readerEvent) => {
            setImages((prevImages) => [
              ...prevImages,
              readerEvent.target.result,
            ]);
          };
        }
      } else {
        setImageCheck(`${media.name} format is not supported.`);
      }
    });
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const submitHandler = () => {
    const postImages = images.map((image) => {
      return dataURItoBlob(image);
    });

    const path = `${userInfo.username}/product__images`;

    let formData = new FormData();

    formData.append("path", path);

    postImages.forEach((image) => {
      formData.append("file", image);
    });
    dispatch(uploadImages(formData, path));
  };
  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        hidden
        ref={imageInputRef}
        onChange={handleMedia}
      />
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
        theme="colored"
        className="snackbar"
      />
      <Modal
        size="md"
        title=""
        width={800}
        open={open}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        className="modal"
      >
        <Formik
          enableReinitialize
          initialValues={{
            title,
            description,
            price,
            category,
            condition,
            availability,
            location,
          }}
          validationSchema={productValidation}
          onSubmit={submitHandler}
        >
          {(formik) => {
            return (
              <Form>
                <div className="modal__title">
                  <h5>Create Group</h5>
                </div>
                <div className="modal__body">
                  <Space direction="vertical" style={{ display: "flex" }}>
                    <div className="modal__images">
                      {images.length <= 0 ? (
                        <Masonry columnsCount={6} gutter="10px" className="">
                          <div
                            className="modal__images-addImage"
                            onClick={() => imageInputRef.current.click()}
                          >
                            <i class="fas fa-images"></i>
                            <span>Add image/video</span>
                          </div>
                        </Masonry>
                      ) : (
                        <Masonry columnsCount={6} gutter="10px" className="">
                          {images.map((media, i) => {
                            const mediaType = getMediaType(media);
                            return mediaType === "image" ? (
                              <div className="modal__images-image">
                                <i
                                  class="fas fa-times-circle modal__images-removeImage"
                                  onClick={() => removeImage(i)}
                                ></i>
                                <img src={media} alt={media} key={i} />
                              </div>
                            ) : mediaType === "video" ? (
                              <div className="modal__images-image">
                                <i
                                  class="fas fa-times-circle modal__images-removeImage"
                                  onClick={() => removeImage(i)}
                                ></i>
                                <Player
                                  key={i}
                                  className="video"
                                  fluid={false}
                                  src={media}
                                >
                                  <BigPlayButton position="center" />
                                  <LoadingSpinner />
                                </Player>
                              </div>
                            ) : null;
                          })}
                          {images.length >= 6 ? (
                            ""
                          ) : (
                            <div
                              className="modal__images-addImage"
                              onClick={() => imageInputRef.current.click()}
                            >
                              <i class="fas fa-images"></i>
                              <span>Add image/video</span>
                            </div>
                          )}
                        </Masonry>
                      )}
                    </div>
                    <InputForm
                      type="text"
                      label="Title"
                      name="title"
                      value={title}
                      placeholder="Enter product title"
                      onChange={handleChange}
                    />
                    <InputForm
                      label="Description"
                      name="description"
                      textarea
                      value={description}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      rows={3}
                    />
                    <InputForm
                      type="text"
                      label="Price"
                      name="price"
                      value={price}
                      placeholder="Enter product price"
                      onChange={handleChange}
                    />
                    <SelectForm
                      label="Category"
                      name="category"
                      value={category}
                      values={[
                        "Antiques",
                        "Vehicles",
                        "Video games and consoles",
                        "Toys",
                        "Tools and home improvement",
                        "Sporting goods",
                        "Pet supplies",
                        "Office supplies",
                        "Musical instruments",
                        "Jewellery and watches",
                        "Home and kitchen",
                        "Health and beauty",
                        "Furniture",
                        "Electronics",
                        "Clothings and accessories",
                        "Mobile phones",
                        "Books, films and music",
                        "Baby products",
                      ]}
                      handleChange={handleChange}
                      placeholder="Select category"
                    />
                    <SelectForm
                      label="Condition"
                      name="condition"
                      value={condition}
                      values={[
                        "New",
                        "Used - like new",
                        "Used - good",
                        "Used - fair",
                      ]}
                      handleChange={handleChange}
                      placeholder="Select category"
                    />
                    <SelectForm
                      label="Availability"
                      name="availability"
                      value={availability}
                      values={["List as single item", "List as in stock"]}
                      handleChange={handleChange}
                      placeholder="Select category"
                    />
                    <InputForm
                      label="Location"
                      name="location"
                      value={location}
                      onChange={handleChange}
                      placeholder="Enter pickup location"
                    />
                    <br />
                    <PrButton
                      type="primary"
                      htmlType="submit"
                      loading={loading || loadingImages}
                    >
                      Create Product
                    </PrButton>
                  </Space>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
}
