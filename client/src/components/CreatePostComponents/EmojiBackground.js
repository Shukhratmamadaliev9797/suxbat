import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { Popover } from "antd";

export default function EmojiBackground({
  text,
  user,
  setText,
  type2,
  setBackground,
  background,
}) {
  const [picker, setPicker] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const bgRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  const handleEmoji = (emojiObject) => {
    const emoji = emojiObject.emoji;
    const ref = textRef.current;
    if (ref) {
      ref.focus();
      const start = text.substring(0, ref.selectionStart || 0);
      const end = text.substring(ref.selectionStart || 0);
      const newText = start + emoji + end;
      setText(newText);
      setCursorPosition((start + emoji).length);
    }
  };

  const postBackgrounds = [
    "/images/postBackgrounds/1.jpg",
    "/images/postBackgrounds/2.jpg",
    "/images/postBackgrounds/3.jpg",
    "/images/postBackgrounds/4.jpg",
    "/images/postBackgrounds/5.jpg",
    "/images/postBackgrounds/6.jpg",
    "/images/postBackgrounds/7.jpg",
    "/images/postBackgrounds/8.jpg",
    "/images/postBackgrounds/9.jpg",
    "/images/postBackgrounds/10.jpg",
  ];

  const backgroundHandler = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("createPostModal__body-textareaBackground");
  };

  const removeBackground = (i) => {
    bgRef.current.style.backgroundImage = ``;
    setBackground();
    bgRef.current.classList.remove("createPostModal__body-textareaBackground");
  };

  return (
    <>
      <div ref={bgRef} className="createPostModal__body-textarea">
        <textarea
          ref={textRef}
          maxLength={250}
          name=""
          id=""
          rows={type2 ? 2 : 5}
          value={text}
          placeholder={`What's on your mind, ${user.first_name}`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(
                    (textRef.current &&
                      textRef.current.value.length * 0.1 - 20) ||
                      0
                  )
                : "0"
            }%`,
          }}
        ></textarea>
      </div>
      <div className="createPostModal__body-emojis">
        {!type2 ? (
          <>
            <Popover
              placement="bottomLeft"
              content={
                <div className="createPostModal__body-backgrounds">
                  <div
                    onClick={() => removeBackground()}
                    className="createPostModal__body-backgrounds-no_bg"
                  ></div>
                  {postBackgrounds.map((background, i) => {
                    return (
                      <img
                        src={background}
                        alt=""
                        key={i}
                        onClick={() => backgroundHandler(i)}
                      />
                    );
                  })}
                </div>
              }
            >
              <img
                onClick={() => setShowBackground((prev) => !prev)}
                src="/icons/colorful.png"
                alt=""
              />
            </Popover>
            <Popover
              placement="bottomRight"
              content={<EmojiPicker onEmojiClick={handleEmoji} />}
            >
              <i
                className="emoji_icon_large"
                onClick={() => setPicker((prev) => !prev)}
              ></i>
            </Popover>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
