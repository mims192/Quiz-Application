
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate=useNavigate();
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const handleSignup = async () => {
        const response=await fetch("http://localhost:4000/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                username,
                email,
                password
            })
        })
        if(response.ok){
        setMode("login");
        setUsername("");
        setEmail("");
        setPassword("");
        
        }

   }

   const handlelogin=async()=>{
    const response=await fetch("http://localhost:4000/api/auth/login",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email,
            password
        })
        
    })

    const data=await response.json();

    if(response.ok){
        localStorage.setItem("token",data.token);
        navigate('/');
    }

   }


  return (
    <div className="bg-orange-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left panel */}
        <div className="bg-orange-500 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Quizzer</h1>
          <p className="text-orange-100">
            Create quizzes, join rooms, and compete with friends.
          </p>
        </div>

        {/* Form panel */}
        <div className="p-8 min-h-[430px] overflow-hidden">
          <div
            className={`transition-all duration-500 ${
              mode === "signup"
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0 hidden"
            }`}
          >
            <h2 className="font-bold text-3xl text-gray-800">Create Account</h2>
            <p className="text-gray-500 mt-1 mb-6">Start your quiz journey</p>

            <input
              
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400 mb-4"
            />

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400 mb-4"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400 mb-5"
            />

            <button onClick={handleSignup}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold">
              Sign Up
            </button>

            <p className="text-gray-500 text-center mt-5">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-orange-500 font-semibold hover:underline"
              >
                Login here
              </button>
            </p>
          </div>

          <div
            className={`transition-all duration-500 ${
              mode === "login"
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0 hidden"
            }`}
          >
            <h2 className="font-bold text-3xl text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-1 mb-6">Login to continue</p>

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400 mb-4"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}   
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400 mb-5"
            />

            <button onClick={handlelogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold">
              Login
            </button>

            <p className="text-gray-500 text-center mt-5">
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-orange-500 font-semibold hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;