import { GetAllUsers } from "../APIs/ApisServies.js";
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

    // لما تكتب حاجة جديدة، تبدأ الفلترة
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

const ProfileIcon = () => {
    const Profile = document.createElement("div");
    Profile.textContent = "P"; // مبدئيًا أول حرف
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

export const NavigationBar = () => {
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
    rightSection.appendChild(ProfileIcon());

    nav.appendChild(leftSection);
    nav.appendChild(centerSection);
    nav.appendChild(rightSection);

    return nav;
};
