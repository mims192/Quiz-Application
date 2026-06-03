import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Quiz() {
  const location = useLocation();
 
  const quiz = location.state?.quiz;
  const data = quiz?.questions || [];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  if (!data.length) {
    return <h1>No quiz data found</h1>;
  }

  const handleClick = (index) => {
    if (selectedOption !== null) return; // prevent multiple clicks

    setSelectedOption(index);

    if (data[currentQuestion].options[index] === data[currentQuestion].answer) {
      setScore(prev => prev + 1);
    } else {
      setScore(prev => prev - 1);
    }
  };

  return (
    <div className='bg-orange-50'>
      <div className='max-w-4xl mx-auto flex items-center h-screen justify-center'>
        <div className='flex flex-col w-full max-w-xl min-h-[60vh] rounded-lg bg-white shadow-xl mx-4'>

          <h1 className='text-2xl text-orange-400 m-1 p-4 font-bold'>
            Score: {score}
          </h1>

          <h1 className='text-3xl m-1 p-4 font-bold'>
            {data[currentQuestion].question}
          </h1>

          <div className='p-4 m-1 flex flex-col gap-3'>
            {data[currentQuestion].options.map((option, index) => {
              const isCorrect = option === data[currentQuestion].answer;
              const isSelected = index === selectedOption;

              return (
                <h1
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`font-bold rounded-lg p-4 text-white mt-1 cursor-pointer
                    ${
                      selectedOption === null
                        ? "bg-blue-500 hover:bg-blue-600"
                        : isCorrect
                        ? "bg-green-500"
                        : isSelected
                        ? "bg-red-500"
                        : "bg-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  {option}
                </h1>
              );
            })}
          </div>

          <div className='flex justify-end'>
            <button
              className='mr-5 px-3 py-2 text-white mb-2 rounded-lg bg-orange-500 hover:bg-orange-600'
              onClick={() => {
                if (currentQuestion < data.length - 1) {
                  setCurrentQuestion(prev => prev + 1);
                  setSelectedOption(null);
                }
              }}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Quiz;