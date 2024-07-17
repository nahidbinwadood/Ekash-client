/* eslint-disable react/no-unescaped-entities */
import useAuth from "../../Hooks/useAuth";
import { FaEye, FaEyeSlash, FaLock, FaPhone } from "react-icons/fa6";
import { PiMoneyWavyFill } from "react-icons/pi";
import { ImSpinner4 } from "react-icons/im";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SendMoney = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const number = form.number.value;
    const amount = form.amount.value;
    const pin = form.pin.value;
    const transactionInfo = {
      User: user.name,
      UserEmail: user.email,
      sentTo: number,
      amount,
      transactionType: "sendMoney",
      pin,
    };
    if (user.balance >= amount) {
      try {
        const { data } = await axiosSecure.patch(
          `/users/sendMoney/${user?.email}`,
          transactionInfo
        );
        console.log(data);
        toast.success("Property rejected successfully!");
      } catch (err) {
        toast.error(err.message);
      }

      setLoading(false);
    } else {
      toast.error("Enter a valid amount between your balance");
      setLoading(false);
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center bg-red-500">
      {/* <div className="bg-slate-100 p-8 rounded-xl">
        <div>
          <h2 className="text-4xl font-bold text-center">Send Money</h2>
        </div>
        <div className="font-semibold text-xl pt-6 space-y-2">
          <h2>Name : {user.name}</h2>
          <h2>Email : {user.email}</h2>
          <h2>Mobile : {user.number}</h2>
          <h2>Role : {user.role}</h2>
          <h2>Status : {user.status}</h2>
        </div>

        <div className="pt-5">
          <h2 className="font-semibold text-2xl text-center p-2 border-2 border-gray-200 rounded-xl">
            Balance : {user.balance}.00
          </h2>
        </div>
      </div> */}
      <div className="md:w-1/2 flex items-center justify-center mx-4">
        <div className="bg-white md:px-10 md:py-16 rounded-lg px-6 py-4">
          {/* Title */}

          <div className="flex flex-col gap-4 font-roboto py-8">
            <h2 className="font-bold text-2xl md:text-4xl text-center ">
              Send Money
            </h2>
            <h2 className="font-roboto text-gray-700">
              Effortlessly transfer funds. Enter your credentials to begin
              sending money securely and swiftly!
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <FaPhone className="size-5 text-[#6B6C6C]" />
                <input
                  required
                  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type="number"
                  name="number"
                  placeholder="Your User Number"
                  id=""
                />
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <PiMoneyWavyFill className="size-5 text-[#6B6C6C]" />
                <input
                  required
                  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type="number"
                  name="amount"
                  placeholder="Your Amount"
                  id=""
                />
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="space-y-4">
              <div className="relative flex items-center gap-5">
                <FaLock className="size-5 text-[#6B6C6C]" />
                <input
                  required
                  placeholder="Enter Your Pin"
                  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type={showPassword ? "number" : "password"}
                  name="pin"
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
              <div className="pb-4">
                <button className="cursor-pointer  text-center font-roboto transition duration-150 font-medium text-lg btn-grad px-8 py-3 w-full">
                  {loading ? (
                    <ImSpinner4 className="animate-spin m-auto size-5" />
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
