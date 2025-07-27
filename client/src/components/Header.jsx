import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  // Parallax scroll effect (optional)
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 300], [0, -50]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput('');
    inputRef.current.value = '';
  };

  const headingText = 'Your own blogging platform.';
  const chars = [...headingText].map((char, i) => ({ char, i }));

  return (
    <div className="relative mx-6 sm:mx-16 xl:mx-24 py-20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white rounded-3xl overflow-hidden shadow-xl">
      {/* Subtle animated gradient background */}
      <motion.img
        src={assets.gradientBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
        style={{ y: bgY }}
      />

      <motion.div
        className="relative z-10 text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Badge */}
       <motion.div
  className="inline-flex flex-col items-center gap-1 px-5 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white backdrop-blur-md shadow-md"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.3 }}
>
  
  <p>✨ New AI feature Integrated  +</p>
</motion.div>


        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight flex justify-center flex-wrap gap-1">
          {chars.map(({ char, i }) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          This is your space to think out loud, to share what matters,
          and to write without filters. Whether it's one word or a thousand,
          your story starts right here.
        </motion.p>

        {/* Search Form */}
        <motion.form
          onSubmit={onSubmitHandler}
          className="flex max-w-xl mx-auto bg-white/5 border border-white/20 backdrop-blur-md rounded-full overflow-hidden shadow-md focus-within:shadow-lg transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 outline-none text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 sm:px-8 py-2 hover:scale-105 active:scale-95 transition-all rounded-r-full"
          >
            Search
          </button>
        </motion.form>

        {/* Clear Button */}
        {input && (
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={onClear}
              className="text-white/70 border border-white/30 text-xs px-4 py-1.5 rounded hover:bg-white/10 transition-shadow shadow-sm"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Header;
