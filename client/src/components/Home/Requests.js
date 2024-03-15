import React from "react";
import { Link } from "react-router-dom";
import PrButton from "../Buttons/PrButton";
import { useDispatch } from "react-redux";
import { acceptRequest, deleteRequest } from "../../actions/userAction";

export default function Requests({ requests }) {
  const dispatch = useDispatch();
  const deleteRequestHandler = (userId) => {
    dispatch(deleteRequest(userId));
  };

  const acceptRequestHandler = (userId) => {
    dispatch(acceptRequest(userId));
  };
  return (
    <div className="home__requests">
      <div className="home__requests-title">
        <h6>Friend Requests</h6>
        <Link>See all</Link>
      </div>
      <div className="home__requests-requests">
        {requests?.map((request, i) => {
          return (
            <div key={i} className="home__requests-request">
              <div className="home__requests-request-img">
                <img src={request.picture} alt="" />
                <div className="home__requests-request-name">
                  <span>
                    {request.first_name} {request.last_name}
                  </span>
                  <span>Mutual friends {request.friends?.length}</span>
                </div>
              </div>
              <div className="home__requests-request-action">
                <PrButton
                  onClick={() => acceptRequestHandler(request._id)}
                  type="primary"
                >
                  Accept
                </PrButton>
                <PrButton
                  onClick={() => deleteRequestHandler(request._id)}
                  type="primary"
                  danger
                  ghost
                >
                  Reject
                </PrButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
