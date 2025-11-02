import React, { useState } from 'react';
import { LoggingTab } from './components/LoggingTab';
import { WeeklyTab } from './components/WeeklyTab';
import { SocialTab } from './components/SocialTab';
import { NutritionInfoTab } from './components/NutritionInfoTab';
import { FoodProvider } from './contexts/FoodContext';
import { AppleIcon, CalendarIcon, UsersIcon, InfoIcon } from 'lucide-react';
export function App() {
  const [activeTab, setActiveTab] = useState<'log' | 'progress' | 'social' | 'info'>('log');
  return <FoodProvider>
      <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-md mx-auto min-h-screen flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Sprout</h1>
            <p className="text-sm text-gray-500">
              Your daily nutrition companion
            </p>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-auto pb-20">
            {activeTab === 'log' && <LoggingTab />}
            {activeTab === 'progress' && <WeeklyTab />}
            {activeTab === 'social' && <SocialTab />}
            {activeTab === 'info' && <NutritionInfoTab />}
          </div>
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
            <div className="flex justify-around items-center h-16">
              <button onClick={() => setActiveTab('log')} className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${activeTab === 'log' ? 'text-green-600' : 'text-gray-400'}`}>
                <AppleIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Log</span>
              </button>
              <button onClick={() => setActiveTab('progress')} className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${activeTab === 'progress' ? 'text-green-600' : 'text-gray-400'}`}>
                <CalendarIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Progress</span>
              </button>
              <button onClick={() => setActiveTab('social')} className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${activeTab === 'social' ? 'text-green-600' : 'text-gray-400'}`}>
                <UsersIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Friends</span>
              </button>
              <button onClick={() => setActiveTab('info')} className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${activeTab === 'info' ? 'text-green-600' : 'text-gray-400'}`}>
                <InfoIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FoodProvider>;
}