import { User } from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const generateJWT = (data) => {
    return jwt.sign(data, '3,2wUCn(bV>KOpmqG7>v|7fGBNam_|=T', { expiresIn: "24h" });
}

export const register = async ({ UserName, Email, Password }) => {

    const findUser = await User.findOne({ Email });
    if (findUser) {
        return { data: {mess: "User is already exist"}, status: 400 };
    }
    const hashedpass = await bcrypt.hash(Password, 10);
    const user = new User({
        UserName,
        Email,
        Password: hashedpass,
    });
    await user.save();

    return { data: {tokin: generateJWT({ UserName , Email }), UserName: UserName}, status: 200 };
};

export const login = async ({ Email, Password }) => {
    
    const findUser = await User.findOne({ Email });
    if (!findUser) {
        return { data: "Incorrect Email or password", status: 400 };
    };

    const hashedpass = await bcrypt.compare(Password, findUser.Password);
    if (hashedpass && findUser !== null) {
        return { data: {tokin:  generateJWT({Email,UserName: findUser.UserName}) , UserName:findUser.UserName}, status: 200 };
    };

    return { data: { res: "Incorrect Email or password" }, status: 400 };
};

//the add fiend btn will search on the db and push to the user friend requist list my id then if he want he can add me which will take it from the this list and push it to my 
export const AddFriendRequist = async ({ FriendUserName, MyUserName }) => {
    if (FriendUserName === MyUserName) {
        return { data: { res: "You can not add yourself" }, status: 400 };
    }

    const FrinedAcc = await User.findOne({ UserName: FriendUserName });
    const MyAcc = await User.findOne({ UserName: MyUserName });
    console.log(FrinedAcc);

    if (!FrinedAcc || !MyAcc) {
        return { data: { res: "Something is wrong" }, status: 400 };
    };

    MyAcc.Friends.push(FrinedAcc);
    await MyAcc.save();

    return { data: { res: "Friend request sent" }, status: 200 };
};

export const GetUser = async ({ username }) => {
    try {
        const user = await User.findOne({ UserName: username })
            .select('-Password -_id')
            .populate({
                path: "Posts",
                model: "Blogs",
                select: '-_id -Poster'
            })
            .populate({
                path: "Friends", 
                model: "Users",
                select: 'UserName -_id'
            });

        if (!user) {
            return { data: "User does not exist", status: 400 };
        }

        return { data: user, status: 200 };
    } catch (error) {
        console.error("Error in GetUser:", error);
        return { data: "Something went wrong", status: 500 };
    }
};
export const GetAllUsers = async() => {
    const users = await User.find();

    const UserNames = users.map(user => ({
        id:user._id,
        UserName: user.UserName
    }));

    return { data: UserNames, status: 200 };
}