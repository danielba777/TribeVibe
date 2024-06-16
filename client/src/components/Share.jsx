import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from '../axios.js';
import { DarkModeContext } from "../context/darkModeContext";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className={`shadow-lg rounded-2xl p-5 mb-5 ${darkMode ? 'bg-zinc-900 text-whitesmoke' : 'bg-white text-gray-800'}`}>
      <div className="flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={"/upload/" + currentUser.profilePic}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <input 
            type="text" 
            value={desc} 
            placeholder={`What's on your mind, ${currentUser.name}?`} 
            onChange={(e) => setDesc(e.target.value)} 
            className={`flex-1 p-2 rounded-md border-none focus:ring-1 focus:ring-blue-500 bg-transparent ${darkMode ? 'text-white' : ''}`}
          />
        </div>
        {file && <img className="max-w-full h-auto rounded-lg mb-4" alt="" src={URL.createObjectURL(file)} />}
        <hr className={`mb-4 ${darkMode ? 'border-zinc-500' : ''}`} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input 
              type="file" 
              id="file" 
              style={{ display: "none" }} 
              onChange={(e) => setFile(e.target.files[0])} 
            />
            <label htmlFor="file" className="flex items-center gap-2 cursor-pointer">
              <img src={Image} alt="" className="w-5 h-5" />
              <span className="text-sm text-gray-500">Add Image</span>
            </label>
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={Map} alt="" className="w-5 h-5" />
              <span className="text-sm text-gray-500">Add Place</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={Friend} alt="" className="w-5 h-5" />
              <span className="text-sm text-gray-500">Tag Friends</span>
            </div>
          </div>
          <button 
            onClick={handleClick} 
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
