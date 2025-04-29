import { GetFriendProfile } from "../../APIs/ApisServies";

export const MyFriendProfile = async ({ UserName }) => {
    const MyFriend = await GetFriendProfile({ UserName });
    return MyFriend;
};