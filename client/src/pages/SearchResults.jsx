import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { makeRequest } from "../axios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext"
import Loader from "../components/Loader"

const SearchResults = () => {

  const { darkMode } = useContext(DarkModeContext);

  const navigate = useNavigate()

  let query = useParams()

  const searchTerm = query.q

  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => makeRequest.get("/users/search?q=" + searchTerm).then((res) => res.data)
  });

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const goToHandler = (id) => {
    navigate(`/profile/${id}`)
  }

  return (
    <div className='flex p-2 sm:p-0 w-full justify-center'>
      <div className='flex flex-col gap-3 w-full sm:p-4 sm:w-2/3'>
        <h2>Search results for "{query.q}"</h2>
        <div className='flex flex-col'>
          {data.map((user) => (
            <div className={`flex items-center justify-between p-3 rounded-md mb-2 shadow-sm ${darkMode ? "bg-zinc-900 text-whitesmoke" : "bg-white text-gray-800" }`} key={user.id}>
              <div className='flex items-center gap-4'>
                <img className='w-12 h-12 object-cover rounded-full' src={"/upload/" + user.profilePic} alt={user.name} />
                <h3>{user.name}</h3>
              </div>
              <button className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={() => goToHandler(user.id)}>Go to Profile</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchResults