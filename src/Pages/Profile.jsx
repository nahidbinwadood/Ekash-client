import { BsPersonCircle } from "react-icons/bs";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Profile = () => {
  const { user ,setUser} = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: currentUser = [], refetch } = useQuery({
    queryKey: ["currentUser", ],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user.email}`);
      setUser(data);
      return data;
    },
  });
 

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-slate-400 p-8 rounded-xl">
        <div>
          <BsPersonCircle className="size-16" />
        </div>
        <div className="font-semibold text-xl pt-6 space-y-2">
          <h2>Name : {currentUser.name}</h2>
          <h2>Email : {currentUser.email}</h2>
          <h2>Mobile : {currentUser.number}</h2>
          <h2>Role : {currentUser.role}</h2>
          <h2>Status : {currentUser.status}</h2>
        </div>

        <div className="pt-5">
          <h2 className="font-semibold text-2xl text-center p-2 border-2 border-gray-200 rounded-xl">
            Balance : {currentUser.balance}.00 Taka
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
