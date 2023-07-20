import Popover from "@mui/material/Popover";
import { useContext, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { AppContext } from "./Context";
import Modal from "./Modal";

function Comment({ comment, post }) {
  const { state, dispatch } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(comment.text);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDeleteComment = async () => {
    const response = await axios.delete(
      `/comments/delete/${post}/${comment._id}`
    );
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      dispatch({
        type: "ADD_COMMENT", // WORKS THE SAME WITH ADD COMMENT
        payload: response.data.post,
      });
    }
  };

  const handleOpenModal = () => {
    setAnchorEl(null);
    setShowModal(true);
  };

  const handleEditSubmit = async () => {
    console.log("submitted");

    const response = await axios.post("/comments/edit", {
      post,
      commentId: comment._id,
      text: commentToEdit,
    });
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      dispatch({
        type: "ADD_COMMENT",
        payload: response.data.post,
      });

      setShowModal(false);
    }
  };

  return (
    <div>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            className="object-cover w-[3rem] h-[2rem] rounded-full"
            src={comment?.owner?.image}
            alt=""
          />
        </div>
        <textarea
          id="chat"
          rows="1"
          value={comment.text}
          disabled
          className="block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
        {state.user._id === comment.owner._id ? (
          <div className="grow flex justify-end">
            <button className="cursor-pointer">
              <GoKebabHorizontal
                className="text-white"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              />
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
                <div
                  onClick={handleOpenModal}
                  className="w-[200px] p-4 cursor-pointer hover:bg-slate-400 gap-[1rem] flex items-center"
                >
                  Edit
                  <AiFillEdit className="text-[20px] text-red-500 cursor-pointer hover:text-lime-500" />
                </div>
                <hr />
                <div
                  onClick={handleDeleteComment}
                  className="w-[200px] p-4 cursor-pointer hover:bg-slate-400 flex items-center "
                >
                  Delete
                  <MdDeleteForever className="text-[20px] text-red-500 cursor-pointer hover:text-lime-500" />
                </div>
              </Popover>
            </button>
          </div>
        ) : null}
      </div>
      {showModal && (
        <Modal
          title="Edit comment"
          close={() => setShowModal(false)}
          text={commentToEdit}
          setText={setCommentToEdit}
          handleSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}

export default Comment;
