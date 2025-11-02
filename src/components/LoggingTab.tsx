import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { useFoodContext } from '../contexts/FoodContext';
interface FoodEntry {
  name: string;
  amount: number;
  unit: 'pieces' | 'grams';
  type: 'fruit' | 'vegetable';
}
const FRUITS = ['Apple', 'Banana', 'Orange', 'Strawberry', 'Blueberry', 'Grape', 'Mango', 'Pineapple', 'Watermelon', 'Peach', 'Pear', 'Cherry', 'Kiwi', 'Plum', 'Raspberry'];
const VEGETABLES = ['Carrot', 'Broccoli', 'Spinach', 'Tomato', 'Cucumber', 'Bell Pepper', 'Lettuce', 'Kale', 'Zucchini', 'Cauliflower', 'Celery', 'Onion', 'Mushroom', 'Asparagus', 'Green Beans'];
export function LoggingTab() {
  const {
    entries,
    addEntry
  } = useFoodContext();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    unit: 'pieces' as 'pieces' | 'grams',
    type: 'fruit' as 'fruit' | 'vegetable'
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.amount) {
      addEntry({
        name: formData.name,
        amount: parseFloat(formData.amount),
        unit: formData.unit,
        type: formData.type
      });
      setFormData({
        name: '',
        amount: '',
        unit: 'pieces',
        type: formData.type
      });
    }
  };
  const foodOptions = formData.type === 'fruit' ? FRUITS : VEGETABLES;
  // Filter to show only today's entries
  const getStartOfDay = (date: Date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
  };
  const today = getStartOfDay(new Date());
  const todayEntries = entries.filter(entry => getStartOfDay(entry.timestamp).getTime() === today.getTime());
  return <div className="p-6 space-y-6">
      {/* Input Form */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <button type="button" onClick={() => setFormData({
            ...formData,
            type: 'fruit',
            name: ''
          })} className={`flex-1 py-2 rounded-xl font-medium transition-colors ${formData.type === 'fruit' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
              Fruit
            </button>
            <button type="button" onClick={() => setFormData({
            ...formData,
            type: 'vegetable',
            name: ''
          })} className={`flex-1 py-2 rounded-xl font-medium transition-colors ${formData.type === 'vegetable' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
              Vegetable
            </button>
          </div>
          <select value={formData.name} onChange={e => setFormData({
          ...formData,
          name: e.target.value
        })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600">
            <option value="">Select {formData.type}</option>
            {foodOptions.map(food => <option key={food} value={food}>
                {food}
              </option>)}
          </select>
          <div className="flex gap-2">
            <input type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({
            ...formData,
            amount: e.target.value
          })} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600" />
            <select value={formData.unit} onChange={e => setFormData({
            ...formData,
            unit: e.target.value as 'pieces' | 'grams'
          })} className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="pieces">pieces</option>
              <option value="grams">grams</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
            <CheckIcon className="w-5 h-5" />
            Add Entry
          </button>
        </form>
      </div>
      {/* Today's Entries */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Today's Log
        </h2>
        <div className="space-y-2">
          {todayEntries.length === 0 ? <p className="text-gray-400 text-center py-4">
              No entries yet. Start logging!
            </p> : todayEntries.map((entry, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${entry.type === 'fruit' ? 'bg-green-100' : 'bg-orange-100'}`}>
                    <span className="text-lg">
                      {entry.type === 'fruit' ? '🍎' : '🥕'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{entry.name}</p>
                    <p className="text-sm text-gray-500">
                      {entry.amount} {entry.unit}
                    </p>
                  </div>
                </div>
              </div>)}
        </div>
      </div>
    </div>;
}