import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = () => {
  // Verwende die neue Signatur für useQuery
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => makeRequest.get("/posts").then((res) => res.data)
  });

  // Debugging Information
  console.log("Loading:", isLoading);
  console.log("Error:", error);
  console.log("Data:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="posts">
      {error ? 
        "Something went wrong!" : 
        (isLoading ? 
        "loading" : 
        data.map((post) => (
        <Post post={post} key={post.id} /> )
      ))}
    </div>
  );
};

export default Posts;
