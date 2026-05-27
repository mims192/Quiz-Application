import React, { useState } from 'react'

const data = [
  {
    "id": 1,
    "question": "What is the capital of France?",
    "options": ["Paris", "London", "Berlin", "Madrid"],
    "answer": "Paris"
  },
  {
    "id": 2,
    "question": "What is the largest planet in our solar system?",
    "options": ["Earth", "Mars", "Jupiter", "Saturn"],
    "answer": "Jupiter"
  },
  {
    "id": 3,
    "question": "Who wrote 'To Kill a Mockingbird'?",
    "options": ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
    "answer": "Harper Lee"
  },
  {
    "id": 4,
    "question": "What is the chemical symbol for water ?",
    "options": ["H2O", "CO2", "O2", "NaCl"],
    "answer": "H2O"
  }
]
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (index) => {
    setSelectedOption(index);

    if (data[currentQuestion].options[index] === data[currentQuestion].answer) {

      setScore(score + 1);
      console.log(score);
    }
    else{
      setScore(score - 1);
    }
  };

  return (
    <div className='bg-orange-50'>

      <div className='max-w-4xl mx-auto flex items-center h-screen justify-center'>

        <div className='flex flex-col w-full max-w-xl min-h-[60vh] rounded-lg bg-white shadow-xl mx-4'>
          <h1 className='text-2xl text-orange-400 m-1 p-4 font-bold'>Score: {score}</h1>
          <h1 className='text-3xl  m-1 p-4 font-bold'>{data[currentQuestion].question}</h1>
          <div className='p-4  m-1 fl1ex flex-col gap-3'>
            {data[currentQuestion].options.map((option, index) => {
              const isCorrect = option === data[currentQuestion].answer;
              const isSelected = index === selectedOption;
              return <h1 key={index} className={`font-bold rounded-lg p-4  text-white mt-1 
                ${selectedOption === null ? "bg-blue-500 hover:bg-blue-600" : isCorrect ? "bg-green-500 hover:bg-green-600" : isSelected ? "bg-red-500" : "bg-gray-500 cursor-not-allowed"}
              `}
                onClick={() => handleClick(index)}>{option} </h1>
            })}
          </div>
          <div className='flex justify-end'>
            <button className={`mr-5 px-3 py-2 text-white mb-2 rounded-lg ${currentQuestion === data.length - 1
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
              }
        `}
              onClick={() => {
                if (currentQuestion < data.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                  setSelectedOption(null);
                }
              }}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Quiz
