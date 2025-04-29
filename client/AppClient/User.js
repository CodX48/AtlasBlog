export let UserInfo; 

export const addtoken = (token) => {
  localStorage.setItem('authorization', `token ${token}`);
};

export const userinfo = (user) => {
  UserInfo = user;
}