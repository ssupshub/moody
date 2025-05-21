import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, Loader2, CheckCircle, Shield, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { detectMood } from '../utils/moodDetection';
import { useMoodHistory } from '../context/MoodHistoryContext';

export const MoodDetection: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureComplete, setCaptureComplete] = useState(false);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [moodConfidence, setMoodConfidence] = useState<number>(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addMoodEntry } = useMoodHistory();

  const handleCameraReady = useCallback(() => {
    setIsCameraReady(true);
    setCameraError(null);
  }, []);

  const handleCameraError = useCallback((error: string) => {
    setCameraError('Camera access denied. Please enable camera permissions.');
    setIsCameraReady(false);
  }, []);

  const retryCamera = useCallback(() => {
    setCameraError(null);
    if (webcamRef.current) {
      webcamRef.current.getScreenshot();
    }
  }, []);

  const captureMood = useCallback(async () => {
    if (!webcamRef.current) return;
    
    setIsCapturing(true);
    
    try {
      const moodResults = [];
      for (let i = 0; i < 3; i++) {
        if (webcamRef.current) {
          const screenshot = webcamRef.current.getScreenshot();
          if (screenshot) {
            const result = await detectMood(screenshot);
            moodResults.push(result);
          }
        }
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      const moodCounts: Record<string, number> = {};
      let highestCount = 0;
      let dominantMood = '';
      
      moodResults.forEach(result => {
        if (!moodCounts[result.mood]) moodCounts[result.mood] = 0;
        moodCounts[result.mood] += 1;
        
        if (moodCounts[result.mood] > highestCount) {
          highestCount = moodCounts[result.mood];
          dominantMood = result.mood;
        }
      });
      
      const avgConfidence = moodResults
        .filter(r => r.mood === dominantMood)
        .reduce((sum, r) => sum + r.confidence, 0) / highestCount;
      
      setDetectedMood(dominantMood);
      setMoodConfidence(Math.round(avgConfidence * 100));
      setCaptureComplete(true);
      
      addMoodEntry({
        mood: dominantMood,
        confidence: avgConfidence,
        timestamp: new Date().toISOString()
      });
      
      setTimeout(() => {
        navigate('/recommend', { state: { mood: dominantMood, confidence: avgConfidence } });
      }, 2000);
      
    } catch (error) {
      console.error('Error capturing mood:', error);
    } finally {
      setIsCapturing(false);
    }
  }, [webcamRef, navigate, addMoodEntry]);

  return (
    <div className="min-h-screen flex flex-col pt-8 pb-20 md:pb-8 md:pt-24 px-4">
      <div className="container mx-auto max-w-2xl relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-float"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 background-animate"></div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Capture Your Mood
          </motion.h2>
          
          <motion.p 
            className="text-purple-200 text-center mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Let's discover the perfect soundtrack for your emotions
          </motion.p>
          
          <div className="relative rounded-xl overflow-hidden">
            <AnimatePresence>
              {captureComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <CheckCircle size={64} className="text-green-500 mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Mood Detected!</h3>
                  <div className={`mood-indicator mood-${detectedMood?.toLowerCase()} mb-4`}>
                    {detectedMood === 'happy' ? '😊' :
                     detectedMood === 'sad' ? '😢' :
                     detectedMood === 'angry' ? '😠' :
                     detectedMood === 'fearful' ? '😨' :
                     detectedMood === 'surprised' ? '😮' : '😐'}
                  </div>
                  <p className="text-xl text-white mb-2">{detectedMood?.toUpperCase()}</p>
                  <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${moodConfidence}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-green-400">Confidence: {moodConfidence}%</p>
                  <motion.p 
                    className="mt-4 text-purple-300"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Finding your perfect playlist...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
              {cameraError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/20 backdrop-blur-sm">
                  <Shield size={48} className="text-red-500 mb-4" />
                  <p className="text-white text-center mb-4">{cameraError}</p>
                  <button
                    onClick={retryCamera}
                    className="btn btn-secondary flex items-center"
                  >
                    <RefreshCw size={18} className="mr-2" />
                    Retry Camera Access
                  </button>
                </div>
              ) : (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    facingMode: "user"
                  }}
                  onUserMedia={handleCameraReady}
                  onUserMediaError={handleCameraError}
                  className="w-full h-full object-cover"
                />
              )}

              {!isCameraReady && !captureComplete && !cameraError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 size={40} className="text-purple-500" />
                  </motion.div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <motion.button 
              onClick={captureMood}
              disabled={!isCameraReady || isCapturing || captureComplete || !!cameraError}
              className={`btn ${!isCameraReady || isCapturing || captureComplete || cameraError
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'btn-primary'} flex items-center`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCapturing ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  <span>Analyzing Your Mood...</span>
                </>
              ) : (
                <>
                  <Camera size={20} className="mr-2" />
                  <span>Capture My Mood</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Tips for Best Results</h3>
          <ul className="space-y-4">
            {[
              { tip: 'Ensure good lighting on your face', icon: '💡' },
              { tip: 'Look directly at the camera', icon: '👀' },
              { tip: 'Express your natural emotions', icon: '😊' },
              { tip: 'Remove face coverings or glasses', icon: '🕶️' }
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center text-purple-200"
              >
                <span className="text-2xl mr-3">{item.icon}</span>
                <span>{item.tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};