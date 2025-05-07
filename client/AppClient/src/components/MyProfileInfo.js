import { UserInfo } from '../../User.js';
import { ProfileIcon } from './navbar.js';

export const MyInfo = () => {
  const container = document.createElement("div");
  container.className = "my-info-container";

  const infoSection = createInfoSection(UserInfo);
  const postsSection = createPostsSection(UserInfo);

  container.appendChild(infoSection);
  container.appendChild(postsSection);

  return container;
};

function createInfoSection(UserInfo) {
  const infoSection = document.createElement("div");
  infoSection.className = "my-info";

  const profile = ProfileIcon(UserInfo.UserName);
  const userName = document.createElement("p");
  userName.className = "user-name";
  userName.textContent = UserInfo.UserName;

  const stats = document.createElement("div");
  stats.className = "user-stats";

  const friends = document.createElement("div");
  friends.className = "stat-item";
  friends.textContent = `${UserInfo.Friends.length} Friends`;

  const posts = document.createElement("div");
  posts.className = "stat-item";
  posts.textContent = `${UserInfo.Posts.length} Posts`;

  const saved = document.createElement("div");
  saved.className = "stat-item";
  saved.textContent = `${UserInfo.Saved?.length || 0} Saved`;

  stats.append(friends, posts, saved);
  infoSection.append(profile, userName, stats);
  return infoSection;
}

export function createPostsSection(UsersBlogs) {
  const postsSection = document.createElement("div");
  postsSection.className = "posts-section";
  postsSection.id = "posts_section";

  const postList = document.createElement("ul");
  postList.className = "post-list";

  if (UsersBlogs.length === 0) {
    return "";
  }
  
  if (typeof UsersBlogs === "object" && !Array.isArray(UsersBlogs)) {
  UsersBlogs.Posts.forEach((post) => {
    const postElement = createPostElement({ UserName: UsersBlogs.UserName }, post);
    postList.appendChild(postElement);
  });

  postsSection.appendChild(postList);
  return postsSection;
}

  

  UsersBlogs.forEach((User) => {
    User.Posts.forEach((post) => {
      const postElement = createPostElement(User, post);
      postList.appendChild(postElement);
    });
  });

  postsSection.appendChild(postList);
  return postsSection;
}

function createPostElement(User, post) {
  const postcont = document.createElement("li");
  postcont.className = "post";

  const topSection = document.createElement("div");
  topSection.className = "top-section";

  const profileSection = document.createElement("div");
  profileSection.className = "profile-section";

  const username = document.createElement("span");
  username.className = "username";
  username.textContent = User.UserName;

  profileSection.appendChild(ProfileIcon(User.UserName));
  profileSection.appendChild(username);

  const date = document.createElement("span");
  date.className = "date";
  date.textContent = getRelativeTime(post.Date);

  topSection.append(profileSection, date);

  const content = document.createElement("div");
  content.className = "content";
  content.textContent = post.Content;

  const interactionSection = document.createElement("div");
  interactionSection.className = "interactions";

  const likeIcon = document.createElement("i");
  likeIcon.className = "fas fa-heart like-icon";

  const commentIcon = document.createElement("i");
  commentIcon.className = "fas fa-comment comment-icon";

  const shareIcon = document.createElement("i");
  shareIcon.className = "fas fa-share share-icon";

  interactionSection.append(likeIcon, commentIcon, shareIcon);

  const liveComment = document.createElement("div");
  liveComment.className = "liveComment";
  liveComment.style.width = "100%";
  liveComment.style.position = "relative";

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Live comments here...";
  textarea.className = "Live-Comments-Area";

  const sendbtn = document.createElement("i");
  sendbtn.className = "fas fa-paper-plane send-button";
  sendbtn.id = "send_button";
  sendbtn.addEventListener("click", async () => {
    if (textarea.value === "") {
      return;
    }
    const res = await PostBlog({ Content: textarea.value });
    location.reload();
  });

  liveComment.append(textarea, sendbtn);

  postcont.append(topSection, content, interactionSection, liveComment);
  return postcont;
};

function getRelativeTime(isoDateString) {
  const now = new Date();
  const past = new Date(isoDateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const seconds = diffInSeconds;
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const weeks = Math.floor(diffInSeconds / 604800);
  const months = Math.floor(diffInSeconds / 2592000); // ~30 days
  const years = Math.floor(diffInSeconds / 31536000); // 365 days

  if (years > 0) return `${years}y`;
  if (months > 0) return `${months}mo`;
  if (weeks > 0) return `${weeks}w`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}