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

const GetPosts = async ({PosterEmail}) => {
    const user = await User.findOne({ PosterEmail });
    console.log(user);
    return { data: { IserInfo: user }, status: 200 };
}
export { Post, GetPosts };