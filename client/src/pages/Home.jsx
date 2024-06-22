import Stories from "../components/Stories";
import Posts from "../components/Posts";
import Share from "../components/Share";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";

const Home = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`home ${darkMode ? "bg-[#333] text-white min-h-[100vh]" : "bg-[#f6f3f3] text-black"} min-h-[100vh] p-5 lg:p-20`}>
      <Stories />
      <Share />
      <Posts />
    </div>
  );
};

export default Home;
