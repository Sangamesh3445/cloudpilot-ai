import api from "../api/axios";

export const getFleets = async () => {
    const response = await api.get("/fleets/");
    return response.data;
};

export const createFleet = async (fleetData) => {
    const response = await api.post("/fleets/", fleetData);
    return response.data;
};

export const updateFleet = async (id, fleetData) => {
    const response = await api.put(`/fleets/${id}/`, fleetData);
    return response.data;
};

export const deleteFleet = async (id) => {
    const response = await api.delete(`/fleets/${id}/`);
    return response.data;
};