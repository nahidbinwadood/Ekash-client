import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaLock, FaPhone } from "react-icons/fa6";
import { PiMoneyWavyFill } from "react-icons/pi";
import { ImSpinner4 } from "react-icons/im";

const CashOut = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const number = form.number.value;
    let amount = form.amount.value;
    const pin = form.pin.value;

    //Conditions:

    const transactionInfo = {
      User: user.name,
      UserEmail: user.email,
      sentTo: number,
      amount,
      transactionType: "cashOut",
      pin,
      status: "pending",
    };

    //Send Request
    try {
      const { data: cashOutRequest } = await axiosSecure.post(
        `/cash-out`,
        transactionInfo
      );
      if (cashOutRequest.insertedId) {
        console.log(cashOutRequest);
        setLoading(false);
        navigate("/user-profile");
        toast.success("Request send for Cash out Successfully!");
      }
    } catch (err) {
      toast.error("Invalid Credentials");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-red-500">
      <div className="md:w-1/2 flex items-center justify-center mx-4">
        <div className="bg-white md:px-10 md:py-16 rounded-lg px-6 py-4">
          {/* Title */}

          <div className="flex flex-col gap-4 font-roboto py-8">
            <h2 className="font-bold text-2xl md:text-4xl text-center ">
              Cash Out
            </h2>
            <h2 className="font-roboto text-gray-700">
              Securely withdraw funds from your account with our easy Cash Out
              feature.
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
                  placeholder="Your Agent Number"
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
                    "Send Request"
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

export default CashOut;
