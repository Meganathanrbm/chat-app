import { useEffect, useState } from "react";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/allUsers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setAllUsers(data.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);
  return { loading, allUsers };
};

export default useGetAllUsers;
