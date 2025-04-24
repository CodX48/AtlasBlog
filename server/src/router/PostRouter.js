import express from 'express';
import ValidateJWT from "../MiddelWare/UserAuthMiddleWare.js";
import { Post, GetPosts } from "../servies/PostServies.js";

const router = express.Router();

// Create a new post
router.post('/post', ValidateJWT, async (req, res) => {
    try {
        const { Content } = req.body;
        const PosterEmail = req.user.Email;
        const respo = await Post({ PosterEmail, Content });
        res.status(respo.status).send(respo.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error while posting" });
    }
});

// Get posts for a user
router.get('/', ValidateJWT, async (req, res) => {
    try {
        const UserEmail = req.user.Email;
        const respo = await GetPosts({ UserEmail });
        res.status(respo.status).send(respo.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error while fetching posts" });
    }
});

export default router;
