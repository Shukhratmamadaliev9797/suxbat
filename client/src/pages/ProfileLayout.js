import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProfile } from "../actions/userAction";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileAbout from "../components/Profile/ProfileAbout";
import ProfilePosts from "../components/Profile/ProfilePosts";
import ProfileGroups from "../components/Profile/ProfileGroups";
import { POST_CREATE_RESET } from "../constants/postConstants";
import ProfileImages from "../components/Profile/ProfileImages";
import { listImages } from "../actions/uploadImages";
import UpdateProfile from "../modal/UpdateProfile";
import CoverPhotos from "../modal/CoverPhotos";
import EditProfileDetails from "../modal/EditProfileDetails";
import { PROFILE_DETAILS_UPDATE_RESET } from "../constants/userConstants";
import ProfileFriends from "../components/Profile/ProfileFriends";

export default function ProfileLayout() {
  const [height, setHeight] = useState();
  const [updatePhoto, setUpdatePhoto] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const [selectCoverPictures, setSelectCoverPictures] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [profilePage, setProfilePage] = useState(0);
  const dispatch = useDispatch();

  const { username } = useParams();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const postCreate = useSelector((state) => state.postCreate);
  const { success } = postCreate;

  const profileDetailsUpdate = useSelector(
    (state) => state.profileDetailsUpdate
  );

  const { success: successUpdateDetails } = profileDetailsUpdate;

  const imagesList = useSelector((state) => state.imagesList);
  const { loading: loadingPhotos, error: errorPhotos, photos } = imagesList;

  const profileFriendRequestCancel = useSelector(
    (state) => state.profileFriendRequestCancel
  );
  const { success: successFriendRequestCancel } = profileFriendRequestCancel;

  const profileFriendAdd = useSelector((state) => state.profileFriendAdd);
  const { success: successAddFriend } = profileFriendAdd;

  const profileDetails = useSelector((state) => state.profileDetails);

  const { loading, error, profile, posts, friendship } = profileDetails;
  var userName = username === undefined ? userInfo.username : username;

  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  useEffect(() => {
    dispatch(detailsProfile(userName));
    dispatch(listImages(path, sort, max));
    if (success) {
      dispatch({ type: POST_CREATE_RESET });
    }
    if (successUpdateDetails) {
      setEditDetails(false);
      dispatch({ type: PROFILE_DETAILS_UPDATE_RESET });
    }
  }, [success, dispatch, path, sort, max, userName, successUpdateDetails]);
  var visitor = userName === userInfo.username ? false : true;

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
              <EditProfileDetails
                editDetails={editDetails}
                setEditDetails={setEditDetails}
                profile={profile}
              />
              <CoverPhotos
                selectCoverPictures={selectCoverPictures}
                setSelectCoverPictures={setSelectCoverPictures}
                photos={photos?.resources}
                setCoverPicture={setCoverPicture}
                coverPicture={coverPicture}
              />
              <UpdateProfile
                updatePhoto={updatePhoto}
                handleClose={() => setUpdatePhoto(false)}
                setUpdatePhoto={setUpdatePhoto}
                photos={photos?.resources}
              />

              <ProfileHeader
                visitor={visitor}
                profile={profile}
                setProfilePage={setProfilePage}
                setUpdatePhoto={setUpdatePhoto}
                setSelectCoverPictures={setSelectCoverPictures}
                setCoverPicture={setCoverPicture}
                coverPicture={coverPicture}
                setEditDetails={setEditDetails}
                setHeight={setHeight}
                friendship={friendship}
              />
              {profilePage === 0 ? (
                <ProfileAbout profile={profile} visitor={visitor} />
              ) : profilePage === 1 ? (
                <ProfilePosts visitor={visitor} posts={posts} />
              ) : profilePage === 2 ? (
                <ProfileFriends visitor={visitor} />
              ) : profilePage == 3 ? (
                <ProfileImages userName={userName} photos={photos} />
              ) : profilePage == 4 ? (
                <ProfileGroups />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
