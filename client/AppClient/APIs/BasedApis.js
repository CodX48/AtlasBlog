// routes.js:
export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImNpZHgyMDdAZ21haWwuY29tIiwiVXNlck5hbWUiOiJNb3N0YWZhMTIzIyIsImlhdCI6MTc0NTY3MTIyMywiZXhwIjoxNzQ1NzU3NjIzfQ.4NOvlcDsDlwRu_xic-tJ1vKMMLxpXcFbMg_2ur80GII"

const BASE_URL = 'http://localhost:3000';

export const USERS_BASE = `${BASE_URL}/users`;

export const USERS_REGISTER = `${USERS_BASE}/register`;         // POST - Register a new user
export const USERS_LOGIN = `${USERS_BASE}/login`;               // POST - Login user
export const USERS_ADD_FRIEND = `${USERS_BASE}/addfriend`;      // POST - Send friend request
export const USERS_GET_PROFILE = `${USERS_BASE}/:username`;     // GET  - Get a user's profile
export const USERS_GET_ALL = `${USERS_BASE}`;                   // GET  - Get all users

export const BLOGS_BASE = `${BASE_URL}/blogs`;

export const BLOGS_POST = `${BLOGS_BASE}/post`;                 // POST - Create a new blog post
export const BLOGS_GET_FEED = `${BLOGS_BASE}`;                  // GET  - Get feed (home page posts)
export const BLOGS_LIKE = `${BLOGS_BASE}/like`;                 // POST - Like a blog
export const BLOGS_COMMENT = `${BLOGS_BASE}/comment`;           // POST - Comment on a blog
