export default function AIInsights({ alerts, fleetHealth }) {
    return (
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-10">
            <h2 className="text-2xl font-semibold text-gray-800">
                AI Insights
            </h2>

            <div className="mt-5 space-y-3">

                {alerts?.ai_insights?.length ? (

                    alerts.ai_insights.map((insight, index) => (

                        <div
                            key={index}
                            className="flex items-start gap-3 rounded-lg bg-gray-50 border border-gray-200 p-4"
                        >
                            <span className="text-green-600 font-bold">
                                ✓
                            </span>

                            <span className="text-gray-700">
                                {insight}
                            </span>

                        </div>

                    ))

                ) : (

                    <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center text-gray-500">
                        No AI insights available.
                    </div>

                )}

            </div>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Fleet Health
            </h3>

           <div className="space-y-3">

                <div className="flex justify-between items-center">

                    <span className="font-medium text-gray-700">
                        Score
                    </span>

                    <span className="text-lg font-bold text-gray-900">
                        {fleetHealth.score}
                    </span>

                </div>

                <div className="flex justify-between items-center">

                    <span className="font-medium text-gray-700">
                        Status
                    </span>

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            fleetHealth.status === "GOOD"
                                ? "bg-green-100 text-green-700"
                                : fleetHealth.status === "AVERAGE"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {fleetHealth.status}
                    </span>

                </div>

            </div>
        </div>
    );
}