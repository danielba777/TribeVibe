import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { DarkModeContext } from "../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Loader from "./Loader";

const Posts = ({ userId }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => makeRequest.get("/posts?userId=" + currentUser.id).then((res) => res.data)
  });

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className={`flex flex-col gap-6 my-8 ${darkMode ? 'bg-[#333] text-white' : 'bg-gray-100 text-gray-800'}`}>
      {error ? 
        "Something went wrong!" : 
        (isLoading ? 
        "loading" : 
        data.map((post) => (
          <Post post={post} key={post.id} /> 
        )
      ))}
    </div>
  );
};

export default Posts;

