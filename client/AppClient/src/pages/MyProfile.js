import { UserInfo } from '../../User.js';
import { navbar } from "../components/navbar.js";
import { sideList } from '../components/sidelist.js';
import { MyInfo } from "../components/MyProfileInfo.js";

export const MyProfile = () => {
  // Main container
  const page = document.createElement('div');
  page.className = 'my-profile-page';
  page.id = "my_profile_page";

  // Navbar at the top
  const nav = navbar();
  page.appendChild(nav);

  // Content layout container
  const layout = document.createElement('div');
  layout.className = 'profile-layout ';

  // Sidebar
  const sidebar = sideList();
  layout.appendChild(sidebar);

  // Main content area - MyInfo
  const content = document.createElement('div');
  content.className = 'profile-content';
  const myInfo = MyInfo();
  content.appendChild(myInfo);

  layout.appendChild(content);

  // Append layout to main page
  page.appendChild(layout);

  return page;
};
