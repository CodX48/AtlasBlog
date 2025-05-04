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
  friends.textContent = `${UserInfo.Friends.length} Friends`;

  const posts = document.createElement("div");
  posts.className = "stat-item";
  posts.textContent = `${UserInfo.Posts.length} Posts`;

  const saved = document.createElement("div");
  saved.className = "stat-item";
  saved.textContent = `${UserInfo.Saved?.length || 0} Saved`;

  stats.appendChild(friends);
  stats.appendChild(posts);
  stats.appendChild(saved);
  infoSection.appendChild(stats);

  // --- Posts Section ---
  const postsSection = document.createElement("div");
  postsSection.className = "posts-section";

  const postList = document.createElement("ul");
  postList.className = "post-list";

  if (UserInfo.Posts.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "You don't have any posts yet.";
    postsSection.appendChild(emptyMsg);
  }

  else {
    UserInfo.Posts.forEach((post, index) => {
const postcont = document.createElement('li');
postcont.className = 'post';

// Top section (profile + date)
const topSection = document.createElement('div');
topSection.className = 'top-section';

// Profile section
const profileSection = document.createElement('div');
profileSection.className = 'profile-section';

const username = document.createElement('span');
username.className = 'username';
username.textContent = UserInfo.UserName;

profileSection.appendChild(ProfileIcon(UserInfo.UserName));
profileSection.appendChild(username);

// Date element
const date = document.createElement('span');
date.className = 'date';
date.textContent = getRelativeTime(post.Date); // Placeholder

// Append profileSection and date to topSection
topSection.appendChild(profileSection);
topSection.appendChild(date);

// Content section
const content = document.createElement('div');
content.className = 'content';
content.textContent = post.Content;
      
// Interaction section
const interactionSection = document.createElement('div');
interactionSection.className = 'interactions';

// Like icon (heart)
const likeIcon = document.createElement('i');
likeIcon.className = 'fas fa-heart like-icon'; // Font Awesome class

// Comment icon (speech bubble)
const commentIcon = document.createElement('i');
commentIcon.className = 'fas fa-comment comment-icon';

// Share icon (arrow)
const shareIcon = document.createElement('i');
shareIcon.className = 'fas fa-share share-icon';

interactionSection.appendChild(likeIcon);
interactionSection.appendChild(commentIcon);
interactionSection.appendChild(shareIcon);

// Live comment section
const liveComment = document.createElement('div');
liveComment.className = 'live-comment';
liveComment.textContent = 'Live comments here...';

// Assemble post
postcont.appendChild(topSection);
postcont.appendChild(content);
postcont.appendChild(interactionSection);
postcont.appendChild(liveComment);

      postList.appendChild(postcont);
    });
    postsSection.appendChild(postList);
  }

  // Append both sections to main container
  container.appendChild(infoSection);
  container.appendChild(postsSection);

  return container;
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


