import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={`flex items-center justify-between p-2.5 h-12 border-b sticky top-0 z-50 ${darkMode ? 'bg-zinc-900 text-gray-200 border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`}>
      <div className="flex items-center gap-7">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="font-bold text-lg">TribeVibe</span>
        </Link>
        <Link to="/">
          <HomeOutlinedIcon />
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} className="cursor-pointer" />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} className="cursor-pointer" />
        )}
        <GridViewOutlinedIcon />
        <div className="flex items-center gap-2.5 border border-gray-300 dark:border-gray-700 rounded p-1.5 bg-white dark:bg-gray-700">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search..."
            className="border-none w-64 md:w-80 bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="flex items-center gap-2.5 font-medium">
          <img
            src={"/upload/" + currentUser.profilePic}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="hidden md:block">{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;