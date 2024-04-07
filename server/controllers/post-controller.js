import cloudinary from "../config/cloud.js";
import { postModel } from "../Models/post-model.js";
import { errorHandler } from "../utils/error-handler.js";
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if(!title || !content) return res.status(400).json('Title  Or Content Required')
    const currentUser = req.user.id;
   

    let result;

    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
    }
    console.log("result", result);
    console.log("contineu");
    const newPost = new postModel({
      title,
      content,
      image: result?.url || null,
      author: currentUser,
    });
    await newPost.save();
    console.log("steeal");
    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const getUserPosts = async (req, res,next) => {
  try {
   
    const posts = await postModel
      .find({ author: req.user.id })
      .populate({
        path: "author",
        model: "User",
      })
      .sort({ createdAt: -1 });
    if (!posts) return next(errorHandler(200,'User Has Not Posts Yet .'))

    return res.status(200).json(posts);
  } catch (error) {
   next(error)
  }
};

// delete post
export const deletePost = async (req, res) => {
  try {
    const deletePost = await postModel.findByIdAndDelete(req.params.id);
    if (deletePost) return res.status(200).json("Post Deleted Success");
  } catch (error) {
    return res.status(200).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  console.log('reqoby',req.body)
  try {
    let updatedFields = {
      title: req.body.title,
      content: req.body.content,
    };

 
console.log('req file',req.file)
    let result;

    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;


      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
      updatedFields.image = result.url;
    }

    const updatePost = await postModel.findByIdAndUpdate(
      postId,
      updatedFields,
      { new: true }
    );
    if (!updatePost) return res.status(404).send("Post not found");

    return res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
