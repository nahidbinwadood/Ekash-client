import { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import {
  FaHandHoldingDollar,
  FaMoneyBillTransfer,
  FaMoneyBillTrendUp,
  FaUsersGear,
} from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import MenuItem from "./MenuItems";
import { IoCashOutline, IoLogOutSharp } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { BiTransfer } from "react-icons/bi";
import { LuMonitorDot } from "react-icons/lu";
import useAuth from "../Hooks/useAuth";
//import useAuth from "../Hooks/useAuth";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const { user } = useAuth();
  const role=user.role;
  const navigate = useNavigate();
 
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleLogOut = () => {
    localStorage.removeItem("access-token");
    navigate("/login");
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-slate-800 text-gray-800 flex justify-between lg:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <div className="cursor-pointer pl-2 flex justify-center items-center">
                <div className="text-lg font-lora font-semibold">
                  <h2 className="text-[#fff]">Elite Estate</h2>
                  <h2 className="text-[#fff]"> Solutions</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button px-4 py-2 transition duration-200 ease-in-out focus:outline-none  "
        >
          {isActive ? (
            <ImMenu className="size-6 text-white" />
          ) : (
            <AiFillCloseSquare className="size-6 text-white" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-slate-800 min-w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className=" hidden md:flex pt-4">
              <Link to="/">
                <div className="cursor-pointer pl-5 flex justify-center ">
                  <div className="text-4xl font-lora font-semibold">
                    <h2 className="text-[#fff]">Ekash</h2>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="">
            {/*  Menu Items */}

            {/* <----User----> */}
            {role === "user" && (
              <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="font-lora ">
                  {/* My Profile */}
                  <MenuItem
                    label={"My Profile"}
                    address={"/user-profile"}
                    icon={CgProfile}
                  ></MenuItem>
                  <MenuItem
                    label={"Send Money"}
                    address={"/send-money"}
                    icon={FaMoneyBillTrendUp}
                  ></MenuItem>
                  <MenuItem
                    label={"Cash In"}
                    address={"/cash-in"}
                    icon={FaHandHoldingDollar}
                  ></MenuItem>
                  <MenuItem
                    label={"Cash Out"}
                    address={"/cash-out"}
                    icon={IoCashOutline}
                  ></MenuItem>
                  <MenuItem
                    label={"Transactions History"}
                    address={"/user-transactions"}
                    icon={GrTransaction}
                  ></MenuItem>
                </nav>
              </div>
            )}
            {/* <----Agent----> */}
            {role === "agent" && (
              <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="font-lora ">
                  {/* Agent Profile */}
                  <MenuItem
                    label={"Agent Profile"}
                    address={"/user-profile"}
                    icon={CgProfile}
                  ></MenuItem>
                  <MenuItem
                    label={"Transaction Management"}
                    address={"/dashboard/agent-transaction"}
                    icon={FaMoneyBillTransfer}
                  ></MenuItem>
                  <MenuItem
                    label={"Transactions History"}
                    address={"/dashboard/agent-transaction-history"}
                    icon={BiTransfer}
                  ></MenuItem>
                </nav>
              </div>
            )}
            {/* <----Admin----> */}
            {role === "admin" && (
              <div className="flex  flex-col justify-between flex-1 mt-6">
                <nav className="font-lora ">
                  {/* Admin Profile */}
                  <MenuItem
                    label={"Admin Profile"}
                    address={"/admin-profile"}
                    icon={MdAdminPanelSettings}
                  ></MenuItem>
                  <MenuItem
                    label={"User Management"}
                    address={"/user-management"}
                    icon={FaUsersGear}
                  ></MenuItem>
                  <MenuItem
                    label={"System Monitoring"}
                    address={"/system-monitor"}
                    icon={LuMonitorDot}
                  ></MenuItem>
                </nav>
              </div>
            )}
          </div>
        </div>
        <div>
          <nav className="font-lora ">
            <button onClick={handleLogOut} className="w-full">
              <MenuItem label={"Logout"} icon={IoLogOutSharp}></MenuItem>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
