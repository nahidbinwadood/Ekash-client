import { BsPersonCircle } from "react-icons/bs";
import useAuth from "../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-slate-400 p-8 rounded-xl">
        <div>
          <BsPersonCircle className="size-16" />
        </div>
        <div className="font-semibold text-xl pt-6 space-y-2">
          <h2>Name : {user.name}</h2>
          <h2>Email : {user.email}</h2>
          <h2>Mobile : {user.number}</h2>
          <h2>Role : {user.role}</h2>
          <h2>Status : {user.status}</h2>
        </div>
         
        <div className="pt-5">
            <h2 className="font-semibold text-2xl text-center p-2 border-2 border-gray-200 rounded-xl">Balance : {user.balance}.00</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
