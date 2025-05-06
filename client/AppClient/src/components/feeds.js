import { UserInfo } from "../../User.js";
import { GetBlogs } from "../../APIs/ApisServies.js";
import { createPostsSection} from "./MyProfileInfo.js"
const user = UserInfo;


export const feeds_blogs = async ({ UserName }) => {
    const BlogsContainer = document.createElement('div');
    BlogsContainer.className = 'blogs-container';
    const blogs = await GetBlogs({ UserName });
    blogs.forEach(element => {
        BlogsContainer.append(createPostsSection(element));
    })
    return BlogsContainer;
};