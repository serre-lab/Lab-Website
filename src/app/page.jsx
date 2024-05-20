import React from 'react'
import RecentBlogPosts from '../components/RecentBlogPosts'

export default function page() {
  return (
    <div>
      <div className="w-screen py-20 bg-gray-200">
        <h1 className="text-4xl text-black text-center">
          Welcome to my blog
        </h1>
      </div>
      <RecentBlogPosts />
    </div>
  )
}
