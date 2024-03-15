import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../actions/emailAction";
import CreatePostHome from "../components/CreatePost/CreatePostHome";
import Stories from "../components/Strory/Stories";
import ActivateModal from "../modal/ActivateModal";
import "rsuite/dist/rsuite.min.css";

export default function Activate() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailVerify = useSelector((state) => state.emailVerify);
  const { loading, error, success } = emailVerify;

  useEffect(() => {
    dispatch(verifyEmail(token));
    if (success) {
      navigate("/");
    }
  }, [dispatch, token, success, navigate]);

  return (
    <div className="home">
      <ActivateModal success={success} loading={loading} error={error} />
      <Stories />
      <CreatePostHome />
    </div>
  );
}
