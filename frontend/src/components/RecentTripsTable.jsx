export default function RecentTripsTable({ trips }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Recent Trips
            </h2>
            <div className="overflow-x-auto">

                <table className="min-w-full border-collapse">
                <thead className="bg-gray-100">

                    <tr className="border-b text-left">
                        <th className="px-4 py-3 font-semibold text-gray-700">Pickup</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Destination</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Distance</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Duration</th>
                    </tr>
                </thead>

                <tbody>

                    {trips?.length ? (

                        trips.map((trip) => (

                            <tr
                                key={trip.id}
                                className="border-b hover:bg-gray-50 transition-colors"
                            >

                                <td className="px-4 py-3">
                                    {trip.current_location}
                                </td>

                                <td className="px-4 py-3">
                                    {trip.dropoff_location}
                                </td>

                                <td className="px-4 py-3">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            trip.status === "COMPLETED"
                                                ? "bg-green-100 text-green-700"
                                                : trip.status === "IN_PROGRESS"
                                                ? "bg-blue-100 text-blue-700"
                                                : trip.status === "CANCELLED"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {trip.status}
                                    </span>

</td>

                                <td className="px-4 py-3">
                                    {trip.distance_km} km
                                </td>

                                <td className="px-4 py-3">
                                    {trip.duration_hr} hr
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No recent trips available.
                            </td>

                        </tr>

                    )}

                </tbody>
            </table>

            </div>
        </div>
    );
}