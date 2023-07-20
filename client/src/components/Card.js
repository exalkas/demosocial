import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { GoKebabHorizontal } from "react-icons/go";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "./Context";
import Spinner from "./Spinner";
import Modal from "./Modal";
import NewComment from "./NewComment.js";
import Comment from "./Comment.js";

function Card({ item }) {
  const { text, owner, _id, likes } = item;

  const { state, dispatch } = useContext(AppContext);

  const [showSpinner, setShowSpinner] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState(item.text);

  const handleLike = async () => {
    setShowSpinner(true);
    const response = await axios.post("/posts/like", { post: _id });
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      dispatch({
        type: "LIKE",
        payload: response.data.post,
      });
    }

    setShowSpinner(false);
  };

  const handleEditClick = (item) => {
    setShowModal(true);
    setAnchorEl(null);
  };

  const handleEditSubmit = async () => {
    if (item.text === postToEdit) return; // there is no change between current text and submitted text
    if (!postToEdit.trim()) return; // if new text is empty return

    const response = await axios.post("/posts/edit", {
      ...item,
      text: postToEdit,
    });
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      setShowModal(false);
      dispatch({
        type: "LIKE",
        payload: response.data.post,
      });
    }
  };

  const handleDeleteClick = async () => {
    const response = await axios.delete("/posts/delete/" + item._id);
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      dispatch({
        type: "DELETE_POST",
        payload: item._id,
      });

      setShowModal(false);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log("🚀 ~ item:", item);
  return (
    <div className="flex flex-col gap-[20px] border-2 border-slate-500 rounded-md w-[400px]  p-[20px]">
      {/* Header */}
      <div className="flex items-center gap-[10px] w-full justify-end">
        <div className="grow flex justify-end">
          <button className="cursor-pointer">
            {state.user._id === item.owner._id ? (
              <GoKebabHorizontal
                onClick={(e) => setAnchorEl(e.currentTarget)}
              />
            ) : null}
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography
              sx={{ p: 2 }}
              className="cursor-pointer"
              onClick={handleEditClick}
            >
              Edit
            </Typography>
            <hr />
            <Typography
              sx={{ p: 2 }}
              className="cursor-pointer"
              onClick={handleDeleteClick}
            >
              Delete
            </Typography>
          </Popover>
        </div>
      </div>
      <hr />
      {/* Text */}
      <p>{text}</p>

      <hr />
      {/* Likes and comments area */}
      <div className="flex justify-around items-center">
        {likes.find((user) => user._id === state.user._id) ? (
          <div className="flex gap-[20px] items-center h-[3rem]">
            {showSpinner ? (
              <Spinner />
            ) : (
              <AiFillHeart
                className="text-red-500 text-[2rem] cursor-pointer w-[3rem]"
                onClick={handleLike}
              />
            )}
            <span>Likes</span>
          </div>
        ) : (
          <div className="flex gap-[20px] items-center h-[3rem]">
            {showSpinner ? (
              <Spinner />
            ) : (
              <AiOutlineHeart
                className="text-red-500 text-[2rem] cursor-pointer w-[3rem]"
                onClick={handleLike}
              />
            )}
            <span>Likes</span>
          </div>
        )}

        <FaRegComments className="text-slate-500 hover:text-red-500 text-[2rem] cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col gap-[10px]">
        <NewComment post={item._id} />
        <div className="flex flex-col gap-[10px]">
          {item.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} post={_id} />
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          title="Edit post"
          close={() => setShowModal(false)}
          text={postToEdit}
          setText={setPostToEdit}
          handleSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}

export default Card;
