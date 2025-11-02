import React, { useState } from 'react';
import { VitaminCircle } from './VitaminCircle';
import { NestedActivityRing } from './NestedActivityRing';
import { PlusIcon, XIcon } from 'lucide-react';
import { useFoodContext } from '../contexts/FoodContext';
interface Vitamin {
  id: string;
  name: string;
  current: number;
  recommended: number;
  unit: string;
  color: string;
}
export function WeeklyTab() {
  const {
    getTodayProgress,
    getWeekProgress,
    getTodayVitamins,
    getWeekVitamins
  } = useFoodContext();
  const [customDailyVitamins, setCustomDailyVitamins] = useState<Vitamin[]>([]);
  const [customWeeklyVitamins, setCustomWeeklyVitamins] = useState<Vitamin[]>([]);
  const [showDailyAddForm, setShowDailyAddForm] = useState(false);
  const [showWeeklyAddForm, setShowWeeklyAddForm] = useState(false);
  const todayProgress = getTodayProgress();
  const weeklyProgress = getWeekProgress();
  const todayVitamins = getTodayVitamins();
  const weekVitamins = getWeekVitamins();
  // Default daily vitamins with real data
  const defaultDailyVitamins: Vitamin[] = [{
    id: 'daily-vitamin-c',
    name: 'Vitamin C',
    current: Math.round(todayVitamins.vitaminC),
    recommended: 90,
    unit: 'mg',
    color: '#f59e0b'
  }, {
    id: 'daily-vitamin-a',
    name: 'Vitamin A',
    current: Math.round(todayVitamins.vitaminA),
    recommended: 900,
    unit: 'mcg',
    color: '#10b981'
  }, {
    id: 'daily-fiber',
    name: 'Fiber',
    current: Math.round(todayVitamins.fiber),
    recommended: 25,
    unit: 'g',
    color: '#3b82f6'
  }];
  // Default weekly vitamins with real data
  const defaultWeeklyVitamins: Vitamin[] = [{
    id: 'weekly-vitamin-c',
    name: 'Vitamin C',
    current: Math.round(weekVitamins.vitaminC),
    recommended: 630,
    unit: 'mg',
    color: '#f59e0b'
  }, {
    id: 'weekly-vitamin-a',
    name: 'Vitamin A',
    current: Math.round(weekVitamins.vitaminA),
    recommended: 6300,
    unit: 'mcg',
    color: '#10b981'
  }, {
    id: 'weekly-fiber',
    name: 'Fiber',
    current: Math.round(weekVitamins.fiber),
    recommended: 175,
    unit: 'g',
    color: '#3b82f6'
  }, {
    id: 'weekly-potassium',
    name: 'Potassium',
    current: Math.round(weekVitamins.potassium),
    recommended: 24500,
    unit: 'mg',
    color: '#8b5cf6'
  }];
  const dailyVitamins = [...defaultDailyVitamins, ...customDailyVitamins];
  const weeklyVitamins = [...defaultWeeklyVitamins, ...customWeeklyVitamins];
  const removeCustomDailyVitamin = (id: string) => {
    setCustomDailyVitamins(customDailyVitamins.filter(v => v.id !== id));
  };
  const removeCustomWeeklyVitamin = (id: string) => {
    setCustomWeeklyVitamins(customWeeklyVitamins.filter(v => v.id !== id));
  };
  const availableColors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#ec4899'];
  return <div className="p-6 space-y-6">
      {/* Today's Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Today's Progress
        </h2>
        <div className="flex justify-center">
          <NestedActivityRing size={200} rings={[{
          progress: todayProgress.combined,
          color: '#3b82f6',
          label: 'Total'
        }, {
          progress: todayProgress.fruits,
          color: '#10b981',
          label: 'Fruits'
        }, {
          progress: todayProgress.vegetables,
          color: '#f59e0b',
          label: 'Veggies'
        }]} />
        </div>
      </div>
      {/* Weekly Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          This Week's Progress
        </h2>
        <div className="flex justify-center">
          <NestedActivityRing size={200} rings={[{
          progress: weeklyProgress.combined,
          color: '#3b82f6',
          label: 'Total'
        }, {
          progress: weeklyProgress.fruits,
          color: '#10b981',
          label: 'Fruits'
        }, {
          progress: weeklyProgress.vegetables,
          color: '#f59e0b',
          label: 'Veggies'
        }]} />
        </div>
      </div>
      {/* Daily Vitamin Tracking */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Daily Vitamins
          </h2>
          <button onClick={() => setShowDailyAddForm(!showDailyAddForm)} className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 transition-colors">
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        {showDailyAddForm && <div className="mb-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">
              Add custom vitamins or nutrients you want to track daily
            </p>
            <button onClick={() => {
          const newVitamin: Vitamin = {
            id: Date.now().toString(),
            name: 'Custom Nutrient',
            current: 0,
            recommended: 100,
            unit: 'mg',
            color: availableColors[Math.floor(Math.random() * availableColors.length)]
          };
          setCustomDailyVitamins([...customDailyVitamins, newVitamin]);
          setShowDailyAddForm(false);
        }} className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
              Add Nutrient
            </button>
          </div>}
        <div className="grid grid-cols-2 gap-4">
          {dailyVitamins.map(vitamin => <div key={vitamin.id} className="relative">
              {!vitamin.id.startsWith('daily-') && <button onClick={() => removeCustomDailyVitamin(vitamin.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10">
                  <XIcon className="w-3 h-3" />
                </button>}
              <VitaminCircle name={vitamin.name} current={vitamin.current} recommended={vitamin.recommended} unit={vitamin.unit} color={vitamin.color} period="daily" />
            </div>)}
        </div>
      </div>
      {/* Weekly Vitamin Tracking */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Weekly Vitamins
          </h2>
          <button onClick={() => setShowWeeklyAddForm(!showWeeklyAddForm)} className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 transition-colors">
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        {showWeeklyAddForm && <div className="mb-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">
              Add custom vitamins or nutrients you want to track weekly
            </p>
            <button onClick={() => {
          const newVitamin: Vitamin = {
            id: Date.now().toString(),
            name: 'Custom Nutrient',
            current: 0,
            recommended: 700,
            unit: 'mg',
            color: availableColors[Math.floor(Math.random() * availableColors.length)]
          };
          setCustomWeeklyVitamins([...customWeeklyVitamins, newVitamin]);
          setShowWeeklyAddForm(false);
        }} className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
              Add Nutrient
            </button>
          </div>}
        <div className="grid grid-cols-2 gap-4">
          {weeklyVitamins.map(vitamin => <div key={vitamin.id} className="relative">
              {!vitamin.id.startsWith('weekly-') && <button onClick={() => removeCustomWeeklyVitamin(vitamin.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10">
                  <XIcon className="w-3 h-3" />
                </button>}
              <VitaminCircle name={vitamin.name} current={vitamin.current} recommended={vitamin.recommended} unit={vitamin.unit} color={vitamin.color} period="weekly" />
            </div>)}
        </div>
      </div>
    </div>;
}