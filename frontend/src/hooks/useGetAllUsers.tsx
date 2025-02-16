import { useEffect, useState } from "react";
import { APIResponse } from "../types/hooks";
import toast from "react-hot-toast";
import { UserBaseType } from "../types";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<UserBaseType[] | undefined>();

  useEffect(() => {
    const getAllUsers = async (): Promise<APIResponse | void> => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/allUsers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data: APIResponse = await response.json();
        setAllUsers(data?.data);
      } catch (error) {
        console.log(error);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);
  return { loading, allUsers };
};

export default useGetAllUsers;
