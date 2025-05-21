import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Music, RefreshCw, ThumbsUp, ThumbsDown, ExternalLink, Loader2, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMusicRecommendations } from '../utils/musicApi';
import { Song } from '../types/Song';
import { MoodColors } from '../utils/moodUtils';

export const MusicRecommendation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Song[]>([]);
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const mood = location.state?.mood;
    if (!mood) {
      navigate('/detect');
      return;
    }
    
    setCurrentMood(mood);
    
    const loadRecommendations = async () => {
      setIsLoading(true);
      try {
        const songs = await getMusicRecommendations(mood);
        setRecommendations(songs);
      } catch (error) {
        console.error('Failed to get recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRecommendations();
  }, [location.state, navigate]);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    if (isPlaying && selectedSong) {
      progressInterval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(progressInterval);
  }, [isPlaying, selectedSong]);
  
  const refreshRecommendations = async () => {
    if (!currentMood) return;
    setIsLoading(true);
    try {
      const songs = await getMusicRecommendations(currentMood);
      setRecommendations(songs);
    } catch (error) {
      console.error('Failed to refresh recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePlay = (song: Song) => {
    if (selectedSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
          className="card p-8 mb-8"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className={`mood-indicator mood-${currentMood?.toLowerCase()} mr-4`}>
                {currentMood === 'happy' ? '😊' :
                 currentMood === 'sad' ? '😢' :
                 currentMood === 'angry' ? '😠' :
                 currentMood === 'fearful' ? '😨' :
                 currentMood === 'surprised' ? '😮' : '😐'}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Your Mood: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {currentMood?.toUpperCase()}
                  </span>
                </h2>
                <p className="text-purple-200">Curated songs to match your emotional state</p>
              </div>
            </div>
            
            <motion.button 
              onClick={refreshRecommendations}
              disabled={isLoading}
              className="btn btn-secondary flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={18} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
          </motion.div>
          
          {isLoading ? (
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center justify-center py-16"
            >
              <Loader2 size={48} className="text-purple-400 mb-4 animate-spin" />
              <p className="text-purple-200 text-lg">Curating your perfect playlist...</p>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {recommendations.map((song) => (
                <motion.div
                  key={song.id}
                  variants={itemVariants}
                  className={`card p-6 cursor-pointer group ${
                    selectedSong?.id === song.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => togglePlay(song)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={song.albumArt}
                        alt={`${song.title} album art`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {selectedSong?.id === song.id && isPlaying ? (
                          <Pause size={32} className="text-white" />
                        ) : (
                          <Play size={32} className="text-white" />
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h3 className="text-white font-semibold text-lg mb-1 truncate">
                        {song.title}
                      </h3>
                      <p className="text-purple-200 text-sm mb-2">{song.artist}</p>
                      
                      <div className="flex items-center text-sm text-purple-300 mb-3">
                        <Music size={14} className="mr-1" />
                        <span>{song.genre}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                          <ThumbsUp size={14} className="text-white" />
                        </button>
                        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                          <ThumbsDown size={14} className="text-white" />
                        </button>
                        <a 
                          href={song.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors ml-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={14} className="text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
        
        <AnimatePresence>
          {selectedSong && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 p-4 z-50"
            >
              <div className="container mx-auto max-w-4xl">
                <div className="flex items-center">
                  <img
                    src={selectedSong.albumArt}
                    alt={`${selectedSong.title} album art`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="ml-4 flex-1">
                    <h4 className="text-white font-semibold">{selectedSong.title}</h4>
                    <p className="text-purple-200 text-sm">{selectedSong.artist}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => togglePlay(selectedSong)}
                      className="p-3 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause size={20} className="text-white" />
                      ) : (
                        <Play size={20} className="text-white" />
                      )}
                    </button>
                    
                    <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                      <SkipForward size={20} className="text-white" />
                    </button>
                    
                    <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                      <Volume2 size={20} className="text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-purple-200">
                    <span>{formatTime(Math.floor(progress * 2.4))}</span>
                    <span>4:00</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-8"
        >
          <motion.button 
            onClick={() => navigate('/feedback')}
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rate These Recommendations
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};