import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <motion.div
      className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left Side - Logo */}
      <motion.div
        onClick={() => navigate('/')}
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        
      </motion.div>

      {/* Right Side - Login/Dashboard Button */}
      <motion.button
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer 
        bg-primary text-white px-10 py-2.5 shadow-md hover:shadow-lg transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </motion.button>
    </motion.div>
  );
};

export default Navbar;
