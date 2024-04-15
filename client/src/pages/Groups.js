import React, { useState } from "react";
import {
  Collapse,
  Space,
  Input,
  Alert,
  Empty,
  Button,
  Breadcrumb,
  Divider,
} from "antd";
import PrButton from "../components/Buttons/PrButton";
import CreateGroup from "../modal/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listYourGroups, searchGroup } from "../actions/groupAction";
import { GROUP_CREATE_RESET } from "../constants/groupConstants";
import Group from "../components/Groups/Group";
import { Link } from "react-router-dom";

export default function Groups() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const { Search } = Input;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const yourGroupList = useSelector((state) => state.yourGroupList);
  const { loading, error, yourGroups, joinedGroups } = yourGroupList;

  const groupSearch = useSelector((state) => state.groupSearch);
  const {
    loading: loadingSearch,
    error: errorSearch,
    searchedGroups,
  } = groupSearch;

  const groupCreate = useSelector((state) => state.groupCreate);
  const { success } = groupCreate;

  useEffect(() => {
    dispatch(listYourGroups(userInfo.id));
    if (success) {
      dispatch({ type: GROUP_CREATE_RESET });
    }
  }, [dispatch, success]);

  const searchHandler = () => {
    dispatch(searchGroup(searchName));
    setStatus(true);
    if (searchName === "") {
      setStatus(false);
    }
  };

  return (
    <>
      <CreateGroup open={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Space direction="vertical" style={{ display: "flex", width: "100%" }}>
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },

            {
              title: "Groups",
            },
          ]}
        />
        <div className="groups__search">
          <Search
            placeholder="Search groups"
            size="medium"
            enterButton
            allowClear
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onPressEnter={searchHandler}
          />
        </div>

        {status ? (
          loadingSearch ? (
            <div className="groups__results">Loading...</div>
          ) : errorSearch ? (
            <Alert
              message="Error Text"
              description="Error Description Error Description Error Description Error Description"
              type="error"
            />
          ) : (
            <div className="groups__results">
              {searchedGroups.length <= 0 && (
                <Empty>
                  <Button
                    type="primary"
                    danger
                    ghost
                    onClick={() => setStatus(false)}
                  >
                    Cancel
                  </Button>
                </Empty>
              )}
              {searchedGroups.map((group, i) => {
                return <Group group={group} key={i} />;
              })}
            </div>
          )
        ) : (
          <>
            <Collapse
              className=""
              collapsible="header"
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: <h5>Your groups</h5>,
                  children: (
                    <div className="groups__body">
                      {yourGroups?.length <= 0 ? (
                        <Empty>
                          <Button
                            type="primary"
                            ghost
                            onClick={() => setIsModalOpen(true)}
                            size="medium"
                          >
                            Create new group
                          </Button>
                        </Empty>
                      ) : (
                        <>
                          <div className="groups__create">
                            <PrButton
                              type="primary"
                              width="9rem"
                              onClick={() => setIsModalOpen(true)}
                              size="medium"
                              ghost
                            >
                              Create new group
                            </PrButton>
                          </div>
                          <Divider />
                          {loading ? (
                            "loading"
                          ) : error ? (
                            error
                          ) : (
                            <div className="groups__groups">
                              {yourGroups.map((group, i) => {
                                return <Group group={group} key={i} delet />;
                              })}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ),
                },
              ]}
            />
            {joinedGroups?.length > 0 && (
              <Collapse
                collapsible=""
                defaultActiveKey={["1"]}
                items={[
                  {
                    key: "1",
                    label: (
                      <div>
                        <h5>Groups you've joined</h5>
                      </div>
                    ),
                    children: (
                      <div>
                        {loading ? (
                          "loading"
                        ) : error ? (
                          error
                        ) : (
                          <div className="groups__groups">
                            {joinedGroups.map((group, i) => {
                              return <Group group={group} key={i} />;
                            })}
                          </div>
                        )}
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </>
        )}
      </Space>
    </>
  );
}
