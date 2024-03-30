import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { findGroup } from "../actions/groupAction";
import { useParams } from "react-router-dom";
import GroupHeader from "../components/Groups/GroupHeader";
import GroupPost from "../components/Groups/GroupPost";
import GroupMembers from "../components/Groups/GroupMembers";
import GroupPhotos from "../components/Groups/GroupPhotos";
import GroupEvents from "../components/Groups/GroupEvents";
import GroupSetting from "../components/Groups/GroupSetting";

export default function GroupLayout() {
  const [groupPage, setGroupPage] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const groupFind = useSelector((state) => state.groupFind);
  const { loading, error, group } = groupFind;

  useEffect(() => {
    dispatch(findGroup(id));
  }, [dispatch, id]);

  return (
    <div>
      <Header />
      <div className="profileLayout">
        <div className="profileLayout__body">
          {loading ? (
            "loading"
          ) : error ? (
            error
          ) : (
            <>
              <GroupHeader group={group} setGroupPage={setGroupPage} />
              {groupPage === 0 ? (
                <GroupPost group={group} />
              ) : groupPage === 1 ? (
                <GroupMembers group={group} />
              ) : groupPage === 2 ? (
                <GroupPhotos group={group} />
              ) : groupPage == 3 ? (
                <GroupEvents group={group} />
              ) : groupPage == 4 ? (
                <GroupSetting />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
