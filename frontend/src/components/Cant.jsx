import React, { useState } from 'react';
import { FaBan } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const Cant = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white border border-zinc-300 shadow-lg rounded-xl p-8 max-w-md w-full text-center relative">

        {/* Cut Icon */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-zinc-600 text-xl"
        >
         <Link to = {'/'}>
            <AiOutlineClose />
         </Link> 
        </button>

        <FaBan className="text-zinc-500 text-5xl mx-auto mb-4" />
        <h2 className="text-xl font-bold text-zinc-600 mb-2">Access Denied</h2>
        <p className="text-gray-700 text-sm">
          You can't do it. Only admin can do it.
        </p>
      </div>
    </div>
  );
};

export default Cant;
