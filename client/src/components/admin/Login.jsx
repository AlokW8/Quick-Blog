import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admin/login', { email, password });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] px-4">
      <motion.div
        className="w-full max-w-sm p-6 border border-gray-200 shadow-2xl rounded-xl bg-white/90 backdrop-blur-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-indigo-600">Admin Login</span>
          </h1>
          <p className="text-sm text-gray-500">Enter your credentials to access the admin panel</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 text-gray-700"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Email Field */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="your email id"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-gray-800 transition"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-gray-800 transition"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <button
              type="submit"
              className="w-full py-3 font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Login
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
