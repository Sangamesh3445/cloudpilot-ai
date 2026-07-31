import api from "../api/axios";

export async function getTrips() {
    const response = await api.get("/trips/");
    return response.data;
}

export async function createTrip(tripData) {
    if (import.meta.env.DEV) {
        console.log("========== PAYLOAD ==========");
        console.log(JSON.stringify(tripData, null, 2));
    }

    try {
        const response = await api.post("/trips/", tripData);
        return response.data;
    } catch (error) {
        if (import.meta.env.DEV) {
            console.log("========== BACKEND RESPONSE ==========");
            console.log(error.response?.data);
        }

        throw error;
    }
}
export async function updateTrip(id, tripData) {
    const response = await api.put(`/trips/${id}/`, tripData);
    return response.data;
}

export async function deleteTrip(id) {
    const response = await api.delete(`/trips/${id}/`);
    return response.data;
}