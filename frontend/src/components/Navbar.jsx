import React, { useState } from 'react';
import { FaBlogger } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const role = localStorage.getItem('userRole');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-400 p-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaBlogger className="text-3xl" />
          <h2 className="font-bold text-2xl">Blog App</h2>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-semibold">Home</Link>
          <Link to="/blog" className="font-semibold">Blog</Link>

          {role ? (
            <div className="flex gap-3">
              {role === 'admin' && (
                <Link to="/create">
                  <button className="border px-3 py-1 rounded bg-zinc-800 text-white">
                    Create
                  </button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="border px-3 py-1 rounded bg-zinc-800 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="border px-3 py-1 rounded bg-zinc-800 text-white">Login</button>
              </Link>
              <Link to="/register">
                <button className="border px-3 py-1 rounded bg-zinc-800 text-white">Register</button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 items-center bg-zinc-300 rounded-lg py-4">
          <Link to="/" className="font-semibold" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/blog" className="font-semibold" onClick={() => setMenuOpen(false)}>Blog</Link>

          {role ? (
            <div className="flex flex-col items-center gap-2">
              {role === 'admin' && (
                <Link to="/create" onClick={() => setMenuOpen(false)}>
                  <button className="border px-3 py-1 rounded bg-zinc-800 text-white">Create</button>
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="border px-3 py-1 rounded bg-zinc-800 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="border px-3 py-1 rounded bg-zinc-800 text-white">Login</button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="border px-3 py-1 rounded bg-zinc-800 text-white">Register</button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
