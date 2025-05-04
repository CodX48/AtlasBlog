import { HomePage } from "./AppClient/src/Homepage.js";
import { RegisterSide } from "./AppClient/src/EnteringPage.js";
import { verifyUser } from "./AppClient/APIs/ApisServies.js";
import { setToken} from "./AppClient/APIs/BasedApis.js";
import { userinfo } from "./AppClient/User.js";
import {MyProfile}from "./AppClient/src/pages/MyProfile.js"

 const authHeader = localStorage.getItem('authorization');
if (authHeader) {
  const user = await verifyUser({ token: authHeader });
  
  if (user.error === 'Token expired' || user.error === 'Invalid token' || user.error === 'User not found') {
    document.body.prepend(RegisterSide()); 
  };
    setToken(authHeader);
    userinfo(user);
  document.body.prepend(MyProfile());
  } else {
    document.body.prepend(RegisterSide()); 
};
