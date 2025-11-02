import React, { useEffect, useState, Children } from 'react';
import { InfoIcon, CheckIcon } from 'lucide-react';
import { useFoodContext } from '../contexts/FoodContext';
interface NutritionGuidelines {
  ageGroup: string;
  dailyFruits: string;
  dailyVegetables: string;
  dailyTotal: string;
  weeklyTotal: string;
  notes: string;
}
const NUTRITION_GUIDELINES: Record<string, Record<string, NutritionGuidelines>> = {
  male: {
    '2-5': {
      ageGroup: '2-5 years',
      dailyFruits: '150-200g (2 portions)',
      dailyVegetables: '150-200g (2 portions)',
      dailyTotal: '300-400g',
      weeklyTotal: '2.1-2.8kg',
      notes: 'Children need smaller portions but should still eat a variety of colorful fruits and vegetables.'
    },
    '6-10': {
      ageGroup: '6-10 years',
      dailyFruits: '200-250g (2-3 portions)',
      dailyVegetables: '200-250g (2-3 portions)',
      dailyTotal: '400-500g',
      weeklyTotal: '2.8-3.5kg',
      notes: 'Growing children benefit from increased portions and variety in their diet.'
    },
    '11-14': {
      ageGroup: '11-14 years',
      dailyFruits: '250-300g (3 portions)',
      dailyVegetables: '250-300g (3 portions)',
      dailyTotal: '500-600g',
      weeklyTotal: '3.5-4.2kg',
      notes: 'Adolescents have higher nutritional needs to support rapid growth and development.'
    },
    '15-18': {
      ageGroup: '15-18 years',
      dailyFruits: '250-300g (3 portions)',
      dailyVegetables: '300-350g (3-4 portions)',
      dailyTotal: '550-650g',
      weeklyTotal: '3.9-4.6kg',
      notes: 'Teenage boys need substantial nutrition for growth spurts and physical activity.'
    },
    '19-64': {
      ageGroup: '19-64 years',
      dailyFruits: '200-250g (2-3 portions)',
      dailyVegetables: '300-350g (3-4 portions)',
      dailyTotal: '500-600g',
      weeklyTotal: '3.5-4.2kg',
      notes: 'Adults should aim for at least 400g daily, with emphasis on variety and color.'
    },
    '65+': {
      ageGroup: '65+ years',
      dailyFruits: '200-250g (2-3 portions)',
      dailyVegetables: '250-300g (3 portions)',
      dailyTotal: '450-550g',
      weeklyTotal: '3.2-3.9kg',
      notes: 'Older adults benefit from nutrient-dense fruits and vegetables to maintain health.'
    }
  },
  female: {
    '2-5': {
      ageGroup: '2-5 years',
      dailyFruits: '150-200g (2 portions)',
      dailyVegetables: '150-200g (2 portions)',
      dailyTotal: '300-400g',
      weeklyTotal: '2.1-2.8kg',
      notes: 'Children need smaller portions but should still eat a variety of colorful fruits and vegetables.'
    },
    '6-10': {
      ageGroup: '6-10 years',
      dailyFruits: '200-250g (2-3 portions)',
      dailyVegetables: '200-250g (2-3 portions)',
      dailyTotal: '400-500g',
      weeklyTotal: '2.8-3.5kg',
      notes: 'Growing children benefit from increased portions and variety in their diet.'
    },
    '11-14': {
      ageGroup: '11-14 years',
      dailyFruits: '250-300g (3 portions)',
      dailyVegetables: '250-300g (3 portions)',
      dailyTotal: '500-600g',
      weeklyTotal: '3.5-4.2kg',
      notes: 'Adolescents have higher nutritional needs to support rapid growth and development.'
    },
    '15-18': {
      ageGroup: '15-18 years',
      dailyFruits: '200-250g (2-3 portions)',
      dailyVegetables: '250-300g (3 portions)',
      dailyTotal: '450-550g',
      weeklyTotal: '3.2-3.9kg',
      notes: 'Teenage girls need adequate nutrition for growth and development.'
    },
    '19-64': {
      ageGroup: '19-64 years',
      dailyFruits: '200-250g (2-3 portions)',
      dailyVegetables: '250-300g (3 portions)',
      dailyTotal: '450-550g',
      weeklyTotal: '3.2-3.9kg',
      notes: 'Adult women should aim for at least 400g daily, with emphasis on variety and color.'
    },
    '65+': {
      ageGroup: '65+ years',
      dailyFruits: '200-250g (2-3 portions)',
      dailyVegetables: '250-300g (3 portions)',
      dailyTotal: '450-550g',
      weeklyTotal: '3.2-3.9kg',
      notes: 'Older women benefit from nutrient-dense fruits and vegetables to maintain health.'
    }
  }
};
export function NutritionInfoTab() {
  const {
    profile,
    saveProfile
  } = useFoodContext();
  const [gender, setGender] = useState<'male' | 'female'>(profile?.gender || 'male');
  const [age, setAge] = useState<string>(profile?.age || '25');
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  useEffect(() => {
    if (profile) {
      setGender(profile.gender);
      setAge(profile.age);
    }
  }, [profile]);
  const handleSaveProfile = () => {
    saveProfile({
      gender,
      age
    });
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };
  // Function to determine age group based on age
  const getAgeGroup = (ageValue: string): string => {
    const numAge = parseInt(ageValue);
    if (isNaN(numAge) || numAge < 2) return '19-64';
    if (numAge >= 2 && numAge <= 5) return '2-5';
    if (numAge >= 6 && numAge <= 10) return '6-10';
    if (numAge >= 11 && numAge <= 14) return '11-14';
    if (numAge >= 15 && numAge <= 18) return '15-18';
    if (numAge >= 19 && numAge <= 64) return '19-64';
    return '65+';
  };
  const ageGroup = getAgeGroup(age);
  const guidelines = NUTRITION_GUIDELINES[gender][ageGroup];
  return <div className="p-6 space-y-6">
      {/* User Profile Selection */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex gap-2">
              <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl font-medium transition-colors ${gender === 'male' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Male
              </button>
              <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl font-medium transition-colors ${gender === 'female' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Female
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Enter your age" min="2" max="120" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600" />
          </div>
          <button onClick={handleSaveProfile} className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
            {showSavedMessage ? <>
                <CheckIcon className="w-5 h-5" />
                Profile Saved!
              </> : 'Save Profile'}
          </button>
          {profile && !showSavedMessage && <p className="text-sm text-gray-500 text-center">
              Profile saved for personalized tracking
            </p>}
        </div>
      </div>
      {/* Recommended Intake */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recommended Daily Intake
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🍎</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Fruits</p>
                <p className="text-sm text-gray-600 mt-1">
                  {guidelines.dailyFruits}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🥕</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Vegetables</p>
                <p className="text-sm text-gray-600 mt-1">
                  {guidelines.dailyVegetables}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📊</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Daily Total</p>
                <p className="text-sm text-gray-600 mt-1">
                  {guidelines.dailyTotal}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Weekly Target */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Weekly Target
        </h2>
        <div className="p-4 bg-purple-50 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🎯</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Total Weekly Intake</p>
              <p className="text-sm text-gray-600 mt-1">
                {guidelines.weeklyTotal} of fruits and vegetables combined
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Additional Notes */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Important Notes
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {guidelines.notes}
            </p>
          </div>
        </div>
      </div>
      {/* Understanding Portions */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Understanding Portions
        </h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-semibold">•</span>
            <p>One portion = approximately 80g or one medium-sized fruit</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-semibold">•</span>
            <p>Aim for variety: different colors provide different nutrients</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-semibold">•</span>
            <p>Fresh, frozen, and canned all count towards your daily intake</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-semibold">•</span>
            <p>
              Limit fruit juice to 150ml per day (counts as 1 portion maximum)
            </p>
          </div>
        </div>
      </div>
      {/* Source Information */}
      <div className="bg-gray-50 rounded-3xl p-6">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Sources:</strong> These recommendations are based on the
          European Food Safety Authority (EFSA) guidelines and the European
          Commission's Food-Based Dietary Guidelines. Individual needs may vary
          based on activity level, health conditions, and other factors. Consult
          a healthcare professional for personalized advice.
        </p>
      </div>
    </div>;
}