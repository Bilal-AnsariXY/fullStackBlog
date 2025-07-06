import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const nev = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Description:', description);
    await api.post('/create',{title,description});
    // You can add your API call here
    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Button to open modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-800"
      >
        + Create Blog
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            {/* Close icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-xl text-gray-500 hover:text-red-500"
            >
              <AiOutlineClose />
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6">Create New Blog</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  placeholder="Enter blog description"
                ></textarea>
              </div>
             
              <button 
              onClick={()=>nev('/blog')}
                type="submit"
                className="w-full bg-zinc-600 text-white py-2 rounded-lg hover:bg-zinc-700"
              >
                Submit
              </button>
          
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
