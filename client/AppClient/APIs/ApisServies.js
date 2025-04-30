import { USERS_GET_ALL, token, USERS_REGISTER, VERIFY_USER, BLOGS_GET_FEED, USERS_GET_PROFILE, BLOGS_LIKE, USERS_LOGIN } from "./BasedApis.js";

export const GetAllUsers = async () => {
    try {
        const res = await fetch(USERS_GET_ALL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
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

export const login = async ({ Email, Password }) =>{
    try {
        const res = await fetch(USERS_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email,
                Password
            })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const verifyUser = async ({ token }) => {
    try {
        const res = await fetch(VERIFY_USER, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
            }
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};
export const GetBlogs = async ({ UserName }) => {
    try {
        const url = `${BLOGS_GET_FEED}?UserName=${encodeURIComponent(UserName)}`;
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
            }
        });
        const data = await res.json();
        console.log(data.FriendsPosts)
        return data.FriendsPosts;
    } catch (error) {
        console.error(error);
    }
};
export const GetFriendProfile = async ({ UserName }) => {
    try {
        const url = USERS_GET_PROFILE.replace(':username', UserName);
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const likeBlog = async ({ PostId }) =>{
    try {
        const res = await fetch(BLOGS_LIKE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
            },
            body: JSON.stringify({
                "blogId": `${PostId}`
            })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}

