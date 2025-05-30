import { USERS_GET_ALL, token, USERS_REGISTER, VERIFY_USER, BLOGS_GET_FEED, USERS_GET_PROFILE, BLOGS_LIKE, USERS_LOGIN, USERS_ADD_FRIEND, BLOGS_POST } from "./BasedApis.js";

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
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const register = async ({ UserName, Email, Password }) => {
    try {
        const res = await fetch(USERS_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ UserName, Email, Password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.mess || 'Registration failed');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error during registration');
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

export const likeBlog = async ({ PostId }) => {
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
};
export const AddFriend = async ({ FriendUserName }) => {
    try {
        const res = await fetch(USERS_ADD_FRIEND, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
            },
            body: JSON.stringify({ "FriendUserName": FriendUserName })
        });

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        location.reload();
        return data;
    } catch (error) {
        console.error('AddFriend error:', error);
        throw error; // rethrow if you want the caller to handle it
    }
};

export const PostBlog =  async ({Content}) => {
    try {
        const res = await fetch(BLOGS_POST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
            },
            body: JSON.stringify({ "Content": Content })
        });

         if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
         }
        
        const data = await res.json();
        return data;

    } catch (error) {
        console.error('AddFriend error:', error);
        throw error; // rethrow if you want the caller to handle it
    }
}

