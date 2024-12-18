import { Link, useNavigate } from "react-router-dom";
import Button from "../ReactComponent/Button";
import { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import itemContext from "@/Store/store";
import useGetAlljob from "@/hooks/useGetAlljob";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

export default function Navbar() {
  let navigate = useNavigate();
  let { user, setUser } = useContext(itemContext);
  useGetAllCompany();
  let handleClick = async () => {
    let res = await axios.get(`${USER_API_END_POINT}/logout`, {
      withCredentials: true,
    });
    if (res.data.success) {
      setUser(null);
      toast.success(res.data.message);
      navigate("/");
    }
  };

  return (
    <nav className="flex bg-primary text-white items-center h-16 !bg-cyan text-lg pl-20 pr-20 w-full fixed top-0 z-20  ">
      <div className="flex items-center w-48">
        <img src="/image/logo.png" className="h-12 w-12" alt="Job ease logo" />

        <h3 className="text-mywhite w-auto font-bold">Job ease</h3>
      </div>
      <ul className="ml-[40rem] flex space-x-6 justify-center w-[40%] items-center list-none">
        {!user ? (
          <>
            {" "}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/job">Job</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
            <li>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </li>
          </>
        ) : (
          <>
            {user.role == "recruiter" ? (
              <>
                <Link to="/admin/companytable">
                  <li>Companies</li>
                </Link>
                <Link to="/admin/job">
                  <li>Jobs</li>
                </Link>

                <div>
                  <Popover>
                    <PopoverTrigger>
                      <img
                        src="/image/messi.jpg"
                        className="h-8 w-8 m-1 rounded-full flex items-center"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="mt-3">
                      <div className="h-auto w-48  ">
                        <div className="flex  space-x-3 ">
                          <img
                            src="/image/messi.jpg"
                            className="h-8 w-8 m-1 rounded-full flex items-center"
                          />
                          <h1 className=" text-xl font-semibold">
                            {user.fullName}
                          </h1>
                        </div>

                        <Link>
                          <div
                            className="flex space-x-3 px-3
                    "
                          >
                            <IoIosLogOut size={30} />
                            <h1 className="text-xl  " onClick={handleClick}>
                              Log Out
                            </h1>
                          </div>
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/job">Job</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>

                <div>
                  <Popover>
                    <PopoverTrigger>
                      <img
                        src="/image/messi.jpg"
                        className="h-8 w-8 m-1 rounded-full flex items-center"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="mt-3">
                      <div className="h-auto w-48  ">
                        <div className="flex  space-x-3 ">
                          <img
                            src="/image/messi.jpg"
                            className="h-8 w-8 m-1 rounded-full flex items-center"
                          />
                          <h1 className=" text-xl font-semibold">
                            {user.fullName}
                          </h1>
                        </div>
                        <Link to="/profile">
                          <div
                            className="flex space-x-3 px-3
                    "
                          >
                            <IoPersonCircleSharp size={30} />
                            <h1 className="text-xl ">Profile</h1>
                          </div>
                        </Link>
                        <Link>
                          <div
                            className="flex space-x-3 px-3
                    "
                          >
                            <IoIosLogOut size={30} />
                            <h1 className="text-xl  " onClick={handleClick}>
                              Log Out
                            </h1>
                          </div>
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}
