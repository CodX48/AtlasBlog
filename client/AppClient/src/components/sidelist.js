import { UserInfo } from '../../User.js';
import {HomePage} from '../Homepage.js'

export const sideList = () => {
  const ul = document.createElement("ul");
  ul.className = "sidebar-list";

  const items = ["Home", "Friends", "Saved"];

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "sidebar-item p-5";
    
    if (item === 'Post') {
      li.id = 'postbtn';
    }

    const p = document.createElement("p");
    p.textContent = item;
    if (item === "Home") {
      li.addEventListener('click', async () => {
        document.getElementById('my_profile_page').remove();
        document.body.prepend(await HomePage(UserInfo));
      });
    };

    li.appendChild(p);
    ul.appendChild(li);
  });

  return ul;
};
