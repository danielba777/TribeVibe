import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { DarkModeContext } from "../context/darkModeContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import ImageModal from "./ImageModal"
import Loader from "./Loader"

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [file, setFile] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null)

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['stories'],
    queryFn: () => makeRequest.get("/stories").then((res) => res.data)
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const imgUrl = await upload(file);
      if (imgUrl) {
        mutation.mutate({ img: imgUrl });
        setFile(null);
      }
    }
  }

  const handleStoryClick = (imgSrc) => {
    setSelectedStory(imgSrc);
  }

  const closeModal = () => {
    setSelectedStory(null);
  }

  return (
    <>
      <div className="hidden sm:flex gap-2 sm:gap-4 h-64 mb-8 justify-start overflow-x-auto whitespace-nowrap">
        <div className={`inline-block relative w-[200px] rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <img src={"/upload/" + currentUser.profilePic} alt="" className="w-full h-full object-cover" />
          <span className="absolute bottom-2 left-2 text-white font-medium">{currentUser.name}</span>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
          <label htmlFor="file">
            <div className="absolute bottom-10 left-2 text-white bg-blue-500 border-none rounded-full w-8 h-8 cursor-pointer text-xl flex items-center justify-center">
              +
            </div>
          </label>
        </div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="flex-1 flex justify-center items-center text-red-500">Error loading stories</div>
        ) : (
          data?.map((story) => (
            <div className={`inline-block relative w-[200px] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} key={story.id} onClick={() => handleStoryClick(story.img)}>
              <img src={"/upload/" + story.profilePic} alt="" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 text-white font-medium">{story.name}</span>
            </div>
          ))
        )}
        <ImageModal isOpen={!!selectedStory} onClose={closeModal} imgSrc={selectedStory} />
      </div>
          
      {/* Mobile Version */}
      <div className="sm:hidden py-4 w-full flex gap-1">
            <img className="rounded-full h-24 w-24 object-cover border-2 border-slate-300" src={"/upload/" + currentUser.profilePic} />
            {isLoading ? (
              <div className="flex-1 flex justify-center items-center text-gray-500">Loading...</div>
            ) : error ? (
              <div className="flex-1 flex justify-center items-center text-red-500">Error loading stories</div>
            ) : (
              data?.map((story) => (
                <div onClick={() => handleStoryClick(story.img)} key={story.id} >
                  <img className="rounded-full h-24 w-24 object-cover border-2 border-slate-300" src={"/upload/" + story.profilePic}/>
                </div>
              ))
            )}
            <ImageModal isOpen={!!selectedStory} onClose={closeModal} imgSrc={selectedStory} />
      </div>
    </>
  )
}

export default Stories;