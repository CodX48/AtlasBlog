import { GetAllUsers } from "../../APIs/ApisServies.js";
import { UserInfo } from '../../User.js'
import { MyProfile } from '../pages/MyProfile.js';
import { GetFriendProfile, AddFriend } from "../../APIs/ApisServies.js";
import { PostBtn } from "./PostBtn.js";
let Users; 

const logo = () => {
        const LogoElement = document.createElement("div");
        LogoElement.className = 'logo';
        LogoElement.textContent = "AtlasBlog";
        LogoElement.addEventListener('click', () => {
        location.reload()
    })
    return LogoElement;
};

const searchbar = () => {
        const SearchBar = document.createElement("input");
        SearchBar.className = 'search-bar';
        SearchBar.name = "SearchInput";
        SearchBar.placeholder = "Search";

    let Users = [];

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
            const existingList = document.getElementById('user_list');
        if (existingList) {
            existingList.remove();
        }

            const userList = document.createElement('ul');
            userList.className = "user-list";
            userList.id = "user_list";

        try {
            const filtered = Users.filter(user =>
            user.UserName.toLowerCase().includes(SearchBar.value.toLowerCase())
            );

            if (filtered.length === Users.length) return;

            filtered.forEach(u => {
            const li = document.createElement('li');

            const p = document.createElement('p');
            p.textContent = u.UserName;
            li.appendChild(p);

    if (!UserInfo.Friends.some(friend => friend.UserName === u.UserName)) {
        const addFriend = document.createElement('button');
        addFriend.textContent = "Add Friend";

        addFriend.addEventListener('click', async () => {
            const res = await AddFriend({ FriendUserName: u.UserName });
            location.reload();
            console.log(res);
        });

        li.appendChild(addFriend);
    }
    userList.appendChild(li);
});


        } catch (error) {
            console.error("Error:", error);
        }

        document.getElementById('SearchSection').appendChild(userList);
    });

    return SearchBar;
};


export const ProfileIcon = (UserName) => {
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
    console.log(UserName)
    userChar.textContent = UserName.split('')[0];
    Profile.append(userChar);
    return Profile;
};

export const navbar = () => {
  const nav = document.createElement("nav");
  nav.className = "navbar";

  const logoElement = logo();
  nav.appendChild(logoElement);

  const searchSection = document.createElement("div");
  searchSection.className = "search-section";
  searchSection.id = "SearchSection";

  const searchInput = searchbar();
  searchSection.appendChild(searchInput);
    nav.appendChild(searchSection);
    
    nav.appendChild(PostBtn());
    console.log(UserInfo)
  const profile = ProfileIcon(UserInfo.UserName);
  nav.appendChild(profile);

  return nav;
};
