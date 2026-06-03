import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [roomid,setRoomid]=useState("");
  const [quizData,setQuizData]=useState([]);

  const navigate = useNavigate();
  const handleJoin=async ()=>{
    if(!roomid){
      alert("Please enter a quiz code");
      return;
    }
    const response=await fetch(`http://localhost:4000/api/quizzes/join/${roomid}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",  
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    const data=await response.json();
    console.log(data);
    if(response.ok){
       setQuizData(data);
       navigate('/quiz',{state:{quiz:data.quiz}});
    }

  }
 
  
 
  const cardsData=[
    {
        img:"📝",
        title:"Create Quiz",
        description:"Add questions, options, and correct answers easily.",
        buttonText:"Create Now"
    },
    {
        img:"🤖",
        title:"Use AI to create quiz",
        description:"Enter a quiz code and compete with other players.",
        buttonText:"Start"
    },
    {
        img:"🏆",
        title:"Leaderboard",
        description:"Track your progress and see how you rank against other players.",
        buttonText:"View Leaderboard"
    },
     
  ]
  let user=null
  const token = localStorage.getItem("token");
  if(token){
     user=jwtDecode(token);
  }
  console.log(user);

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-6">
      

      <div className="max-w-6xl mx-auto h-16 bg-orange-500 rounded-3xl flex items-center px-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white">Quizzer</h1>

        <div className="ml-auto flex items-center gap-4">
          <button className="text-white font-medium hover:underline">
            My Quizzes
          </button>

          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-orange-500">
            {user?.username?.split('')[0] || 'U'}
          </div>
        </div>
      </div>

   
<div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">Create, Join and Play Quizzes</h2>
        <p className="mt-4 text-gray-600 text-lg"> Build your own quiz, share it with friends, or join a quiz using a code. </p>
        <div className="flex gap-4 mt-6">
            <button className="bg-orange-500 text-white rounded-lg hover:bg-orange-600 px-6 py-3" onClick={()=>navigate('/create')}>Create Quiz</button>
            <button className="bg-white text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-100 px-6 py-3">AI Quiz</button>
        </div>
    </div>

<div className="bg-white rounded-lg shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
            Join a Quiz
          </h3>
          <input type="text" placeholder="Enter quiz code" value={roomid} onChange={(e) => setRoomid(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"/>
          <button onClick={handleJoin}
           className="mt-4 w-full bg-orange-500 hover:bg-orange-600 py-3 text-white rounded-xl font-bold">Join Quiz</button>
    </div>
</div>

    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardsData.map((card,index)=>(
        <Cards key={index} img={card.img} title={card.title} description={card.description} buttonText={card.buttonText}/>
      ))}
    </div>
    </div>
  );
}

export default Dashboard;