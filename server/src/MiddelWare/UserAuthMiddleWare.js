import jwt from 'jsonwebtoken';
import { User } from '../Model/UserModel.js';

const JWT_SECRET = "3,2wUCn(bV>KOpmqG7>v|7fGBNam_|=T"; 

const ValidateJWT = async (req, res, next) => {
    try {
        const AuthHeader = req.get('authorization');
        if (!AuthHeader) {
            res.status(401).json({ error: "Authorization header missing" });
            return;
        }

        const Token = AuthHeader.split(" ")[1];
        if (!Token) {
            res.status(401).json({ error: "Token not found" });
            return;
        }

        const payload = jwt.verify(Token, JWT_SECRET);
       // console.log(payload)
        if (!payload.Email) {
            res.status(401).json({ error: "Invalid token payload" });
            return;
        }

        const user = await User.findOne({ "UserName": payload.UserName });
        console.log(user);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
                
        req.user = {
            UserName: user.UserName,
            Email: user.Email
        };

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.status(401).json({ error: "Token expired" });
        } else if (err.name === "JsonWebTokenError") {
            res.status(401).json({ error: "Invalid token" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export default ValidateJWT;
