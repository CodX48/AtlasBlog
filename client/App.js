import { NavigationBar } from "./AppClient/src/Homepage.js";
import { RegisterSide } from "./AppClient/src/EnteringPage.js";
const authHeader = localStorage.getItem('Authorization');

if (authHeader) {
    } else {
        document.body.prepend(RegisterSide()); 
    };
   
loadmainpage();

function loadmainpage() { 

    document.body.prepend(NavigationBar());
}