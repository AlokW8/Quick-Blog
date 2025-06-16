import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === '') return blogs;
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div className="px-6 sm:px-16 xl:px-32 py-12 bg-gray-50 min-h-screen">
      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
        {blogCategories.map(item => (
          <motion.button
            key={item}
            onClick={() => setMenu(item)}
            className={`relative px-5 py-2 rounded-full font-medium transition-all duration-200 ${
              menu === item
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-primary/10"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {item}
            {menu === item && (
              <motion.div
                layoutId="active-category"
                className="absolute inset-0 rounded-full z-[-1] bg-primary"
                style={{ opacity: 0.1 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBlogs()
          .filter(blog => menu === "All" || blog.category === menu)
          .map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
