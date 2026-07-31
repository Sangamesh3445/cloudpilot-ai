function FleetHealthCard({ score, status }) {

    let color = "bg-red-500";

    if (status === "GOOD") color = "bg-green-500";

    if (status === "AVERAGE") color = "bg-yellow-500";

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500 uppercase text-sm font-semibold">
                Fleet Health
            </h3>

            <div className="mt-5">

                <p className="text-5xl font-bold">
                    {score}
                </p>

                <p className="text-xl font-bold text-green-600 mt-3">
                    {status}
                </p>

                <div className="w-full h-3 bg-gray-200 rounded-full mt-6">

                    <div
                        className={`${color} h-3 rounded-full`}
                        style={{
                            width: `${score}%`,
                        }}
                    ></div>

                </div>

            </div>

        </div>

    );

}

export default FleetHealthCard;