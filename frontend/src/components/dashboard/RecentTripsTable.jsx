function getStatusColor(status) {
    switch (status) {
        case "COMPLETED":
            return "bg-green-100 text-green-700";

        case "PLANNED":
            return "bg-yellow-100 text-yellow-700";

        case "ASSIGNED":
            return "bg-blue-100 text-blue-700";

        case "STARTED":
            return "bg-purple-100 text-purple-700";

        case "ON_ROUTE":
            return "bg-indigo-100 text-indigo-700";

        case "CANCELLED":
            return "bg-red-100 text-red-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
}

function RecentTripsTable({ trips }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500 uppercase text-sm font-semibold mb-5">
                Recent Trips
            </h3>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">From</th>
                        <th className="text-left py-3">To</th>
                        <th className="text-left py-3">Status</th>
                        <th className="text-left py-3">Distance</th>
                        <th className="text-left py-3">Duration</th>
                        <th className="text-left py-3">Created</th>

                    </tr>

                </thead>

                <tbody>

                    {trips.map((trip) => (

                        <tr
                            key={trip.id}
                            className="border-b hover:bg-blue-50 transition"
                        >

                            <td className="py-4">
                                {trip.current_location}
                            </td>

                            <td>
                                {trip.dropoff_location}
                            </td>

                            <td>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                                        trip.status
                                    )}`}
                                >
                                    {trip.status}
                                </span>

                            </td>

                            <td>
                                {trip.distance_km} km
                            </td>

                            <td>
                                {trip.duration_hr} hr
                            </td>

                            <td>
                                {new Date(
                                    trip.created_at
                                ).toLocaleDateString()}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default RecentTripsTable;