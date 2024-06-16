import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import moment from "moment";
import { DarkModeContext } from "../context/darkModeContext";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () => makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className={`comments ${darkMode ? "text-whitesmoke" : "text-gray-800"}`}>
      <div className="write flex items-center justify-between gap-5 my-5">
        <img
          src={"/upload/" + currentUser.profilePic}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <input
          type="text"
          value={desc}
          placeholder="Write a comment..."
          onChange={(e) => setDesc(e.target.value)}
          className={`flex-1 p-2 border ${darkMode ? "bg-[#333] text-whitesmoke border-gray-600" : "bg-white text-gray-800 border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        data.map((comment) => (
          <div key={comment.id} className="comment flex justify-between gap-5 my-7">
            <img
              src={"/upload/" + comment.profilePic}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="info flex-1 flex flex-col gap-1">
              <span className="font-semibold">{comment.name}</span>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{comment.desc}</p>
            </div>
            <span className="date text-xs text-gray-500 self-center">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
