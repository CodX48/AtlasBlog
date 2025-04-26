import { NavigationBar } from "./AppClient/src/Homepage.js";
const authHeader = localStorage.getItem('Authorization');

if (authHeader) {
document.body.prepend(NavigationBar());
}

