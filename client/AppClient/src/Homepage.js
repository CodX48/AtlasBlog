import { GetAllUsers, GetBlogs } from "../APIs/ApisServies.js";
import { UserInfo } from '../User.js'
import { MyProfile } from './pages/MyProfile.js';
import { GetFriendProfile } from "../APIs/ApisServies.js";
import { likeBlog } from "../APIs/ApisServies.js";
import { navbar } from "./components/navbar.js";
import { feeds_blogs } from "./components/feeds.js";
import {LogOutBtn} from './components/logOutBtn.js'
let Users = [];


const logo = () => {
    const LogoElement = document.createElement("div");
    LogoElement.className = 'logo';
    LogoElement.textContent = "AtlasBlog";
    return LogoElement;
};

const searchbar = () => {
    const SearchBar = document.createElement("input");
    SearchBar.className = 'search-bar';
    SearchBar.name = "SearchInput";
    SearchBar.placeholder = "Search";
   
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
            const existingList = document.getElementById('user_list');
            if (existingList) {
                existingList.remove(); 
            }

            const userList = document.createElement('ul');
            userList.className = "user-list";
            userList.id = "user_list"; 

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

            document.getElementById('SearchSection').append(userList);
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
            document.getElementById('home_page').remove();
            document.body.prepend(MyProfile()); 
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
    console.log(blogs);
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

            postDiv.append(content,reacts);
            posts.append(postDiv);
            li.append(posts);
            ul.append(li);
        });
    });

    BlogsContainer.append(ul);
    return BlogsContainer;
};

export const FriendsList = () => {
    const UsersList = document.createElement('ul');
    UsersList.className = "Friends-List"
    const MyFriends = UserInfo.Friends;

    if (!MyFriends.length === 0) {
    MyFriends.forEach(friend => {
            const user = document.createElement('li');
            const p = document.createElement('p');
            p.textContent = friend.UserName;
            user.append(ProfileIcon(friend.UserName));
            user.append(p);
            user.setAttribute('Username', friend.UserName);
            UsersList.append(user);
        });
        return UsersList;
    }

    const NoFriendsMess = document.createElement('p');
    NoFriendsMess.textContent = "You should Add Friends";
    UsersList.append(NoFriendsMess)
    return UsersList;
};

const userhomeinfo = () => {
    const username = document.createElement('p');
    username.className = 'userhomeinfo-username';
    username.textContent = UserInfo.UserName;

    const moreinfo = document.createElement('div');
    moreinfo.className = 'userhomeinfo-moreinfo';

    const Fiendsnum = document.createElement('p');
    Fiendsnum.className = 'userhomeinfo-friends';
    Fiendsnum.textContent = `${UserInfo.Friends.length} Friends`;

    const Postsnum = document.createElement('p');
    Postsnum.className = 'userhomeinfo-posts';
    Postsnum.textContent = `${UserInfo.Posts.length} Posts`;

    const Saved = document.createElement('p');
    Saved.className = 'userhomeinfo-saved';
    Saved.textContent = `${UserInfo.Posts.length} Saved`;

    moreinfo.append(Fiendsnum, Postsnum, Saved);

    const UserHomeInfoCont = document.createElement('div');
    UserHomeInfoCont.className = 'userhomeinfo-container';
    UserHomeInfoCont.append(ProfileIcon(UserInfo.UserName), username, moreinfo);

    return UserHomeInfoCont;
}

export const HomePage = async () => {
    const home = document.createElement('div');
    home.className = "home-page";
    home.id = "home_page";
    home.append(navbar());
    const feedHomeCont = document.createElement('div');
    feedHomeCont.className = 'Feed-Home-Cont';
    feedHomeCont.id = 'Feed_Home_Cont';
    const leftSideHomePage = document.createElement('div');
    leftSideHomePage.style.display = "flex";
    leftSideHomePage.style.justifyContent = "center";
    leftSideHomePage.style.alignItems = "center";
    leftSideHomePage.style.flexDirection = "column";
    leftSideHomePage.style.width = "28%";
    leftSideHomePage.append(userhomeinfo(),LogOutBtn());
    feedHomeCont.append(leftSideHomePage,await feeds_blogs(UserInfo.UserName));
    
    home.append(feedHomeCont);
    return home;
};

