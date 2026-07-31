function StatCard({ title, value, color }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: color }}>
            <h3 className="text-gray-500 text-sm font-semibold uppercase">
                {title}
            </h3>

            <p className="text-4xl font-bold mt-3">
                {value}
            </p>
        </div>
            
    );
}

export default StatCard;