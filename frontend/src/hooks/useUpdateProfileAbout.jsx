import  { useContext, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { AuthContext } from "../context/AuthContext";

const useUpdateProfileAbout = ({ setIsAboutEdit }) => {
  const [loading, setLoading] = useState(false);

  const { authUser, setAuthUser } = useContext(AuthContext);
  const { setViewProfile } = useConversation();
  const updateProfileAbout = async (about) => {
    try {
      setLoading(true);
      const response = await fetch("/api/user/update/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });
      const data = await response.json();
      setViewProfile(data.data);
      setAuthUser(data.data);
      localStorage.setItem("chat-user", JSON.stringify(data.data));
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
      setIsAboutEdit(false);
    }
  };
  return { loading, updateProfileAbout };
};

export default useUpdateProfileAbout;
