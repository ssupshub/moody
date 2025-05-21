import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Music size={64} className="text-white mb-6" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold text-white mb-4"
      >
        Moodify
      </motion.h1>
      
      <p className="text-purple-200 mb-8">Preparing your mood-based music experience</p>
      
      <motion.div 
        className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-purple-300 text-sm mt-4"
      >
        Loading facial recognition models...
      </motion.p>
    </div>
  );
};