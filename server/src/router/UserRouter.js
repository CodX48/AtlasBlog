import express from 'express';
const router = express.Router();
import ValidateJWT from "../MiddelWare/UserAuthMiddleWare.js";
import { register, login, AddFriendRequist, GetUser, GetAllUsers } from '../servies/UserServies.js';

router.post('/register', async (req, res) => {
    const { UserName, Email, Password } = req.body;
    const respo = await register({ UserName , Email, Password });
    res.status(respo.status).send(respo.data);
});

router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    const respo = await login({ Email, Password });
    res.status(respo.status).send(respo.data);
});
//add friend
router.post('/addfriend', ValidateJWT, async (req, res) => {
    const { FriendUserName } = req.body;
    const MyUserName = req.user.UserName;
    const respo = await AddFriendRequist({ FriendUserName, MyUserName });
    res.status(respo.status).send(respo.data);
});
//get a user profile
router.get('/:username',ValidateJWT ,async (req, res) => {
    const username = req.params.username;
    const respo = await GetUser({ username });
    res.status(respo.status).send(respo.data);
});
//get all users
router.get('/', ValidateJWT, async (req, res) => {
    const respo = await GetAllUsers();
    res.status(respo.status).send(respo.data);
});
router.get('/ver', ValidateJWT, async (req, res) => {
    const username = req.user.UserName;
    //console.log(username)
    const respo = await GetUser({ username });
    res.status(respo.status).send(respo.data);
}); 

export default router;
