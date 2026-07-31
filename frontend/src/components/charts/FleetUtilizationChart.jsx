import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function FleetUtilizationChart({ fleets }) {
    //console.log("Fleet Chart Data:", fleets);

    const chartData = (fleets ?? []).map((fleet) => ({
        name: fleet.fleet_name,
        vehicles: fleet.vehicle_count ?? 0,
    }));

   // console.log("Chart Data:", chartData);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Fleet Utilization
            </h2>

            <div className="h-80">

                {chartData.length ? (

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 5,
                        }}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="name"
                            angle={-20}
                            textAnchor="end"
                            height={60}
                            interval={0}
                        />

                        <YAxis allowDecimals={false} />

                        <Tooltip
                            formatter={(value) => [`${Number(value)} Vehicles`, "Fleet Size"]}
                        />

                        <Bar
                            dataKey="vehicles"
                            fill="#3b82f6"
                            radius={[6, 6, 0, 0]}
                            animationDuration={800}
                        />

                    </BarChart>

                </ResponsiveContainer>
                    ) : (

                        <div className="flex h-full items-center justify-center text-gray-500">
                            No fleet data available.
                        </div>

                    )}

            </div>

        </div>
    );
}