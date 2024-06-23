import { useState, useEffect, useContext } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/darkModeContext";
import { AuthContext } from "../context/authContext";

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {

    if (searchQuery === '') navigate('/')
    else navigate(`/search/${searchQuery}`)

  }, [searchQuery])

  return (
    <nav className={`bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50 ${darkMode ? 'bg-zinc-900 text-gray-200 border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`}>
      <div className="sm:hidden max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TribeVibe</span>
        </Link>
        <div className="flex items-center gap-3">
          {darkMode ? (
              <WbSunnyOutlinedIcon onClick={toggle} className="cursor-pointer" />
            ) : (
              <DarkModeOutlinedIcon onClick={toggle} className="cursor-pointer" />
          )}
          <button
            onClick={handleMenuToggle}
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden ${darkMode ? "text-white" : "text-gray-900"}`}
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto mt-2`} id="navbar-default">
          <div className="flex items-center gap-2.5 border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-700 w-full">
            <SearchOutlinedIcon />
            <input
              type="text"
              placeholder="Search..."
              className="border-none w-full md:w-80 bg-transparent focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between p-2.5 h-12 border-b sticky top-0 z-50">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
    </nav>
  );
};

export default Navbar;