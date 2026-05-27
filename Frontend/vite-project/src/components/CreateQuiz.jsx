import React from "react";

function CreateQuiz() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-6 md:p-8">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500">
          Create Quiz
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Add your question, options, and correct answer
        </p>

        <input
          type="text"
          placeholder="Enter question"
          className="w-full p-4 rounded-xl border border-gray-300 mb-5 outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Option 1"
            className="w-full p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            placeholder="Option 2"
            className="w-full p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            placeholder="Option 3"
            className="w-full p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            placeholder="Option 4"
            className="w-full p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <input
          type="text"
          placeholder="Enter correct answer"
          className="w-full p-4 rounded-xl border border-gray-300 mt-5 outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-md">
          Add Question
        </button>
      </div>
    </div>
  );
}

export default CreateQuiz;