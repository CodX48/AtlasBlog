import express from 'express';
import ValidateJWT from "../MiddelWare/UserAuthMiddleWare.js";
import { Post, GetPosts, likeBlog, CommentBlog } from "../servies/PostServies.js";

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
        const Email = req.user.Email;
        console.log(Email);
        const respo = await GetPosts({ Email });
        res.status(respo.status).send(respo.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error while fetching posts" });
    }
});

router.post('/like', ValidateJWT ,async (req, res) => {
    try {
        const { blogId } = req.body;
        const Email = req.user.Email;
        const respo = await likeBlog({ blogId, Email });
    res.status(respo.status).send(respo.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error while fetching posts" });
    }
});
router.post("/comment",ValidateJWT ,async (req, res) => {
    try {
        const { blogId, comment } = req.body;
        const Email  = req.user.Email;
        console.log(Email)
        const respo = await CommentBlog({ blogId, Email, comment });
        res.status(respo.status).send(respo.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error while fetching posts" });
    
    }
})

export default router;
