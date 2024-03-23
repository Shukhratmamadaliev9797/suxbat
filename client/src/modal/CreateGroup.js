import React from "react";
import { Modal, Space } from "antd";
import PrButton from "../components/Buttons/PrButton";
import InputForm from "../components/Inputs/InputForm";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { creatGroup } from "../actions/groupAction";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const groupInfos = {
  title: "",
  description: "",
};
export default function CreateGroup({ open, setIsModalOpen }) {
  const [group, setGroup] = useState(groupInfos);
  const { title, description } = group;
  const dispatch = useDispatch();
  const notify = (message) => toast.error(message);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const groupCreate = useSelector((state) => state.groupCreate);
  const { loading, error, success } = groupCreate;

  useEffect(() => {
    if (error) {
      notify(error);
    }
    if (success) {
      setIsModalOpen(false);
    }
  }, [success, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const groupValidation = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });
  const submitHandler = () => {
    dispatch(creatGroup(title, description, userInfo.id));
  };
  return (
    <>
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
          initialValues={{ title, description }}
          validationSchema={groupValidation}
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
                    <InputForm
                      type="text"
                      label="Title"
                      name="title"
                      value={title}
                      placeholder="Enter group title"
                      onChange={handleChange}
                    />
                    <InputForm
                      label="Description"
                      name="description"
                      textarea
                      value={description}
                      onChange={handleChange}
                      placeholder="Enter group description"
                      rows={3}
                    />
                    <br />
                    <PrButton
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      Create Group
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
