import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-bounce">Coming Soon!</h1>
      <p className="text-lg md:text-2xl mb-6 text-center">
        We're working hard to bring you this feature. Stay tuned!
      </p>
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
          <img
            src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
            alt="Coming Soon"
            className="w-24 h-24 md:w-40 md:h-40 object-contain"
          />
        </div>
      </div>
      <Link to="/" className="bg-white text-purple-700 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
        Back to Home
      </Link>
    </div>
  );
};

export default ComingSoon;
