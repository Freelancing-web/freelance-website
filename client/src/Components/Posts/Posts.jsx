import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { getPostsSuccess } from "../../redux/slices/Post-slice";
export default function Posts() {
  let { loading, error, posts } = useSelector((state) => state.post);
  console.log("posts", posts);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/posts/user-posts", {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok == false) {
          return;
        }

        if (res.ok) {
          setPosts(data);
          dispatch(getPostsSuccess(data));
        }
      } catch (error) {}
    };
    getData();
  }, [dispatch]);
  console.log("post me", posts);
  async function handleDelete(id) {
    await axios
      .delete(`/api/posts/delete/${id}`)
      .then((d) => {
        window.location.reload();
        toast.success("Post Deleted Successfully...");
      })
      .catch((er) => {
        toast.error(er.response.data);
      });
  }
  return (
    <div className="flex flex-col mt-[20px] gap-6 ">
      {error && <span>Error</span>}

      {loading ? (
        <Spinner />
      ) : posts ? (
        posts.length > 0 ? (
          posts.map((post) => (
            <>
              <div
                key={post._id}
                className="max-w-[640px] w-full mt-4 mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Header */}
                <div className="bg-white px-4 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src="https://via.placeholder.com/50"
                        alt="Profile"
                      />
                      <div className="ml-2">
                        <p className="font-semibold text-sm">
                          {post.author.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {post.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex  items-center gap-3">
                      <Link to={`/posts/edit/${post._id}`}>
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleDelete(post._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="px-4 py-2">
                  <span>{post.title}</span>
                  <p className="text-base">{post.content}</p>
                  {post.image && (
                    <img
                      className="mt-2 rounded-lg"
                      src={post.image}
                      alt="Post"
                    />
                  )}
                </div>
                {/* Actions */}
                <div className="flex justify-between items-center px-4 py-2 bg-white">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      Like
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          "User Has Not Posts Yet"
        )
      ) : (
        "There is not posts"
      )}
    </div>
  );
}
