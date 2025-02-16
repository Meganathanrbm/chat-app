import { useContext, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { AuthContext } from "../context/AuthContext";
import { APIResponseTy, useUpdateProfileAboutProps } from "../types/hooks";
import { UserBaseType } from "../types";

const useUpdateProfileAbout = ({
  setIsAboutEdit,
}: useUpdateProfileAboutProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { authUser, setAuthUser } = useContext(AuthContext);
  const { setViewProfile } = useConversation();
  const updateProfileAbout = async ({
    about,
  }: {
    about: string;
  }): Promise<void> => {
    try {
      console.log(about);
      setLoading(true);
      const response = await fetch("/api/user/update/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ about }),
      });
      const data: APIResponseTy<UserBaseType> = await response.json();
      if (data.data) {
        setViewProfile(data.data);
        setAuthUser(data.data);

        localStorage.setItem("chat-user", JSON.stringify(data.data));
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setIsAboutEdit(false);
    }
  };
  return { loading, updateProfileAbout };
};

export default useUpdateProfileAbout;
