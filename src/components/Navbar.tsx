import React from 'react';
import { NavLink } from 'react-router-dom';
import { Music, Camera, Home, BarChart2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white backdrop-blur-lg z-50 md:top-0 md:bottom-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:block">
            <NavLink to="/" className="text-xl font-bold flex items-center">
              <Music className="mr-2" size={24} />
              <span>Moodify</span>
            </NavLink>
          </div>
          
          <div className="w-full md:w-auto">
            <ul className="flex justify-around md:justify-end space-x-1 md:space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex flex-col items-center p-2 ${isActive ? 'text-purple-400' : 'text-white hover:text-purple-300'}`
                }
              >
                <Home size={20} />
                <span className="text-xs mt-1">Home</span>
              </NavLink>
              
              <NavLink 
                to="/detect" 
                className={({ isActive }) => 
                  `flex flex-col items-center p-2 ${isActive ? 'text-purple-400' : 'text-white hover:text-purple-300'}`
                }
              >
                <Camera size={20} />
                <span className="text-xs mt-1">Detect</span>
              </NavLink>
              
              <NavLink 
                to="/recommend" 
                className={({ isActive }) => 
                  `flex flex-col items-center p-2 ${isActive ? 'text-purple-400' : 'text-white hover:text-purple-300'}`
                }
              >
                <Music size={20} />
                <span className="text-xs mt-1">Music</span>
              </NavLink>
              
              <NavLink 
                to="/feedback" 
                className={({ isActive }) => 
                  `flex flex-col items-center p-2 ${isActive ? 'text-purple-400' : 'text-white hover:text-purple-300'}`
                }
              >
                <BarChart2 size={20} />
                <span className="text-xs mt-1">Insights</span>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};