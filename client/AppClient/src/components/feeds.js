import { UserInfo } from "../../User.js";
import { likeBlog,GetBlogs } from "../../APIs/ApisServies.js";
import { ProfileIcon } from "./navbar.js";
const user = UserInfo;


export const feeds_blogs = async ({ UserName }) => {
    const BlogsContainer = document.createElement('div');
    BlogsContainer.className = 'blogs-container';
    const blogs = await GetBlogs({ UserName });
    const ul = document.createElement('ul');

    blogs.forEach(ele => {
        
        ele.Posts.forEach(post => {

            const li = document.createElement('li');
            li.setAttribute('id', post._id);
        const UserBlogInfo = document.createElement('div');
        UserBlogInfo.className = 'user-blog-info'
        const username = document.createElement('p');
        username.textContent = ele.FriendName;

        UserBlogInfo.append(ProfileIcon(ele.FriendName));
        UserBlogInfo.append(username);
        li.append(UserBlogInfo);

            const posts = document.createElement('div');
            posts.className = 'btm-bost-cont'
            const postDiv = document.createElement('div');
            postDiv.className = 'post'

            const content = document.createElement('p');
            content.className = "post-content"
            content.textContent = post.Content;

            // Optional: Add likes, comments, etc.
            const likes = document.createElement('p');
            likes.textContent = `${post.Likes.length} Likes`;

            likes.addEventListener('click', async () => {
                const PostId = li.getAttribute('id');
                const likesnum = Number(likes.textContent.split(' ')[0]);
                const data = await likeBlog({ PostId });
                likes.textContent = `${likesnum + data.res} Likes`;
            })

            const comments = document.createElement('p');
            comments.textContent = `${post.Comments.length} Comments`;
            const reacts = document.createElement('div');

            const save = document.createElement('p');
            save.textContent = `${post.Comments.length} save`;
            
            reacts.className = 'reacts';
            reacts.append(likes, comments, save);
            const addComment = document.createElement('div');
            addComment.className = 'Add-Comment-Feed';
            const textCont = document.createElement('div');
            textCont.className = "textCont"
            
            const textarea = document.createElement('textarea');
            textarea.className = 'comment-feed-textarea';
            textarea.id = 'comment-feed-textarea';
            textarea.placeholder = "Write Your Comment...";
            const i = document.createElement('i');
            i.className = "fas fa-paper-plane send-button";
            i.id = 'send_Comment_button';
            textCont.append(textarea, i);
            addComment.append(textCont)
            postDiv.append(content,reacts);
            posts.append(postDiv,addComment);
            li.append(posts);
            ul.append(li);
        });
    });

    BlogsContainer.append(ul);
    return BlogsContainer;
};