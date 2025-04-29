import {UserInfo} from '../../User.js'

export const MyProfile = () => {
    const MyProfile = document.createElement('p');
    MyProfile.textContent = "profile page";
    return MyProfile;
    console.log(UserInfo);
};