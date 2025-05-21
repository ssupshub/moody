import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { MoodDetection } from './components/MoodDetection';
import { MusicRecommendation } from './components/MusicRecommendation';
import { Feedback } from './components/Feedback';
import { Navbar } from './components/Navbar';
import { MoodHistoryProvider } from './context/MoodHistoryContext';
import { LoadingScreen } from './components/LoadingScreen';
import { loadFaceApiModels } from './utils/faceApi';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await loadFaceApiModels();
      } catch (error) {
        console.error("Error loading face-api models:", error);
      } finally {
        // Simulate loading time to allow face-api models to load
        setTimeout(() => setIsLoading(false), 1500);
      }
    };
    
    initializeApp();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <MoodHistoryProvider>
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<MoodDetection />} />
            <Route path="/recommend" element={<MusicRecommendation />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </MoodHistoryProvider>
    </BrowserRouter>
  );
}

export default App;