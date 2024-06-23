import { Link, useNavigate } from "react-router-dom";
import Friends from "../assets/1.png";
import Groups from "../assets/2.png";
import Market from "../assets/3.png";
import Watch from "../assets/4.png";
import Memories from "../assets/5.png";
import Events from "../assets/6.png";
import Gaming from "../assets/7.png";
import Gallery from "../assets/8.png";
import Videos from "../assets/9.png";
import Messages from "../assets/10.png";
import Tutorials from "../assets/11.png";
import Courses from "../assets/12.png";
import Fund from "../assets/13.png";
import Logout from '../assets/14.png';
import { AuthContext } from "../context/authContext";
import { DarkModeContext } from "../context/darkModeContext";
import { useContext } from "react";
import axios from "axios";

const LeftBar = () => {
  const { currentUser, updateUserContext } = useContext(AuthContext);
  const { toggle, darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/api/auth/logout", {
        withCredentials: true,
      });

      updateUserContext(null);
      navigate("/login");

    } catch (err) {
      console.log("Logout Error: ", err);
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${currentUser.id}`, { replace: true });
  };

  return (
    <div className={`hidden lg:flex flex-col w-1/4 h-100vh sticky top-0 overflow-y-auto ${darkMode ? 'bg-zinc-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="p-5">
        <div className="mb-5">
          <div onClick={handleProfileClick} className="flex items-center gap-3 mb-4 cursor-pointer">
            <img
              src={"/upload/" + currentUser.profilePic}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-lg font-semibold">{currentUser.name}</span>
          </div>
          <div className="space-y-3">
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Friends} alt="" className="w-8 h-8" />
              <span>Friends</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Groups} alt="" className="w-8 h-8" />
              <span>Groups</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Market} alt="" className="w-8 h-8" />
              <span>Marketplace</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Watch} alt="" className="w-8 h-8" />
              <span>Watch</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Memories} alt="" className="w-8 h-8" />
              <span>Memories</span>
            </Link>
          </div>
        </div>
        <hr className="my-5 border-gray-300 dark:border-gray-700" />
        <div className="mb-5">
          <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">Your shortcuts</span>
          <div className="space-y-3">
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Events} alt="" className="w-8 h-8" />
              <span>Events</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Gaming} alt="" className="w-8 h-8" />
              <span>Gaming</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Gallery} alt="" className="w-8 h-8" />
              <span>Gallery</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Videos} alt="" className="w-8 h-8" />
              <span>Videos</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Messages} alt="" className="w-8 h-8" />
              <span>Messages</span>
            </Link>
          </div>
        </div>
        <hr className="my-5 border-gray-300 dark:border-gray-700" />
        <div>
          <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">Others</span>
          <div className="space-y-3">
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Fund} alt="" className="w-8 h-8" />
              <span>Fundraiser</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Tutorials} alt="" className="w-8 h-8" />
              <span>Tutorials</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3">
              <img src={Courses} alt="" className="w-8 h-8" />
              <span>Courses</span>
            </Link>
          </div>
        </div>
        <hr className="my-5 border-gray-300 dark:border-gray-700" />
        <div>
          <button onClick={logoutHandler} className="flex items-center gap-3">
            <img src={Logout} alt="" className="w-8 h-8" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;