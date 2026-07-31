function AlertsPanel({ alerts }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500 uppercase text-sm font-semibold mb-5">
                Alerts
            </h3>

            {alerts.license_expiry.length === 0 ? (

                <div className="flex items-center gap-3">

                    <span className="text-2xl">
                        ✅
                    </span>

                    <span className="text-green-600 font-semibold">
                        No License Expiry Alerts
                    </span>

                </div>

            ) : (

                alerts.license_expiry.map((driver) => (

                    <div
                        key={driver.id}
                        className="mb-3 text-red-600"
                    >
                        {driver.first_name} {driver.last_name}
                    </div>

                ))

            )}

        </div>

    );

}

export default AlertsPanel;