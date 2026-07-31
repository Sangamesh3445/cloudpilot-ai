export default function DashboardCard({
    title,
    value,
    subtitle,
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">

            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {title}
            </h3>

            <h2 className="mt-3 text-4xl font-bold text-gray-900">
                {value}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                {subtitle}
            </p>

        </div>
    );
}