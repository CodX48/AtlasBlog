import { Blogs } from "../Model/PostsModel.js";
import { User } from "../Model/UserModel.js";

const Post = async ({ PosterEmail, Content }) => {
    const user = await User.findOne({ "Email": PosterEmail });
    if (!user) {
        return { data: "User does not exist", status: 400 };
    }

    const blog = new Blogs({
            Poster:user,
            Content
        });
    
    await blog.save();
    user.Posts.push(blog);
    await user.save();

    const posts = await Blogs.find({ Poster: user._id }).populate('Poster', 'FirstName LastName Email');
    return { data: { Posts: posts }, status: 200 };
};

const GetPosts = async ({ Email }) => {
    const user = await User.findOne({ Email });
    console.log(user);
    return { data: { IserInfo: user }, status: 200 };
};

const likeBlog = async ({ blogId, Email }) => {
    const blog = await Blogs.findById(blogId);
    const user = await User.findOne({ Email }); 

    if (!blog || !user) {
        return { data: "bad", status: 400 };
    }

    const userIdStr = user._id.toString();
    const index = blog.Likes.findIndex(id => id.toString() === userIdStr);

    if (index !== -1) {
        // User already liked — remove like
        blog.Likes.splice(index, 1);
    } else {
        // User hasn't liked — add like
        blog.Likes.push(user._id);
    }

    await blog.save();
    return { data: "ok", status: 200 };
};


const CommentBlog = async ({ blogId, Email, comment }) => {
    const blog = await Blogs.findById(blogId);
    const user = await User.findOne({ Email });

    if (!user || !blog) {
        return { data: "Bad", status: 400 };
    };

    blog.Comments.push({
        User: user.UserName,
        Conmment: comment
    });
    await blog.save();
    return { data: "comment is been added", status: 200 };
};
export { Post, GetPosts, likeBlog, CommentBlog };