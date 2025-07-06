import React from 'react';
import iz from '../public/blog.jpg'
export default function Home() {
  return (
    <div className="flex flex-col items-center gap-y-5 px-4 sm:px-6 md:px-10 lg:px-16 py-8">
      <h1 className="font-bold text-3xl mt-5 text-center">Blog Website</h1>

      <div className="flex flex-col-reverse lg:flex-row gap-8 items-center justify-between w-full max-w-7xl">
        {/* Text Section */}
        <div className="lg:w-1/2 w-full space-y-5">
          <h2 className="font-semibold text-xl">Introducing My Blog App: A Simple and Powerful Blogging Platform</h2>
          <p className="text-gray-700 leading-relaxed">
            In today's digital world, everyone has a voice—and a blog is one of the best ways to share it.
            That’s exactly why I built this blog application. Whether you're a tech enthusiast, a writer,
            or someone who wants to share knowledge, this blog app is designed to make content creation
            easy, smooth, and enjoyable.
            <br /><br />
            This project is built using the MERN stack—MongoDB, Express.js, React.js, and Node.js.
            It includes everything you’d expect from a modern blogging platform: clean UI,
            authentication, blog management, and more.
          </p>

          <h2 className="font-semibold text-xl">Why I Created This App</h2>
          <p className="text-gray-700 leading-relaxed">
            As a developer, I wanted to build a real-world full-stack project to improve my skills.
            I’ve always believed that learning through building is the most effective method. While tutorials
            are great, nothing beats the experience of creating something from scratch, solving bugs, and
            putting everything together yourself.
            <br /><br />
            Blogging platforms are also highly relevant in the tech space. Many developers write articles
            to share their learning, document bugs, or explain how to build things. I wanted to create
            a platform that makes this easy—especially for beginners and developers like me.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <img
            className="w-full h-[450px] object-cover rounded-xl shadow-lg"
            src={iz}
            alt="home blog illustration"
          />
        </div>
      </div>
    </div>
  );
}
