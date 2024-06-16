import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", {
        name,
        username,
        email,
        password
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen bg-blue-200 flex items-center justify-center">
      <div className="w-1/2 flex bg-white rounded-lg min-h-[600px] overflow-hidden flex-row-reverse">
        <div className="flex-1 bg-gradient-to-b from-blue-500 to-blue-700 bg-cover p-12 flex flex-col gap-8 text-white">
          <h1 className="font-bold text-4xl">TribeVibe</h1>
          <p>
            Welcome to TribeVibe, where connections come alive. Join a vibrant community,
            share your passions, and discover new friendships. Let's vibe together and
            make every moment count.
          </p>
          <span className="text-sm">Do you have an account?</span>
          <Link to="/login">
            <button className="w-1/2 p-2 bg-white text-blue-700 font-bold cursor-pointer">Login</button>
          </Link>
        </div>
        <div className="flex-1 p-12 flex flex-col gap-12 justify-center">
          <h1 className="text-2xl text-gray-700">Register</h1>
          <form onSubmit={submitHandler} className="flex flex-col gap-8">
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Name" 
              className="border-b border-gray-300 p-2 focus:outline-none"
            />
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
              className="border-b border-gray-300 p-2 focus:outline-none"
            />
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
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
              className="w-1/2 p-2 bg-blue-500 text-white font-bold cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
