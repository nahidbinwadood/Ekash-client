/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import image from "../assets/Login/login-bg.jpg";
import { FaLock } from "react-icons/fa";
import "./login.css"
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner4 } from "react-icons/im";
import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
const LoginNumber = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setUser}=useAuth();
  const navigate=useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async (userInfo) => {
      const { data } = await axiosPublic.post("/login-number", userInfo);
      setUser(data)
      return data;
    },
    onSuccess: () => {
      toast.success("Login Successfully");
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
      setLoading(false);
    },
  });
   
  const handleSubmit =async(e) => {
     e.preventDefault();
     const form=e.target;
     const number=form.number.value;
     const pin=form.pin.value
     const user = {
      number,
      pin,
    };
     await mutateAsync(user);
     navigate("/")
     setLoading(false)
  };
   
  return (
    <div
      className="w-full bg-center bg-cover md:h-[100vh]  flex flex-col md:flex-row gap-12 md:gap-0 "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),url(${image})`,
      }}
    >
      <div className="md:w-1/2 mt-16 md:mt-0 flex items-center justify-center  h-full">
        <div>
          <div className="cursor-pointer flex items-center">
             
            <div className="text-2xl md:text-4xl lg:text-5xl font-lora font-semibold text-white">
              <h2 className="">Ekash </h2> 
            </div>
          </div>
          <div className="font-lora text-white opacity-90 ml-6 pt-6">
            <h2 className="md:text-2xl flex">
              <FaQuoteLeft className="-mt-2" />
              Your Success, Our Commitment
              <FaQuoteRight className="-mt-2" />
            </h2>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center mx-4">
        <div className="bg-white md:px-10 md:py-16 rounded-lg px-6 py-4">
          {/* Title */}

          <div className="flex flex-col gap-4 font-roboto py-8">
            <h2 className="font-bold text-2xl md:text-4xl ">Login</h2>
            <h2 className="font-roboto text-gray-700">
              Enter your credentials and get ready to explore !
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <FaEnvelope className="size-5 text-[#6B6C6C]" />
                <input  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type="number"
                  name="number"
                  placeholder="Your Number"
                  id=""
                  required
                />
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="space-y-4">
              <div className="relative flex items-center gap-5">
                <FaLock className="size-5 text-[#6B6C6C]" />
                <input  placeholder="Your Pin"
                  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type={showPassword ? "number" : "password"}
                  name="pin"
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <FaEye className="absolute top-1/3 right-2 cursor-pointer text-[#6B6C6C]" />
                  ) : (
                    <FaEyeSlash className="absolute top-1/3 right-2 cursor-pointer text-[#6B6C6C]" />
                  )}
                </span>
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div>
              <h2 className="font-roboto font-semibold text-[#3852c2]">
                <Link to="/login" className="text-[#3852c2] font-bold">
                  Login With Email?
                </Link>{" "}
              </h2>
            </div>
            <div>
              <div className="pb-4">
                <button className="cursor-pointer  text-center font-roboto transition duration-150 font-medium text-lg btn-grad px-8 py-3 w-full">
                  {loading ? (
                    <ImSpinner4 className="animate-spin m-auto size-5" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              
            </div>
            <div className="w-full pt-6 text-[#6B6C6C] text-center font-medium font-roboto">
              <h2>
                Doesn't have an account ?{" "}
                <Link to="/register" className="text-[#3852c2] font-bold">
                  Register Now
                </Link>{" "}
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginNumber;
