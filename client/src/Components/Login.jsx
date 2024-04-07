import React, { useEffect, useState } from "react";

import { Button, Card, Spinner, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user-slice";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  console.log(currentUser);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      dispatch(signInStart());
      const { data } = await axios.post("/api/auth/login", formData);
      console.log(data);
      if (data) {
        dispatch(signInSuccess(data));
        toast.success("User Logged in  Successfully");
        nav("/");
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(signInFailure(error.response.data));
      toast.error(error.response.data);
      // toast.error(error)
      console.log(error);
     
    }
  };
  console.log(formData);

  return (
    <Card href="#" className="max-w-sm m-auto mt-32 hover:bg-white  ">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Login With username or Google Credentials
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">Login Page</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextInput
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.id]: e.target.value,
            })
          }
          id="email"
          type="email"
          placeholder="Enter Email"
        />
        <TextInput
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.id]: e.target.value,
            })
          }
          id="password"
          type="password"
          placeholder="Enter Password"
        />
        <Button disabled = {loading} type="submit">{loading ? <>
        Logging ..
        <Spinner/>
        </>:"Login"}</Button>
        <div className="flex justify-between items-center">
          <span>Don't Have An Account ?</span>
          <Link to={"/register"} className="text-blue-500">
            Register
          </Link>
        </div>
      </form>
    </Card>
  );
}
