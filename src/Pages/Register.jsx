/* eslint-disable react/no-unescaped-entities */
import image from "../assets/Login/login-bg.jpg";

import { FaLock, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import "./login.css";
import { FaEnvelope, FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner4 } from "react-icons/im";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useState } from "react";
import { MdPerson, MdSupportAgent } from "react-icons/md";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async (userInfo) => {
      const { data } = await axiosPublic.post("/users", userInfo);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success("User Created Successfully");
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const pin = form.pin.value;
    const role = form.accountType.value;
    if (pin.length == 5) {
      const userInfo = {
        name,
        email,
        number,
        pin,
        role,
        status: "pending",
        balance: parseFloat(0.0),
      };
      await mutateAsync(userInfo);
      navigate("/login");
    } else {
      toast.error("Pin should be 5 digit !");
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full bg-center bg-cover md:h-[100vh]  flex flex-col md:flex-row-reverse gap-12 md:gap-0 "
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
            <h2 className="font-bold text-2xl md:text-4xl ">Register</h2>
            <h2 className="font-roboto text-gray-700">
              Enter your credentials and get ready to explore !
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <FaUserAlt className="size-5 text-[#6B6C6C]" />
                <input
                  required
                  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  id=""
                />
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <FaEnvelope className="size-5 text-[#6B6C6C]" />
                <input
                  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  id=""
                  required
                />
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="space-y-4 f">
              <div className="flex items-center justify-between pr-8">
                <div className="flex items-center gap-5">
                  <div className="flex items-center">
                    <MdPerson className="text-2xl  text-[#6B6C6C]" />
                    <label className="flex items-center gap-2 ml-2">
                      <input
                        type="radio"
                        name="accountType"
                        value="user"
                        className="form-radio text-[#666868] focus:ring-[#666868]"
                      />
                      <span className="font-roboto font-medium text-[#666868]">
                        User
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center">
                    <MdSupportAgent className="text-2xl text-[#6B6C6C]" />
                    <label className="flex items-center gap-2 ml-2">
                      <input
                        type="radio"
                        name="accountType"
                        value="agent"
                        className="form-radio text-[#666868] focus:ring-[#666868]"
                      />
                      <span className="font-roboto font-medium text-[#666868]">
                        Agent
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <FaPhoneAlt className="size-5 text-[#6B6C6C]" />
                <input
                  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
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
                <input
                  placeholder="Your Pin"
                  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type="number"
                  name="pin"
                  required
                />
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>

            <div>
              <div className="pb-4">
                <button className="cursor-pointer  text-center font-roboto transition duration-150 font-medium text-lg btn-grad px-8 py-3 w-full">
                  {loading ? (
                    <ImSpinner4 className="animate-spin m-auto size-5" />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </div>
            <div className="w-full pt-6 text-[#6B6C6C] text-center font-medium font-roboto">
              <h2>
                Already have an account ?{" "}
                <Link to="/login" className="text-[#3852c2] font-bold">
                  Login
                </Link>{" "}
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
