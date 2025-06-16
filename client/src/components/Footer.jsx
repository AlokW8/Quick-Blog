import React from 'react';
import { assets, footer_data } from '../assets/assets';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5 pt-16 pb-6"
    >
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10
        pb-10 border-b border-gray-400/30 text-gray-500">
        
        {/* Left side - Logo + Description */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.img
            src={assets.logo}
            alt="logo"
            className="w-32 sm:w-44 mb-4"
            whileHover={{ scale: 1.05 }}
          />
          <p className="max-w-[410px] leading-relaxed text-sm sm:text-base">
            An innovative blogging site that uses artificial intelligence to help users create, edit,
            and optimize content effortlessly. From idea generation to grammar correction and SEO
            suggestions, the platform streamlines the entire blogging process, making it faster,
            smarter, and more engaging for writers of all levels.
          </p>
        </motion.div>

        {/* Right side - Footer Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-5">
          {footer_data.map((section, index) => (
            <motion.div
              key={index}
              className="min-w-[120px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <h3 className="font-semibold text-base text-gray-900 md:mb-4">{section.title}</h3>
              <ul className="text-sm space-y-1 mt-2">
                {section.links.map((link, i) => (
                  <motion.li key={i} whileHover={{ x: 4 }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-primary transition-all duration-200"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <motion.p
        className="pt-6 text-center text-sm md:text-base text-gray-500/80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        © 2025 QuickBlog – Alok. All Rights Reserved.
      </motion.p>
    </motion.div>
  );
};

export default Footer;
