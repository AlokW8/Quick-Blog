import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const NewsLetter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center text-center space-y-4 px-4 my-32"
    >
      <h1 className="md:text-4xl text-2xl font-semibold text-gray-800">
        Never miss a Blog!
      </h1>
      <p className="md:text-lg text-gray-500 max-w-xl">
        Subscribe to get the latest blogs, new tech, and exclusive news.
      </p>
      <form
        className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 shadow-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Enter your email id"
          required
          className="border border-gray-300 rounded-l-md h-full px-4 outline-none w-full text-gray-600"
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full bg-primary text-white hover:bg-primary/90 transition-all rounded-r-md"
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  );
};

export default NewsLetter;
