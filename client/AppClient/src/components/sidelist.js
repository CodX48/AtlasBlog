export const sideList = () => {
  const ul = document.createElement("ul");
  ul.className = "sidebar-list";

  const items = ["Home", "Friends", "Saved", "Post"];

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "sidebar-item p-5";

    const p = document.createElement("p");
      p.textContent = item;

    li.appendChild(p);
    ul.appendChild(li);
  });

  return ul;
};
