import { User } from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const generateJWT = (data) => {
    return jwt.sign(data, '3,2wUCn(bV>KOpmqG7>v|7fGBNam_|=T', { expiresIn: "24h" });
}

export const register = async ({ FirstName, LastName, Email, Password }) => {

    const findUser = await User.findOne({ Email });
    if (findUser) {
        return { data: "User is already exist", status: 400 };
    }
    const hashedpass = await bcrypt.hash(Password, 10);
    const user = new User({
        FirstName,
        LastName,
        Email,
        Password: hashedpass,
    });

    await user.save();

    return { data: {tokin: generateJWT({ FirstName, LastName, Email })}, status: 200 };
};

export const login = async ({ Email, Password }) => {
    
    const findUser = await User.findOne({ Email });
    if (!findUser) {
        return { data: "Incorrect Email or password", status: 400 };
    };

    const hashedpass = await bcrypt.compare(Password, findUser.Password);
    if (hashedpass && findUser !== null) {
        return { data: {tokin:  generateJWT({Email,FirstName: findUser.FirstName,LastName: findUser.LastName}) }, status: 200 };
    };

    return { data: "Incorrect Email or password", status: 400 };
};
//the add fiend btn will search on the db and push to the user friend requist list my id then if he want he can add me which will take it from the this list and push it to my 
export const AddFriendRequist = async ({ FriendEmail, MyEmail }) => {
    if (FriendEmail === MyEmail) {
        return { data: "You can not add yourself", status: 400 };
    };

    const FrinedAcc = await User.findOne({ "Email": FriendEmail });
    const MyAcc = await User.findOne({ "Email": MyEmail });
    
    if (!FrinedAcc || !MyAcc) {
        return { data: "Something is wrong", status: 400 };
    }
    FrinedAcc.Friends.push(MyAcc);
    MyAcc.Friends.push(FrinedAcc);
    await FrinedAcc.save();
    await MyAcc.save();

    return { data: "Friend has been added", status: 200 };

}