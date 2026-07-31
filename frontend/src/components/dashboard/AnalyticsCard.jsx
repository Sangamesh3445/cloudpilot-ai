function AnalyticsCard({ title, value, unit = "" }) {
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500 text-sm uppercase font-semibold">
                {title}
            </h3>

            <div className="mt-4 text-3xl font-bold text-blue-600">
                {value}{unit}
            </div>
        </div>
    );
}

export default AnalyticsCard;