import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await login({ username, password });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen bg-blue-200 flex items-center justify-center">
      <div className="w-1/2 flex bg-white rounded-lg min-h-[600px] overflow-hidden">
        <div className="flex-1 bg-gradient-to-b from-blue-500 to-blue-700 bg-cover p-12 flex flex-col gap-8 text-white">
        <h1 className="font-bold text-4xl">TribeVibe</h1>
          <p>
            Welcome to TribeVibe, where connections come alive. Join a vibrant community,
            share your passions, and discover new friendships. Let's vibe together and
            make every moment count.
          </p>
          <span className="text-sm">Don't you have an account?</span>
          <Link to="/register">
            <button className="w-1/2 p-2 bg-white text-blue-700 font-bold cursor-pointer rounded-md">Register</button>
          </Link>
        </div>
        <div className="flex-1 p-12 flex flex-col gap-12 justify-center">
          <h1 className="text-2xl text-gray-700">Login</h1>
          <form onSubmit={submitHandler} className="flex flex-col gap-8">
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
              className="border-b border-gray-300 p-2 focus:outline-none"
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              className="border-b border-gray-300 p-2 focus:outline-none"
            />
            <button 
              type="submit" 
              className="w-1/2 p-2 bg-blue-500 text-white font-bold cursor-pointer rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;