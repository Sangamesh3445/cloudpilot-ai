import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#2563eb", // Planned
    "#f59e0b", // Assigned
    "#06b6d4", // Started
    "#8b5cf6", // On Route
    "#22c55e", // Completed
    "#ef4444", // Cancelled
];

export default function TripStatusChart({ trips }) {
    //console.log("TripStatusChart props:", trips);

    const chartData = [
        { name: "Planned", value: trips?.planned ?? 0 },
        { name: "Assigned", value: trips?.assigned ?? 0 },
        { name: "Started", value: trips?.started ?? 0 },
        { name: "On Route", value: trips?.on_route ?? 0 },
        { name: "Completed", value: trips?.completed ?? 0 },
        { name: "Cancelled", value: trips?.cancelled ?? 0 },
    ].filter(item => item.value > 0);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Trip Status
            </h2>

            <div className="h-80">
                {chartData.length ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={entry.name}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
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