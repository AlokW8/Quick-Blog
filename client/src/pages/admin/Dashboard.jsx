import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cardMotion = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, type: 'spring', stiffness: 80 },
  };

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50 min-h-screen">
      {/* Top Stat Cards */}
      <div className="flex flex-wrap gap-6">
        {[{
          icon: assets.dashboard_icon_1,
          label: 'Blogs',
          value: dashboardData.blogs
        }, {
          icon: assets.dashboard_icon_2,
          label: 'Comments',
          value: dashboardData.comments
        }, {
          icon: assets.dashboard_icon_3,
          label: 'Drafts',
          value: dashboardData.drafts
        }].map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 bg-white px-6 py-4 min-w-60 rounded-xl 
            shadow-lg hover:shadow-primary/40 transition-transform duration-300 
            hover:scale-105 cursor-pointer"
            {...cardMotion}
          >
            <img src={item.icon} alt="" className="w-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">{item.value}</p>
              <p className="text-gray-400 font-medium">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Blogs */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3 mb-4 text-gray-700">
          <img src={assets.dashboard_icon_4} alt="icon" className="w-6 h-6" />
          <h2 className="text-lg font-semibold tracking-wide">Latest Blogs</h2>
        </div>

        <div className="relative max-w-5xl overflow-x-auto shadow-md rounded-xl bg-white">
          <table className="w-full text-sm text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-3">#</th>
                <th scope="col" className="px-4 py-3">Blog Title</th>
                <th scope="col" className="px-4 py-3 hidden md:table-cell">Date</th>
                <th scope="col" className="px-4 py-3 hidden md:table-cell">Status</th>
                <th scope="col" className="px-4 py-3 hidden md:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
