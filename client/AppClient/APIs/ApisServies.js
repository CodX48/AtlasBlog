import { USERS_GET_ALL, token } from "./BasedApis.js";

export const GetAllUsers = async () => {
    try {
        const res = await fetch(USERS_GET_ALL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await res.json();
        return data; // Return the data here
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
