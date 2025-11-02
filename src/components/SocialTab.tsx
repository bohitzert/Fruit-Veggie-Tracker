import React from 'react';
import { UserPlusIcon, TrophyIcon } from 'lucide-react';
import { ActivityRing } from './ActivityRing';
interface Friend {
  name: string;
  progress: number;
  rank: number;
}
export function SocialTab() {
  const friends: Friend[] = [{
    name: 'Sarah Johnson',
    progress: 95,
    rank: 1
  }, {
    name: 'You',
    progress: 82,
    rank: 2
  }, {
    name: 'Mike Chen',
    progress: 78,
    rank: 3
  }, {
    name: 'Emma Davis',
    progress: 72,
    rank: 4
  }, {
    name: 'Alex Kim',
    progress: 68,
    rank: 5
  }];
  return <div className="p-6 space-y-6">
      {/* Add Friends */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Connect with Friends
          </h2>
          <button className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 transition-colors">
            <UserPlusIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Invite friends to track their nutrition together and stay motivated!
        </p>
      </div>
      {/* Weekly Leaderboard */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrophyIcon className="w-6 h-6 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-900">
            Weekly Leaderboard
          </h2>
        </div>
        <div className="space-y-3">
          {friends.map(friend => <div key={friend.name} className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${friend.name === 'You' ? 'bg-green-50 border-2 border-green-600' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-sm font-bold text-gray-700">
                {friend.rank}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${friend.name === 'You' ? 'text-green-700' : 'text-gray-900'}`}>
                  {friend.name}
                </p>
                <p className="text-sm text-gray-500">
                  {friend.progress}% weekly goal
                </p>
              </div>
              <ActivityRing progress={friend.progress} size={50} strokeWidth={5} color="#10b981" label="" />
            </div>)}
        </div>
      </div>
      {/* Motivation Section */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 shadow-sm text-white">
        <h3 className="text-xl font-bold mb-2">Keep it up! 🎉</h3>
        <p className="text-green-50">
          You are ahead of 3 friends this week. Stay consistent to maintain your
          position!
        </p>
      </div>
    </div>;
}