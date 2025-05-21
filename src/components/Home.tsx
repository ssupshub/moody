import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Camera, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col pt-8 pb-20 md:pb-8 md:pt-24 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-float"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto flex flex-col items-center text-center relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center mb-8 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-spin-slow"></div>
          <div className="relative flex items-center bg-black/50 px-6 py-3 rounded-full">
            <Music size={40} className="text-white mr-3" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Moodify
            </h1>
          </div>
        </motion.div>
        
        <motion.h2
          variants={itemVariants}
          className="text-xl md:text-3xl text-purple-200 mb-12 font-light"
        >
          Let your emotions guide your musical journey
        </motion.h2>

        <motion.div 
          variants={itemVariants}
          className="w-full max-w-lg mb-16 p-8 card group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative p-6 glass-effect">
            <Sparkles className="text-purple-400 w-8 h-8 mb-4 animate-pulse" />
            <p className="text-white text-lg mb-8 leading-relaxed">
              Experience music like never before with our AI-powered emotion detection.
              We'll analyze your mood and create the perfect playlist to match or enhance your emotional state.
            </p>
            
            <button 
              onClick={() => navigate('/detect')}
              className="btn btn-primary group w-full"
            >
              <span className="flex items-center justify-center">
                <Camera size={20} className="mr-2 group-hover:animate-bounce" />
                <span>Start Your Musical Journey</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
        >
          <motion.div
            variants={itemVariants}
            className="card p-8 hover:translate-y-[-8px] transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Music className="text-purple-400 mr-2" />
              How It Works
            </h3>
            <p className="text-purple-100 leading-relaxed">
              Using advanced AI, we analyze your facial expressions in real-time,
              creating a personalized musical experience that resonates with your current emotional state.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="card p-8 hover:translate-y-[-8px] transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Heart className="text-purple-400 mr-2" />
              Your Privacy Matters
            </h3>
            <p className="text-purple-100 leading-relaxed">
              Your privacy is our priority. All emotion detection happens directly in your browser,
              and we never store or share your camera data or personal information.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};