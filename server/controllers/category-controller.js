import cloudinary from "../config/cloud.js";
import { categoryModel } from "../Models/category-model.js";
export const createCategory = async (req, res) => {
  try {
    console.log("user started");
    const { categoryName } = req.body;
    const currentUser = req.user.id;
    console.log(currentUser);

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
    const newCat = new categoryModel({
      categoryName,
      author: currentUser,
    });
    await newCat.save();
    console.log("steeal");
    return res.status(200).json(newCat);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    console.log("started");
    const posts = await categoryModel
      .find({ author: req.user.id })
      .populate({
        path: "author",
        model: "User",
      })
      .sort({ createdAt: -1 });
    if (!posts) return res.status(200).json("User Posts not found");

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// delete post
export const deletePost = async (req, res) => {
  try {
    const deletePost = await categoryModel.findByIdAndDelete(req.params.id);
    if (deletePost) return res.status(200).json("Post Deleted Success");
  } catch (error) {
    return res.status(200).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  try {
    let updatedFields = {
      title: req.body.title,
      content: req.body.content,
    };

 

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

    const updatePost = await categoryModel.findByIdAndUpdate(
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
