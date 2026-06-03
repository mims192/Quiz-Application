import React, { useState } from "react";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addQuestion = () => {
    if (!question || options.some((op) => !op) || !answer) {
      alert("Please fill all fields");
      return;
    }

    const newQuestion = {
      question,
      options,
      answer,
    };

    setQuestions([...questions, newQuestion]);

    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  const createQuiz = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:4000/api/quizzes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          questions,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Quiz Created Successfully");
        alert(`Quiz Code: ${data.quiz.roomId}`);
        setTitle("");
        setQuestions([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-6">
    
      <div className="max-w-7xl mx-auto h-14 bg-orange-500 rounded-3xl flex items-center px-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white">Quizzer</h1>

        <div className="ml-auto flex items-center gap-4">
          <button className="text-white font-medium hover:underline">
            My Quizzes
          </button>

          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-orange-500">
            M
          </div>

        </div>
      </div>

      {/* Main Layout */}
      <div
        className={`max-w-6xl mx-auto mt-10 grid gap-6 transition-all duration-1000 ${
          questions.length > 0 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {/* Added Questions*/}
        {questions.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-6 h-fit animate-in slide-in-from-left duration-500">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              Added Questions
            </h2>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"> {/*scroll container for questions*/}
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="border border-orange-200 bg-orange-50 rounded-2xl p-4"
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {index + 1}. {q.question}
                  </h3>

                  <div className="space-y-2">
                    {q.options.map((option, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg text-sm ${
                          option === q.answer
                            ? "bg-green-100 border border-green-400"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

     
        <div className="bg-white shadow-xl rounded-3xl p-6 md:p-8 transition-all duration-500">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500">
            Create Quiz
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Add your question, options, and correct answer
          </p>

     
          <input
            type="text"
            placeholder="Enter quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 mb-5 outline-none focus:ring-2 focus:ring-orange-400"
          />

   
          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 mb-5 outline-none focus:ring-2 focus:ring-orange-400"
          />

      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, e.target.value)
                }
                className="w-full p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
              />
            ))}
          </div>

         <input
            type="text"
            placeholder="Enter correct answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 mt-5 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            onClick={addQuestion}
            className="w-full mt-6 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Add Question
          </button>

        
          {questions.length > 0 && (
            <button
              onClick={createQuiz}
              className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all"
            >
              Create Quiz ({questions.length} Questions)
            </button>
          )}
        </div>
      </div>
   
    </div>
  );
}
