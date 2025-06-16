import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full bg-white rounded-xl overflow-hidden cursor-pointer border border-gray-200 hover:border-primary transition-all duration-300"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 space-y-3">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
          {category}
        </span>
        <h5 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">{title}</h5>
        <p
          className="text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 100) }}
        ></p>
      </div>
    </motion.div>
  );
};

export default BlogCard;
