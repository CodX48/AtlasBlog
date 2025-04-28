import { USERS_GET_ALL, token, USERS_REGISTER } from "./BasedApis.js";

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
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
export const register = async ({ UserName, Email, Password }) => {
    console.log({ UserName, Email, Password });
    try {
        const res = await fetch(USERS_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName,
                Email,
                Password
            })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
