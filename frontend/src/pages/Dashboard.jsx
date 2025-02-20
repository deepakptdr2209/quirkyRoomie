
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { complaints } = useSelector((state) => state.complaints);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <p className="text-gray-600">Flat Code: {user?.flatCode}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Complaints</h2>
        {complaints.length === 0 ? (
          <p className="text-gray-600">No complaints yet. All is peaceful!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                      {complaint.type}
                    </span>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      {complaint.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;