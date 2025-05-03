import { UserInfo } from '../../User.js';
import { ProfileIcon } from './navbar.js';

export const MyInfo = () => {
  const container = document.createElement("div");
  container.className = "my-info-container";

  // --- Main Info Section ---
  const infoSection = document.createElement("div");
  infoSection.className = "my-info";

  // Profile Icon
  const profile = ProfileIcon(UserInfo.UserName);
  infoSection.appendChild(profile);

  // Username
  const userName = document.createElement("p");
  userName.className = "user-name";
  userName.textContent = UserInfo.UserName;
  infoSection.appendChild(userName);

  // Stats Section
  const stats = document.createElement("div");
  stats.className = "user-stats";

  const friends = document.createElement("div");
  friends.className = "stat-item";
  friends.textContent = `Friends: ${UserInfo.Friends.length}`;

  const posts = document.createElement("div");
  posts.className = "stat-item";
  posts.textContent = `Posts: ${UserInfo.Posts.length}`;

  const saved = document.createElement("div");
  saved.className = "stat-item";
  saved.textContent = `Saved: ${UserInfo.Saved?.length || 0}`;

  stats.appendChild(friends);
  stats.appendChild(posts);
  stats.appendChild(saved);
  infoSection.appendChild(stats);

  // --- Posts Section ---
  const postsSection = document.createElement("div");
  postsSection.className = "posts-section";

  const postsTitle = document.createElement("h3");
  postsTitle.textContent = "Your Posts:";
  postsSection.appendChild(postsTitle);

  const postList = document.createElement("ul");
  postList.className = "post-list";

  if (UserInfo.Posts.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "You don't have any posts yet.";
    postsSection.appendChild(emptyMsg);
  } else {
    UserInfo.Posts.forEach((post, index) => {
      const li = document.createElement("li");
      li.textContent = post.Content || `Post ${index + 1}`;
      postList.appendChild(li);
    });
    postsSection.appendChild(postList);
  }

  // Append both sections to main container
  container.appendChild(infoSection);
  container.appendChild(postsSection);

  return container;
};
