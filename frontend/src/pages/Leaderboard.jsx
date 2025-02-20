import { useSelector } from 'react-redux';
import { Trophy, ThumbsDown, Award } from 'lucide-react';

const Leaderboard = () => {
  const { complaints } = useSelector((state) => state.complaints);

  // TODO: Replace with actual data from the backend
  const mockData = {
    worstOffenders: [
      { id: '1', name: 'John Doe', complaints: 5 },
      { id: '2', name: 'Jane Smith', complaints: 3 },
      { id: '3', name: 'Bob Johnson', complaints: 2 },
    ],
    topCategories: [
      { type: 'Noise', count: 8 },
      { type: 'Cleanliness', count: 6 },
      { type: 'Bills', count: 4 },
    ],
    bestFlatmates: [
      { id: '4', name: 'Alice Williams', karmaPoints: 150 },
      { id: '5', name: 'Charlie Brown', karmaPoints: 120 },
      { id: '6', name: 'David Miller', karmaPoints: 90 },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Flatmate Leaderboard</h1>
        <p className="mt-2 text-gray-600">See who&apos;s been naughty or nice!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Hall of Shame */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ThumbsDown className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">Hall of Shame</h2>
          </div>
          <div className="space-y-4">
            {mockData.worstOffenders.map((offender, index) => (
              <div key={offender.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">#{index + 1}</span>
                  <span className="font-medium">{offender.name}</span>
                </div>
                <span className="text-red-500 font-medium">{offender.complaints} complaints</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900">Top Issues</h2>
          </div>
          <div className="space-y-4">
            {mockData.topCategories.map((category, index) => (
              <div key={category.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">#{index + 1}</span>
                  <span className="font-medium">{category.type}</span>
                </div>
                <span className="text-gray-600">{category.count} times</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Flatmates */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900">Best Flatmates</h2>
          </div>
          <div className="space-y-4">
            {mockData.bestFlatmates.map((flatmate, index) => (
              <div key={flatmate.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">#{index + 1}</span>
                  <span className="font-medium">{flatmate.name}</span>
                </div>
                <span className="text-green-500 font-medium">{flatmate.karmaPoints} karma</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        {complaints.length === 0 ? (
          <p className="text-gray-600">No recent complaints!</p>
        ) : (
          <div className="space-y-4">
            {complaints.slice(0, 5).map((complaint) => (
              <div key={complaint.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{complaint.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                    {complaint.type}
                  </span>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                    {complaint.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;