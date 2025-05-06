import { UserInfo } from "../../User.js";
import { ProfileIcon } from "./navbar.js";
import { PostBlog } from "../../APIs/ApisServies.js";
const CreatePost = () => {
    const outer = document.createElement('div');
    outer.className = "outer-create-post-container";
    outer.id = "outer_create_post_container";
    const CreatePostCont = document.createElement('div');
    CreatePostCont.className = 'create-post-container';
    CreatePostCont.id = 'create_post_container';

    const top = document.createElement('div');
    top.className = 'create-post-top';
    top.id = 'create_post_top';
    const x = document.createElement('span');
    x.textContent = "X";
    x.addEventListener('click', () => {
        document.getElementById('outer_create_post_container').remove()
    })
    top.append(x);

    const btm = document.createElement('div');
    btm.className = 'create-post-bottom';
    btm.id = 'create_post_bottom';

    const profileIcon = ProfileIcon(UserInfo.UserName);
    profileIcon.classList.add('profile-icon');
    btm.append(profileIcon);

    const textareacont = document.createElement('div');
    textareacont.className = 'textarea-container';
    textareacont.id = 'textarea_container';

    const textarea = document.createElement('textarea');
    textarea.className = 'post-textarea';
    textarea.id = 'post_textarea';
    textarea.placeholder = "Blog it now";

    const sendbtn = document.createElement('i');
    sendbtn.className = 'fas fa-paper-plane send-button'; 
    sendbtn.id = 'send_button';
    sendbtn.addEventListener('click', async () => {
        if (textarea.value === '') {
            return
        }
        const res = await PostBlog({Content: textarea.value});
        console.log(res);
        location.reload();
    })
    textareacont.append(textarea, sendbtn);
    btm.append(textareacont);

    CreatePostCont.append(top, btm);
    outer.append(CreatePostCont);
    document.body.append(outer);
};


export const PostBtn = () => {
    const post_btn = document.createElement('button');
    post_btn.className = 'post-btn';
    post_btn.id = 'post_btn';
    post_btn.textContent = "Post";
    post_btn.addEventListener('click', () => {
        CreatePost();
    })
    return post_btn;
}