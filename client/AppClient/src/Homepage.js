import { GetAllUsers, GetBlogs } from "../APIs/ApisServies.js";
import { UserInfo } from '../User.js'
import { MyProfile } from './pages/MyProfile.js';
import { GetFriendProfile } from "../APIs/ApisServies.js";
let Users = [];
let Filterd_Users;

const logo = () => {
    const LogoElement = document.createElement("div");
    LogoElement.textContent = "AtlasBlog";
    LogoElement.style.fontWeight = "bold";
    LogoElement.style.fontSize = "24px";
    return LogoElement;
};

const searchbar = () => {
    const SearchBar = document.createElement("input");
    SearchBar.name = "SearchInput";
    SearchBar.placeholder = "Search";
    SearchBar.style.padding = "8px";
    SearchBar.style.borderRadius = "5px";
    SearchBar.style.border = "1px solid #ccc";

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
    Profile.textContent = UserName.split('')[0]; 
    Profile.style.width = "40px";
    Profile.style.height = "40px";
    Profile.style.borderRadius = "50%";
    Profile.style.backgroundColor = "#ccc";
    Profile.style.display = "flex";
    Profile.style.alignItems = "center";
    Profile.style.justifyContent = "center";
    Profile.style.fontWeight = "bold";
    return Profile;
};

export const NavigationBar = (UserName) => {
    const nav = document.createElement("nav");
    nav.style.display = "flex";
    nav.style.justifyContent = "space-between";
    nav.style.alignItems = "center";
    nav.style.padding = "10px 20px";
    nav.style.backgroundColor = "#f5f5f5";
    nav.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.1)";

    const leftSection = document.createElement("div");
    leftSection.style.display = "flex";
    leftSection.style.alignItems = "center";
    leftSection.appendChild(logo());

    const centerSection = document.createElement("div");
    centerSection.id = "SearchSection";
    centerSection.appendChild(searchbar());

    const rightSection = document.createElement("div");
    rightSection.appendChild(ProfileIcon(UserName));

    nav.appendChild(leftSection);
    nav.appendChild(centerSection);
    nav.appendChild(rightSection);

    return nav;
};

export const blogs = async ({ UserName }) => {
    const BlogsContainer = document.createElement('div');
    const blogs = await GetBlogs({ UserName });
   
    const ul = document.createElement('ul');

    blogs.forEach(ele => {
        
        ele.Posts.forEach(post => {

        const li = document.createElement('li');
        const UserBlogInfo = document.createElement('div');
        const username = document.createElement('p');
        username.textContent = UserName;

        UserBlogInfo.append(ProfileIcon(ele.FriendName));
        UserBlogInfo.append(ele.FriendName);
        li.append(UserBlogInfo);

        const posts = document.createElement('div');
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            const content = document.createElement('p');
            content.textContent = post.Content;

            // Optional: Add likes, comments, etc.
            const likes = document.createElement('p');
            likes.textContent = `Likes: ${post.Likes.length}`;

            const comments = document.createElement('p');
            comments.textContent = `Comments: ${post.Comments.length}`;

            postDiv.append(content, likes, comments);
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
    home.append(NavigationBar(user.UserName));
    
    const blogsDOM = await blogs({ UserName: user.UserName });
    home.append(blogsDOM);
    
    return home;
};

