import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { DarkModeContext } from "../context/darkModeContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <div className="flex gap-2 sm:gap-4 h-64 mb-8 justify-between overflow-hidden">
      <div className={`relative flex-1 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <img src={"/upload/" + currentUser.profilePic} alt="" className="w-full h-full object-cover" />
        <span className="absolute bottom-2 left-2 text-white font-medium">{currentUser.name}</span>
        <button className="absolute bottom-10 left-2 text-white bg-blue-500 border-none rounded-full w-8 h-8 cursor-pointer text-xl flex items-center justify-center">
          +
        </button>
      </div>
      {stories.map(story => (
        <div className={`relative flex-1 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} key={story.id}>
          <img src={story.img} alt="" className="w-full h-full object-cover" />
          <span className="absolute bottom-2 left-2 text-white font-medium">{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories;

