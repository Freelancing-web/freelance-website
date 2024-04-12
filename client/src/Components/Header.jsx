import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLocation } from "react-router-dom";
// import { toggleTheme } from "../redux/slices/Themes/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/theme-slice";
import { signout } from "../redux/user-slice";

export default function Header() {
  const dispath = useDispatch();

  // const {theme } =  useSelector((state)=>state.theme)

  const { currentUser } = useSelector((state) => state.user);
  const theme = "ligh";
  const location = useLocation().pathname;

  return (
    <>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className=" flex items-center whitespace-nowrap text-sm sm:text-xl"
        >
          <span className="px-2 py-1 bg-gradient-to-r  from-indigo-500 rounded-lg text-white via-purple-500 to-pink-500">
            Som
          </span>
          <span className="px-2">FreeLancers</span>
        </Link>
       
        <div className="flex gap-2  md:order-1 items-center">
          <Button
            className="w-10 h-10 rounded-full hidden sm:flex "
            color="gray"
            onClick={() => {
              dispath(toggleTheme());
            }}
          >
            {theme === "llight" ? <FaSun /> : <FaMoon />}
          </Button>
          {currentUser ? (
            <img
              className="w-[50px] rounded-full object-center object-cover h-[50px]"
              src={currentUser.rest.photoUrl}
              alt=""
            />
          ) : (
            <>
              <Link to = {'/login'} className="bg-red-900  bg-gradient-to-r from-purple-500 to-blue-500">
                login
              </Link>
            </>
          )}

          <Navbar.Toggle></Navbar.Toggle>
        </div>

        <Navbar.Collapse>
          {currentUser ? (
            <>
              <Navbar.Link active={location === "/"} as={"div"}>
                <Link to="/">Home</Link>
              </Navbar.Link>
              <Navbar.Link as={"div"}>
                <Link to="/add-post">Add Post</Link>
              </Navbar.Link>
              <Navbar.Link as={"div"}>
                <Link to="/add-project">Add Project</Link>
              </Navbar.Link>
              <Navbar.Link as={"div"}>
                <Link to="/jobs">Jobs</Link>
              </Navbar.Link>
              <Navbar.Link as={"div"}>
                <Link to="/">Posts</Link>
              </Navbar.Link>
              <Navbar.Link onClick={()=>dispath(signout())} active={location === "/sign-up"} as={"div"}>
               Sign Out
              </Navbar.Link>
          
              <Navbar.Link active={location === "/about"} as={"div"}>
                <Link to="/about">about</Link>
              </Navbar.Link>

              <Navbar.Link active={location === "/projects"} as={"div"}>
                <Link to="/projects">Projects</Link>
              </Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link active={location === "/sign-up"} as={"div"}>
                <Link to="/register">Sign Up</Link>
              </Navbar.Link>
              <Navbar.Link active={location === "/about"} as={"div"}>
                <Link to="/about">about</Link>
              </Navbar.Link>
              <Navbar.Link active={location === "/sign-in"} as={"div"}>
                <Link to="/login">Sign In</Link>
              </Navbar.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}


