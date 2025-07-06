import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // ✅ Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/get');
        console.log("Fetched blogs:", res.data.blogs);
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // ✅ Start editing a blog
  const handleUpdateClick = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setDescription(blog.description);
  };

  // ✅ Submit updated blog
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/update/${editingBlog._id}`, {
        title,
        description,
      });
      const updatedBlog = res.data.blog;

      // Replace updated blog in state
      const updatedBlogs = blogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );
      setBlogs(updatedBlogs);
      setEditingBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  // ✅ Delete blog
  const handleDelete = async (id) => {
    try {
      await api.delete(`/delete/${id}`);
      const remaining = blogs.filter((blog) => blog._id !== id);
      setBlogs(remaining);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Blogs</h1>

      {/* ✅ Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setEditingBlog(null)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded focus:outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full border px-3 py-2 rounded focus:outline-none"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-zinc-700 text-white py-2 rounded hover:bg-zinc-800"
              >
                Update Blog
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between h-full"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm">
                {blog.description.length > 50
                  ? blog.description.slice(0, 50) + '...'
                  : blog.description}
              </p>

            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleUpdateClick(blog)}
                className="text-sm bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-sm bg-zinc-500 text-white px-4 py-1 rounded hover:bg-zinc-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
