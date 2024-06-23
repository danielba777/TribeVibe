import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { useContext, useState, useEffect } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { DarkModeContext } from "../context/darkModeContext";
import Loader from './Loader'

const Post = ({ post }) => {

  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () => makeRequest.get("/likes?postId=" + post.id).then((res) => res.data)
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  useEffect(() => {
    if (menuOpen) {
      setTimeout(function(){
        setMenuOpen(false)
      }, 3000)
    }
  },[menuOpen])

  return (
    <div className={`shadow-lg rounded-2xl mb-2 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={"/upload/" + post.profilePic}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <Link
                to={`/profile/${post.userId}`}
                className="text-lg font-semibold text-inherit no-underline"
              >
                <span>{post.name}</span>
              </Link>
              <span className="text-sm">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {!menuOpen && <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />}
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete} className="ml-3 text-sm text-red-500">Delete</button>
          )}
        </div>
        <div className="my-5">
          <p>{post.desc}</p>
          {post.img && (
            <img
              src={"/upload/" + post.img}
              alt=""
              className="w-full max-h-96 object-cover mt-5 rounded-lg"
            />
          )}
        </div>
        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleLike}>
            {isLoading ? (
              <Loader />
            ) : data?.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon className="text-red-500" />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            {post.likeCount} Likes
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            {post.commentCount} Comments
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;

