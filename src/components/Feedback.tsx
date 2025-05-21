import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Check, Star, ChevronRight, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMoodHistory } from '../context/MoodHistoryContext';

export const Feedback: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { moodHistory } = useMoodHistory();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', { rating, comment });
    setSubmitted(true);
    setTimeout(() => {
      setRating(null);
      setComment('');
      setTimeout(() => navigate('/'), 500);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-8 pb-20 md:pb-8 md:pt-24 px-4 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-float"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="card p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star className="text-yellow-400 mr-2" />
              Your Feedback
            </h2>
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6"
                  >
                    <Check size={40} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
                  <p className="text-purple-200 text-lg">
                    Your feedback helps us improve our recommendations.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-purple-200 mb-4 text-lg">
                      How would you rate the music recommendations?
                    </label>
                    <div className="flex justify-between items-center">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <motion.button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all
                            ${rating === value 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {value}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="comment" className="block text-purple-200 mb-3 text-lg">
                      Additional comments (optional)
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/5 text-white border border-white/10 focus:border-purple-500 focus:ring focus:ring-purple-500/20 focus:outline-none transition-all resize-none"
                      rows={4}
                      placeholder="Tell us how we can improve..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={rating === null}
                    className={`btn w-full ${rating === null ? 'bg-gray-600 cursor-not-allowed' : 'btn-primary'}`}
                    whileHover={rating !== null ? { scale: 1.02 } : {}}
                    whileTap={rating !== null ? { scale: 0.98 } : {}}
                  >
                    <Send size={18} className="mr-2" />
                    Submit Feedback
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div variants={itemVariants} className="card p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <RefreshCcw className="text-purple-400 mr-2" />
              Your Mood Journey
            </h2>
            
            {moodHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-purple-200 text-lg">
                  No mood history yet. Start by detecting your mood!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                {moodHistory.slice().reverse().map((entry, index) => {
                  const date = new Date(entry.timestamp);
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-effect p-4 group hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center">
                        <div className={`mood-indicator mood-${entry.mood.toLowerCase()} w-12 h-12 text-xl`}>
                          {entry.mood === 'happy' ? '😊' :
                           entry.mood === 'sad' ? '😢' :
                           entry.mood === 'angry' ? '😠' :
                           entry.mood === 'fearful' ? '😨' :
                           entry.mood === 'surprised' ? '😮' : '😐'}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <div className="flex items-center">
                            <p className="text-white font-medium text-lg">
                              {entry.mood.toUpperCase()}
                            </p>
                            <ChevronRight size={16} className="text-purple-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-purple-300">
                            {date.toLocaleDateString()} at {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                        
                        <div className="w-20">
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                              style={{ width: `${entry.confidence * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-purple-300 mt-1 text-right">
                            {Math.round(entry.confidence * 100)}%
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-sm text-purple-300">
                Your mood patterns help us improve our recommendations over time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};