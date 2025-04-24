import express from 'express';
const router = express.Router();
import ValidateJWT from "../MiddelWare/UserAuthMiddleWare.js";
import { register, login, AddFriendRequist } from '../servies/UserServies.js';

router.post('/register', async (req, res) => {
    const { FirstName, LastName, Email, Password } = req.body;
    const respo = await register({ FirstName, LastName, Email, Password });
    res.status(respo.status).send(respo.data);
});

router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    const respo = await login({ Email, Password });
    res.status(respo.status).send(respo.data);
});
router.post('/addfriend',ValidateJWT,async (req, res) => {
    const { FriendEmail } = req.body;
    const MyEmail = req.user.Email;
    const respo = await AddFriendRequist({FriendEmail, MyEmail });
    res.status(respo.status).send(respo.data);
})
export default router;
