import React, { useEffect } from "react";
import { listImages } from "../../actions/uploadImages";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Divider } from "antd";

export default function GroupPhotos({ group }) {
  const imagesList = useSelector((state) => state.imagesList);
  const { loading: loadingPhotos, error: errorPhotos, photos } = imagesList;

  const dispatch = useDispatch();

  const path = `${group._id}/*`;
  const max = 500;
  const sort = "desc";

  useEffect(() => {
    dispatch(listImages(path, sort, max));
  }, [path, max, sort]);

  return (
    <div className="groupPhotos">
      <h6>All photos</h6>
      <Divider />
      <div>
        {photos?.resources?.length <= 0 && (
          <Empty description={<span>No members</span>} />
        )}
      </div>
      <div className="groupPhotos__photos">
        {loadingPhotos ? (
          "loading"
        ) : errorPhotos ? (
          <Alert
            message="Error"
            description={errorPhotos}
            type="error"
            showIcon
          />
        ) : (
          photos.resources
            .filter((img) => img.folder !== `${group._id}/cover_picture`)
            .map((photo) => {
              return (
                <div className="groupPhotos__photo">
                  <img src={photo.secure_url} />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
