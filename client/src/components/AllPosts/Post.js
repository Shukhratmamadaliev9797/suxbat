import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { Player, BigPlayButton, LoadingSpinner } from "video-react";
import PostReacts from "./PostReacts";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import { useDispatch, useSelector } from "react-redux";
import { getReacts, reactPost } from "../../actions/postAction";
import Comment from "./Comment";
import { Image, Popover } from "antd";

export default function Post({ post }) {
  const [postReacts, setPostReacts] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState();
  const [count, setCount] = useState(1);
  const [comments, setComments] = useState([]);
  const [checkSaved, setCheckSaved] = useState();
  const [openComment, setOpenComment] = useState(false);
  const postRef = useRef(null);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: postDeleteSuccess } = postDelete;

  const content = <PostReacts />;

  const getMediaType = (url) => {
    const videoExtensions = ["mp4", "webm", "ogg"]; // Add more video extensions if needed
    const fileExtension = url?.split(".").pop().toLowerCase();

    if (videoExtensions.includes(fileExtension)) {
      return "video";
    } else {
      return "image";
    }
  };

  useEffect(() => {
    getPostReacts();
    setComments(post?.comments);
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReacts(post._id, userInfo.token);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };

  const dispatch = useDispatch();
  const reactPostHandler = (type) => {
    dispatch(reactPost(post._id, type));
    if (check == type) {
      setCheck();
      let index = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts.findIndex((x) => x.react == type);
      let index1 = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
      }
    }
  };

  const showMore = () => {
    setCount((prev) => prev + 3);
  };
  console.log(post);
  return (
    <div className="posts__post" ref={postRef}>
      <div className="posts__post-user">
        <div className="posts__post-user-info">
          <Link
            to={`/profile/${post.user.username}`}
            className="posts__post-user-info-img"
          >
            <img src={post.user.picture} alt="" />
          </Link>
          <div className="posts__post-user-info-name">
            <div className="posts__post-user-info-name-type">
              <h6>
                <Link to={`/profile/${post.user.username}`}>
                  {post.user.first_name} {post.user.last_name}
                </Link>
              </h6>{" "}
              <div>
                {post.type === "profilePicture" &&
                  `upated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "cover" &&
                  `upated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <span>{format(post.createdAt)}</span>
          </div>
        </div>
        <div
          onClick={() => setShowPostMenu((prev) => !prev)}
          className="posts__post-user-action"
        >
          <PostMenu
            setShowPostMenu={setShowPostMenu}
            userId={userInfo.id}
            postUserId={post.user._id}
            post={post}
            checkSaved={checkSaved}
            setCheckSaved={setCheckSaved}
            postRef={postRef}
          />
        </div>
      </div>
      <div className="posts__post-text">
        {post.background ? (
          <div
            style={{
              background: `url(${post.background})`,
            }}
            className="posts__post-text-background"
          >
            {post.text}
          </div>
        ) : post.type === null ? (
          <>
            <div className="posts__post-text-plain">
              <p>{post.text}</p>
            </div>
            {post.images && post.images.length && (
              <div
                className={`posts__post-images ${
                  post.images.length === 1
                    ? "posts__post-images-preview1"
                    : post.images.length === 2
                    ? "posts__post-images-preview2"
                    : post.images.length === 3
                    ? "posts__post-images-preview3"
                    : post.images.length === 4
                    ? "posts__post-images-preview4"
                    : post.images.length === 5
                    ? "posts__post-images-preview5"
                    : post.images.length % 2 === 0
                    ? "posts__post-images-preview6"
                    : "posts__post-images-singleGridImage"
                }`}
              >
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  {post.images.map((media, i) => {
                    const mediaType = getMediaType(media.url);

                    return mediaType === "image" ? (
                      <Image
                        src={media.url}
                        alt={media.url}
                        key={i}
                        placeholder={
                          <Image preview={false} src={media.url} width={200} />
                        }
                      />
                    ) : mediaType === "video" ? (
                      <Player
                        key={i}
                        className="video"
                        fluid={false}
                        src={media.url}
                      >
                        <BigPlayButton position="center" />
                        <LoadingSpinner />
                      </Player>
                    ) : null;
                  })}
                </Image.PreviewGroup>
              </div>
            )}
          </>
        ) : post.type === "group" ? (
          <>
            <div className="posts__post-text-plain">
              <p>{post.text}</p>
            </div>
            {post.images && post.images.length && (
              <div
                className={`posts__post-images ${
                  post.images.length === 1
                    ? "posts__post-images-preview1"
                    : post.images.length === 2
                    ? "posts__post-images-preview2"
                    : post.images.length === 3
                    ? "posts__post-images-preview3"
                    : post.images.length === 4
                    ? "posts__post-images-preview4"
                    : post.images.length === 5
                    ? "posts__post-images-preview5"
                    : post.images.length % 2 === 0
                    ? "posts__post-images-preview6"
                    : "posts__post-images-singleGridImage"
                }`}
              >
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  {post.images.map((media, i) => {
                    const mediaType = getMediaType(media.url);

                    return mediaType === "image" ? (
                      <Image
                        src={media.url}
                        alt={media.url}
                        key={i}
                        placeholder={
                          <Image preview={false} src={media.url} width={200} />
                        }
                      />
                    ) : mediaType === "video" ? (
                      <Player
                        key={i}
                        className="video"
                        fluid={false}
                        src={media.url}
                      >
                        <BigPlayButton position="center" />
                        <LoadingSpinner />
                      </Player>
                    ) : null;
                  })}
                </Image.PreviewGroup>
              </div>
            )}
          </>
        ) : post.type === "profilePicture" ? (
          <div className="posts__post-profilePicture">
            <div
              style={{
                background: `url(${
                  post.user.cover
                    ? post.user.cover
                    : "/images/default_cover.jpeg"
                })`,
              }}
              className="posts__post-profilePicture-cover"
            >
              <div className="posts__post-profilePicture-picture">
                <img src={post.images[0].url} alt="" />
              </div>
            </div>

            <div className="posts__post-profilePicture-coverBottom"></div>
          </div>
        ) : (
          <div className="posts__post-profileCover">
            <img src={post.images[0].url} alt="cover picture" />
          </div>
        )}
      </div>

      <div className="posts__post-info">
        <div className="posts__post-info-reacts">
          {reacts &&
            reacts
              .sort((a, b) => {
                return b.count - a.count;
              })
              .slice(0, 3)
              .map((react, i) => {
                return (
                  react.count > 0 && (
                    <img
                      key={i}
                      src={`/reacts/${react.react}.svg`}
                      style={{ width: "1.5rem", objectFit: "contain" }}
                    />
                  )
                );
              })}
          <span>{total && total}</span>
        </div>
        <div>{comments.length} Comments</div>
      </div>
      <div className="posts__post-action">
        <Popover
          placement="bottom"
          content={
            <PostReacts
              postReacts={postReacts}
              setPostReacts={setPostReacts}
              reactPostHandler={reactPostHandler}
            />
          }
        >
          <div
            className="posts__post-action-like"
            onClick={() => reactPostHandler(check ? check : "Like")}
          >
            {check ? (
              <img
                src={`/reacts/${check}.svg`}
                style={{ width: "10%", objectFit: "contain" }}
                alt=""
              />
            ) : (
              <i className="like_icon"></i>
            )}
            <span
              style={{
                color: `${
                  check == "Like"
                    ? "#4267b2"
                    : check == "Love"
                    ? "#f63459"
                    : check == "Haha"
                    ? "f7b125"
                    : check == "Sad"
                    ? "f7b125"
                    : check == "Wow"
                    ? "f7b125"
                    : check == "Angry"
                    ? "red"
                    : ""
                }`,
              }}
            >
              {check ? check : "Like"}
            </span>
          </div>
        </Popover>

        <div
          onClick={() => setOpenComment((prev) => !prev)}
          className="posts__post-action-like"
        >
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="posts__post-action-like">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <CreateComment
        setComments={setComments}
        setCount={setCount}
        postId={post._id}
        user={post.user}
      />
      <div className="posts__post-comments">
        {comments &&
          openComment &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => {
              return <Comment comment={comment} key={i} />;
            })}
        {comments && openComment && comments.length > count && (
          <div
            onClick={() => showMore()}
            className="posts__post-comments-viewMore"
          >
            Load more...
          </div>
        )}
      </div>
    </div>
  );
}
