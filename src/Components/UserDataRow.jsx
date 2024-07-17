import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GiCancel } from "react-icons/gi";
import AcceptUserModal from "./Modals/AcceptUserModal";
import RejectModal from "./Modals/RejectModal";

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isReject, setIsReject] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async (update) => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        update
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
      toast.success("User Status updated successfully!");
    },
  });

  //accept:
  const modalHandler = async () => {
    const currentUserBalance = user.balance;
    const role = user.role;
    let updateBalance = 0;
    if (role == "user" && currentUserBalance == 0) {
      updateBalance = 50;
    } else if (role == "agent" && currentUserBalance == 0) {
      updateBalance = 10000;
    }else{
        updateBalance=currentUserBalance
    }
    //  if(currentUserBalance>0){
    //     updateBalance=currentUserBalance;
    //  }else{
    //     updateBalance=50;
    //  }
    const userData = {
      status: "verified",
      balance: updateBalance,
    };
    try {
      await mutateAsync(userData);
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  //reject:
  const modalRejectHandler = async () => {
    const userData = {
      status: "rejected",
    };
    try {
      await mutateAsync(userData);
      setIsReject(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <tr className="font-roboto">
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white  ">
        <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200  bg-white text-center ">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">{user?.status}</p>
      </td>

      {/* make admin */}
      <td className="border-b-2 text-center border-gray-200 bg-white  ">
        <div className="space-x-5">
          <button
            disabled={user.role == "admin"}
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block p-4  disabled:cursor-not-allowed rounded-xl bg-green-300  leading-tight"
          >
            <span aria-hidden="true" className="absolute inset-0 "></span>
            <VscVerifiedFilled className="size-6 relative" />
          </button>
          <button
            disabled={user.role == "admin"}
            onClick={() => setIsReject(true)}
            className="relative cursor-pointer inline-block p-4  disabled:cursor-not-allowed rounded-xl bg-green-300  leading-tight"
          >
            <span aria-hidden="true" className="absolute inset-0 "></span>
            <GiCancel className="size-6 relative" />
          </button>
        </div>

        <AcceptUserModal
          role={"admin"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
        <RejectModal
          role={"admin"}
          isReject={isReject}
          setIsReject={setIsReject}
          modalRejectHandler={modalRejectHandler}
          user={user}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
