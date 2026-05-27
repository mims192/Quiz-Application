import React from 'react'

function Cards({ img, title, description, buttonText }) {
  return (
    <div className=' bg-white rounded-3xl shadow hover:shadow-lg transition p-6'>
        <div className='text-4xl mb-4'>{img}</div>
        <h2 className='text-gray-800 font-bold text-xl'>{title}</h2>
         <p className="text-gray-600 mt-2">
           {description}
          </p>
          <button className="mt-5 bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold">
            {buttonText}
          </button>      
    </div>
  )
}

export default Cards
