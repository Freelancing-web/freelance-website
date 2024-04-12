import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {

  getProjectsFail,
  getProjectsSuccess,
} from "../redux/project-slice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "flowbite-react";
import ProjectCard from "./projects/ProjectCard";
export default function Project() {
  let { projects, loading, error } = useSelector((state) => state.project);
  const dispatch = useDispatch();

 
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/projects/user-projects", {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok == false) {
          getProjectsFail(data);
          return;
        }

        if (res.ok) {
          dispatch(getProjectsSuccess(data));
        }
      } catch (error) {
        dispatch(getProjectsFail(error));
      }
    };
    getData();
  }, []);
  async function handleDelete(id) {
    alert("as");
    await axios
      .delete(`/api/projects/delete/${id}`)
      .then((d) => {
        console.log(d);

        toast.success("Project Deleted Successfully...");
        nav("/projects");
      })
      .catch((er) => {});
  }
  console.log(projects);
  return (
    <div className=" ">
      {loading ? (
        <>
          <span>Loading Projects</span>
          <Spinner className="ml-3" />
        </>
      ) : projects.length > 0 ? (
        projects?.map((p) => (
          <>
            {/* <div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
              <a
                class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                href="#"
              >
                <img class="object-cover" src={p.image} alt="product image" />
                <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  39% OFF
                </span>
              </a>
              <div class="mt-4 px-5 pb-5">
                <a href="#">
                  <h5 class="text-xl tracking-tight text-slate-900">
                    {p.title}
                  </h5>
                </a>
                <div class="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span class="text-3xl font-bold text-slate-900">
                      {p.rice}
                    </span>
                    <span class="text-sm text-slate-900 line-through">
                      {p.price}
                    </span>
                  </p>
                  <div class="flex items-center">
                    <svg
                      aria-hidden="true"
                      class="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                      {p.rating}
                    </span>
                  </div>
                </div>
                <a
                  href="#"
                  class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </a>
              </div>
            </div> */}
            <ProjectCard
              title={p.title}
              price={p.price}
              rating={p.rating}
              description={p.description}
              image={p.image}
            />
          </>
        ))
      ) : (
        <div className="mt-5 flex  flex-col  items-center justify-center  gap-2 mb-[30px]">
          <span className="text-red-900 text-center p-5">
           Projects Not Found 
          </span>
            {error && <span className="text-red-900">Error : {error}</span>}
            <Spinner className="ml-5" />
        </div>
      )}
    </div>
  );
}
