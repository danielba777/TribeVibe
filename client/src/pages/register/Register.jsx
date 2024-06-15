import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios"

const Register = () => {

  const [name,setName] = useState('')
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const submitHandler = async (e) => {

    e.preventDefault()
    
    try {
      await axios.post("http://localhost:8800/api/auth/register", {
          name: name,
          username: username,
          email: email,
          password: password
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={submitHandler}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
