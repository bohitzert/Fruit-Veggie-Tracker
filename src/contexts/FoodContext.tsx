import React, { useEffect, useState, createContext, useContext } from 'react';
interface FoodEntry {
  name: string;
  amount: number;
  unit: 'pieces' | 'grams';
  type: 'fruit' | 'vegetable';
  timestamp: Date;
}
interface NutritionData {
  vitaminC: number;
  vitaminA: number;
  fiber: number;
  potassium: number;
}
interface VitaminTotals {
  vitaminC: number;
  vitaminA: number;
  fiber: number;
  potassium: number;
}
interface UserProfile {
  gender: 'male' | 'female';
  age: string;
}
interface FoodContextType {
  entries: FoodEntry[];
  profile: UserProfile | null;
  addEntry: (entry: Omit<FoodEntry, 'timestamp'>) => void;
  saveProfile: (profile: UserProfile) => void;
  getTodayProgress: () => {
    fruits: number;
    vegetables: number;
    combined: number;
  };
  getWeekProgress: () => {
    fruits: number;
    vegetables: number;
    combined: number;
  };
  getTodayVitamins: () => VitaminTotals;
  getWeekVitamins: () => VitaminTotals;
}
const FoodContext = createContext<FoodContextType | undefined>(undefined);
// Nutrition database (per 100g)
const NUTRITION_DB: Record<string, NutritionData> = {
  // Fruits
  Apple: {
    vitaminC: 4.6,
    vitaminA: 3,
    fiber: 2.4,
    potassium: 107
  },
  Banana: {
    vitaminC: 8.7,
    vitaminA: 3,
    fiber: 2.6,
    potassium: 358
  },
  Orange: {
    vitaminC: 53.2,
    vitaminA: 11,
    fiber: 2.4,
    potassium: 181
  },
  Strawberry: {
    vitaminC: 58.8,
    vitaminA: 1,
    fiber: 2.0,
    potassium: 153
  },
  Blueberry: {
    vitaminC: 9.7,
    vitaminA: 3,
    fiber: 2.4,
    potassium: 77
  },
  Grape: {
    vitaminC: 3.2,
    vitaminA: 3,
    fiber: 0.9,
    potassium: 191
  },
  Mango: {
    vitaminC: 36.4,
    vitaminA: 54,
    fiber: 1.6,
    potassium: 168
  },
  Pineapple: {
    vitaminC: 47.8,
    vitaminA: 3,
    fiber: 1.4,
    potassium: 109
  },
  Watermelon: {
    vitaminC: 8.1,
    vitaminA: 28,
    fiber: 0.4,
    potassium: 112
  },
  Peach: {
    vitaminC: 6.6,
    vitaminA: 16,
    fiber: 1.5,
    potassium: 190
  },
  Pear: {
    vitaminC: 4.3,
    vitaminA: 1,
    fiber: 3.1,
    potassium: 116
  },
  Cherry: {
    vitaminC: 7.0,
    vitaminA: 3,
    fiber: 2.1,
    potassium: 222
  },
  Kiwi: {
    vitaminC: 92.7,
    vitaminA: 4,
    fiber: 3.0,
    potassium: 312
  },
  Plum: {
    vitaminC: 9.5,
    vitaminA: 17,
    fiber: 1.4,
    potassium: 157
  },
  Raspberry: {
    vitaminC: 26.2,
    vitaminA: 2,
    fiber: 6.5,
    potassium: 151
  },
  // Vegetables
  Carrot: {
    vitaminC: 5.9,
    vitaminA: 835,
    fiber: 2.8,
    potassium: 320
  },
  Broccoli: {
    vitaminC: 89.2,
    vitaminA: 31,
    fiber: 2.6,
    potassium: 316
  },
  Spinach: {
    vitaminC: 28.1,
    vitaminA: 469,
    fiber: 2.2,
    potassium: 558
  },
  Tomato: {
    vitaminC: 13.7,
    vitaminA: 42,
    fiber: 1.2,
    potassium: 237
  },
  Cucumber: {
    vitaminC: 2.8,
    vitaminA: 5,
    fiber: 0.5,
    potassium: 147
  },
  'Bell Pepper': {
    vitaminC: 127.7,
    vitaminA: 157,
    fiber: 2.1,
    potassium: 211
  },
  Lettuce: {
    vitaminC: 9.2,
    vitaminA: 370,
    fiber: 1.3,
    potassium: 194
  },
  Kale: {
    vitaminC: 120.0,
    vitaminA: 500,
    fiber: 3.6,
    potassium: 491
  },
  Zucchini: {
    vitaminC: 17.9,
    vitaminA: 10,
    fiber: 1.0,
    potassium: 261
  },
  Cauliflower: {
    vitaminC: 48.2,
    vitaminA: 0,
    fiber: 2.0,
    potassium: 303
  },
  Celery: {
    vitaminC: 3.1,
    vitaminA: 22,
    fiber: 1.6,
    potassium: 260
  },
  Onion: {
    vitaminC: 7.4,
    vitaminA: 0,
    fiber: 1.7,
    potassium: 146
  },
  Mushroom: {
    vitaminC: 2.1,
    vitaminA: 0,
    fiber: 1.0,
    potassium: 318
  },
  Asparagus: {
    vitaminC: 5.6,
    vitaminA: 38,
    fiber: 2.1,
    potassium: 202
  },
  'Green Beans': {
    vitaminC: 12.2,
    vitaminA: 35,
    fiber: 2.7,
    potassium: 211
  }
};
// Target guidelines per age group (in grams)
const TARGET_GUIDELINES: Record<string, Record<string, {
  dailyFruits: number;
  dailyVegetables: number;
}>> = {
  male: {
    '2-5': {
      dailyFruits: 175,
      dailyVegetables: 175
    },
    '6-10': {
      dailyFruits: 225,
      dailyVegetables: 225
    },
    '11-14': {
      dailyFruits: 275,
      dailyVegetables: 275
    },
    '15-18': {
      dailyFruits: 275,
      dailyVegetables: 325
    },
    '19-64': {
      dailyFruits: 225,
      dailyVegetables: 325
    },
    '65+': {
      dailyFruits: 225,
      dailyVegetables: 275
    }
  },
  female: {
    '2-5': {
      dailyFruits: 175,
      dailyVegetables: 175
    },
    '6-10': {
      dailyFruits: 225,
      dailyVegetables: 225
    },
    '11-14': {
      dailyFruits: 275,
      dailyVegetables: 275
    },
    '15-18': {
      dailyFruits: 225,
      dailyVegetables: 275
    },
    '19-64': {
      dailyFruits: 225,
      dailyVegetables: 275
    },
    '65+': {
      dailyFruits: 225,
      dailyVegetables: 275
    }
  }
};
export function FoodProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [entries, setEntries] = useState<FoodEntry[]>(() => {
    const saved = localStorage.getItem('foodEntries');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
    }
    return [];
  });
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });
  useEffect(() => {
    localStorage.setItem('foodEntries', JSON.stringify(entries));
  }, [entries]);
  useEffect(() => {
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, [profile]);
  const addEntry = (entry: Omit<FoodEntry, 'timestamp'>) => {
    setEntries([...entries, {
      ...entry,
      timestamp: new Date()
    }]);
  };
  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };
  const getAgeGroup = (age: string): string => {
    const numAge = parseInt(age);
    if (isNaN(numAge) || numAge < 2) return '19-64';
    if (numAge >= 2 && numAge <= 5) return '2-5';
    if (numAge >= 6 && numAge <= 10) return '6-10';
    if (numAge >= 11 && numAge <= 14) return '11-14';
    if (numAge >= 15 && numAge <= 18) return '15-18';
    if (numAge >= 19 && numAge <= 64) return '19-64';
    return '65+';
  };
  const getTargets = () => {
    if (!profile) {
      return {
        dailyFruits: 225,
        dailyVegetables: 325
      };
    }
    const ageGroup = getAgeGroup(profile.age);
    return TARGET_GUIDELINES[profile.gender][ageGroup];
  };
  const getStartOfDay = (date: Date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
  };
  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Monday as start of week
    start.setDate(start.getDate() + diff);
    start.setHours(0, 0, 0, 0);
    return start;
  };
  const calculateProgress = (filteredEntries: FoodEntry[]) => {
    const targets = getTargets();
    const fruitServings = filteredEntries.filter(e => e.type === 'fruit').reduce((sum, e) => {
      const grams = e.unit === 'pieces' ? e.amount * 100 : e.amount;
      return sum + grams;
    }, 0);
    const vegetableServings = filteredEntries.filter(e => e.type === 'vegetable').reduce((sum, e) => {
      const grams = e.unit === 'pieces' ? e.amount * 100 : e.amount;
      return sum + grams;
    }, 0);
    const fruitProgress = Math.min(fruitServings / targets.dailyFruits * 100, 100);
    const vegetableProgress = Math.min(vegetableServings / targets.dailyVegetables * 100, 100);
    const combined = (fruitProgress + vegetableProgress) / 2;
    return {
      fruits: Math.round(fruitProgress),
      vegetables: Math.round(vegetableProgress),
      combined: Math.round(combined)
    };
  };
  const calculateVitamins = (filteredEntries: FoodEntry[]): VitaminTotals => {
    return filteredEntries.reduce((totals, entry) => {
      const nutrition = NUTRITION_DB[entry.name];
      if (!nutrition) return totals;
      const grams = entry.unit === 'pieces' ? entry.amount * 100 : entry.amount;
      const factor = grams / 100;
      return {
        vitaminC: totals.vitaminC + nutrition.vitaminC * factor,
        vitaminA: totals.vitaminA + nutrition.vitaminA * factor,
        fiber: totals.fiber + nutrition.fiber * factor,
        potassium: totals.potassium + nutrition.potassium * factor
      };
    }, {
      vitaminC: 0,
      vitaminA: 0,
      fiber: 0,
      potassium: 0
    });
  };
  const getTodayProgress = () => {
    const today = getStartOfDay(new Date());
    const todayEntries = entries.filter(entry => getStartOfDay(entry.timestamp).getTime() === today.getTime());
    return calculateProgress(todayEntries);
  };
  const getWeekProgress = () => {
    const targets = getTargets();
    const weekStart = getStartOfWeek(new Date());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const weekEntries = entries.filter(entry => {
      const entryDate = entry.timestamp;
      return entryDate >= weekStart && entryDate < weekEnd;
    });
    const fruitServings = weekEntries.filter(e => e.type === 'fruit').reduce((sum, e) => {
      const grams = e.unit === 'pieces' ? e.amount * 100 : e.amount;
      return sum + grams;
    }, 0);
    const vegetableServings = weekEntries.filter(e => e.type === 'vegetable').reduce((sum, e) => {
      const grams = e.unit === 'pieces' ? e.amount * 100 : e.amount;
      return sum + grams;
    }, 0);
    const weeklyFruitTarget = targets.dailyFruits * 7;
    const weeklyVegetableTarget = targets.dailyVegetables * 7;
    const fruitProgress = Math.min(fruitServings / weeklyFruitTarget * 100, 100);
    const vegetableProgress = Math.min(vegetableServings / weeklyVegetableTarget * 100, 100);
    const combined = (fruitProgress + vegetableProgress) / 2;
    return {
      fruits: Math.round(fruitProgress),
      vegetables: Math.round(vegetableProgress),
      combined: Math.round(combined)
    };
  };
  const getTodayVitamins = () => {
    const today = getStartOfDay(new Date());
    const todayEntries = entries.filter(entry => getStartOfDay(entry.timestamp).getTime() === today.getTime());
    return calculateVitamins(todayEntries);
  };
  const getWeekVitamins = () => {
    const weekStart = getStartOfWeek(new Date());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const weekEntries = entries.filter(entry => {
      const entryDate = entry.timestamp;
      return entryDate >= weekStart && entryDate < weekEnd;
    });
    return calculateVitamins(weekEntries);
  };
  return <FoodContext.Provider value={{
    entries,
    profile,
    addEntry,
    saveProfile,
    getTodayProgress,
    getWeekProgress,
    getTodayVitamins,
    getWeekVitamins
  }}>
      {children}
    </FoodContext.Provider>;
}
export function useFoodContext() {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFoodContext must be used within FoodProvider');
  }
  return context;
}