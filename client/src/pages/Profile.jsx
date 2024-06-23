import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/authContext";
import { DarkModeContext } from "../context/darkModeContext";
import { makeRequest } from "../axios";
import Posts from "../components/Posts";
import Update from "../components/Update";
import Loader from "../components/Loader";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();
  const location = useLocation();
  const userId = parseInt(location.pathname.split("/")[2]);

  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => makeRequest.get("/users/find/" + userId).then((res) => res.data),
  });

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship", userId],
    queryFn: () => makeRequest.get("/relationships?followedUserId=" + userId).then((res) => res.data),
  });

  const mutation = useMutation(
    (following) => {
      return following
        ? makeRequest.delete("/relationships?userId=" + userId)
        : makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship", userId]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="bg-gray-100 w-full min-h-[100vh]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="relative w-full h-72">
            <img
              src={"/upload/" + data?.coverPic}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <img
              src={"/upload/" + data?.profilePic}
              alt="Profile"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover absolute left-1/2 transform -translate-x-1/2 top-[200px] sm:top-[160px] border-4 border-white"
            />
          </div>
          <div className={`pt-4 sm:pt-8 px-5 min-h-[100vh] lg:px-20 md:px-10 ${darkMode ? 'bg-[#333] text-white' : ''}`}>
            <div className={`shadow-lg rounded-2xl p-6 md:p-12 flex flex-col items-center md:items-start md:flex-row md:justify-between mb-5 ${darkMode ? 'bg-zinc-900' : 'bg-white text-gray-800'}`}>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-0 w-full">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-xl md:text-2xl font-medium">{data?.name}</span>
                  <div className="flex justify-center md:justify-start gap-2 mt-2">
                    <div className="flex items-center gap-1 text-gray-400">
                      <PlaceIcon />
                      <span className="text-sm">{data?.city}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <LanguageIcon />
                      <span className="text-sm">{data?.website}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href="http://facebook.com">
                    <FacebookTwoToneIcon fontSize="large" className="text-gray-400" />
                  </a>
                  <a href="http://facebook.com">
                    <InstagramIcon fontSize="large" className="text-gray-400" />
                  </a>
                  <a href="http://facebook.com">
                    <TwitterIcon fontSize="large" className="text-gray-400" />
                  </a>
                  <a href="http://facebook.com">
                    <LinkedInIcon fontSize="large" className="text-gray-400" />
                  </a>
                  <a href="http://facebook.com">
                    <PinterestIcon fontSize="large" className="text-gray-400" />
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center w-full md:w-auto">
                {rIsLoading ? (
                  <Loader />
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)} className="bg-blue-500 text-white py-2 px-4 rounded">update</button>
                ) : (
                  <button onClick={handleFollow} className="bg-blue-500 text-white py-2 px-4 rounded">
                    {relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
                  </button>
                )}
                <div className="flex gap-2">
                  <EmailOutlinedIcon />
                  <MoreVertIcon />
                </div>
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;