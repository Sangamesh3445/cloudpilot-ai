import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function MonthlyTripDistanceChart({ trips }) {

    const monthlyData = Array.from({ length: 12 }, (_, index) => ({
        month:new Date(new Date().getFullYear(), index).toLocaleString("default", {
            month: "short",
        }),
        distance: 0,
    }));

    (trips ?? []).forEach((trip) => {

        if (!trip.created_at || trip.distance_km == null) return;

        const month = new Date(trip.created_at).getMonth();

        monthlyData[month].distance += Number(trip.distance_km);

    });

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Monthly Trip Distance
            </h2>

            <div className="h-80">

                {(trips ?? []).length ? (

                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart
                            data={monthlyData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5,
                            }}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis
                                allowDecimals={false}
                                tickFormatter={(value) => `${value} km`}
                            />

                            <Tooltip
                                formatter={(value) => [`${Number(value)} km`, "Distance"]}
                                labelFormatter={(label) => `Month: ${label}`}
                            />

                            <Line
                                type="monotone"
                                dataKey="distance"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={{
                                    fill: "#22c55e",
                                    stroke: "#16a34a",
                                    strokeWidth: 2,
                                    r: 5,
                                }}
                                activeDot={{ r: 7 }}
                                animationDuration={1000}
                                connectNulls
                            />

                        </LineChart>

                    </ResponsiveContainer>

                ) : (

                    <div className="flex h-full items-center justify-center text-gray-500">
                        No trip data available.
                    </div>

                )}

            </div>

        </div>
    );
}