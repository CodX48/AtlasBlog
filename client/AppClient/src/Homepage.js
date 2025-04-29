import { GetAllUsers, GetBlogs } from "../APIs/ApisServies.js";
import { UserInfo } from '../User.js'
import { MyProfile } from './pages/MyProfile.js';
import { GetFriendProfile } from "../APIs/ApisServies.js";
let Users = [];
let Filterd_Users;

const logo = () => {
    const LogoElement = document.createElement("div");
    LogoElement.className = 'logo';
    LogoElement.textContent = "AtlasBlog";
    // LogoElement.style.fontWeight = "bold";
    // LogoElement.style.fontSize = "24px";
     return LogoElement;
};

const searchbar = () => {
    const SearchBar = document.createElement("input");
    SearchBar.className = 'search-bar';
    SearchBar.name = "SearchInput";
    SearchBar.placeholder = "Search";
    // SearchBar.style.padding = "8px";
    // SearchBar.style.borderRadius = "5px";
    // SearchBar.style.border = "1px solid #ccc";

    SearchBar.addEventListener("click", () => {
        async function fetchUsers() {
            try {
                const users = await GetAllUsers();
                Users = users;
                console.log("All Users:", Users);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchUsers();
    });

    
    SearchBar.addEventListener("input", () => {
        function FilterdUsers() {
            const existingList = document.getElementById('user-list');
            if (existingList) {
                existingList.remove(); 
            }

            const userList = document.createElement('ul');
            userList.id = "user-list"; 

            try {
                const filtered = Users.filter((user) => {
                    
                    return user.UserName.toLowerCase().includes(SearchBar.value.toLowerCase());
                });
                if (filtered.length === Users.length) {
                    return;
                }
                filtered.forEach(u => {
                    let li = document.createElement('li');
                    li.textContent = u.UserName;
                    userList.appendChild(li);
                });
            } catch (error) {
                console.error("Error: ", error);
            }

            document.getElementById('SearchSection').after(userList);
        }
        FilterdUsers();
    });

    return SearchBar;
};

const ProfileIcon = (UserName) => {
    const Profile = document.createElement("div");
    Profile.className = "profile-icon";
    Profile.setAttribute('username', UserName);
    Profile.addEventListener('click', async () => {
        if (Profile.getAttribute('username') === UserInfo.UserName) {
            //return a page with my profile
            MyProfile()
        } else {
            console.log("friend profile")
            const FriendPage = await GetFriendProfile({ UserName: Profile.getAttribute('username') });
            console.log(FriendPage);
        }
    });
   const userChar = document.createElement('p');
    userChar.textContent = UserName.split('')[0];
    Profile.append(userChar);
    return Profile;
};

export const NavigationBar = (UserName) => {
    const nav = document.createElement("nav");
    nav.className = 'nav-bar';

    const centerSection = document.createElement("div");
    centerSection.id = "SearchSection";
    centerSection.appendChild(searchbar());

    nav.appendChild(logo());
    nav.appendChild(centerSection);
    nav.appendChild(ProfileIcon(UserName));

    return nav;
};

export const blogs = async ({ UserName }) => {
    const BlogsContainer = document.createElement('div');
    BlogsContainer.className = 'blogs-container';
    const blogs = await GetBlogs({ UserName });
   
    const ul = document.createElement('ul');

    blogs.forEach(ele => {
        
        ele.Posts.forEach(post => {

        const li = document.createElement('li');
        const UserBlogInfo = document.createElement('div');
        UserBlogInfo.className = 'user-blog-info'
        const username = document.createElement('p');
        username.textContent = ele.FriendName;

        UserBlogInfo.append(ProfileIcon(ele.FriendName));
        UserBlogInfo.append(username);
        li.append(UserBlogInfo);

        const posts = document.createElement('div');
            const postDiv = document.createElement('div');
            postDiv.className = 'post'

            const content = document.createElement('p');
            content.className = "post-content"
            content.textContent = post.Content;

            // Optional: Add likes, comments, etc.
            const likes = document.createElement('p');
            likes.textContent = `${post.Likes.length} Likes`;

            const comments = document.createElement('p');
            comments.textContent = `${post.Comments.length} Comments`;
            const reacts = document.createElement('div');
            reacts.className = 'reacts';
            reacts.append(likes, comments);

            postDiv.append(content,reacts);
            posts.append(postDiv);
            li.append(posts);
            ul.append(li);
        });
    });

    BlogsContainer.append(ul);
    return BlogsContainer;
};
export const HomePage = async (user) => {
    const home = document.createElement('div');
    home.className = "home-page";
    home.append(NavigationBar(user.UserName));
    
    const blogsDOM = await blogs({ UserName: user.UserName });
    home.append(blogsDOM);
    return home;
};

