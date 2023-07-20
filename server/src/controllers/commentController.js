import Post from "../model/Post.js";

export const handleAddComment = async (req, res) => {
  console.log("🚀 ~ handleAddComment:", req.body);

  try {
    const newPost = await Post.findByIdAndUpdate(
      req.body.post,
      {
        $push: {
          comments: {
            text: req.body.text,
            owner: req.user,
          },
        },
      },
      { new: true }
    ).populate({
      path: "comments.owner",
      select: "username email image",
    });
    console.log("🚀 ~ newPost:", newPost);

    res.send({ success: true, post: newPost });
  } catch (error) {
    console.log("🚀 ~ error handleAddComment:", error.message);

    res.send("Error in handleAddComment" + error.message);
  }
};
export const handleDeleteComment = async (req, res) => {
  console.log("🚀 ~ handleDeleteComment:", req.params);

  try {
    const newPost = await Post.findByIdAndUpdate(
      {
        _id: req.params.post,
        comments: {
          $elemMatch: {
            "comments.$.owner": req.user, // match the comment owner with current user
          },
        },
      },
      {
        $pull: {
          comments: {
            _id: req.params.comment,
          },
        },
      },
      {
        new: true,
      }
    ).populate({
      path: "comments.owner",
      select: "username email image",
    });
    console.log("🚀 ~ newPost:", newPost);

    res.send({ success: true, post: newPost });
  } catch (error) {
    console.log("🚀 ~ error handleDeleteComment:", error.message);

    res.send("Error in handleDeleteComment" + error.message);
  }
};
export const handleEditComment = async (req, res) => {
  console.log("🚀 ~ handleEditComment:", req.body);

  try {
    const newPost = await Post.findByIdAndUpdate(
      {
        _id: req.body.post,
      },
      {
        $set: {
          // updates an item in an array
          "comments.$[elem].text": req.body.text,
        },
      },
      {
        arrayFilters: [
          { "elem._id": req.body.commentId, "elem.owner": req.user },
        ],
        new: true,
      }
    ).populate({
      path: "comments.owner",
      select: "username email image",
    });
    console.log("🚀 ~ newPost:", newPost);

    res.send({ success: true, post: newPost });
  } catch (error) {
    console.log("🚀 ~ error handleEditComment:", error.message);

    res.send("Error in handleEditComment" + error.message);
  }
};
