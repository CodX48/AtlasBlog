export let UserName; 

export const addtoken = (token) => {
  localStorage.setItem('authorization', `token ${token}`);
};

export const userinfo = ({username}) => {
  UserName = username;
}