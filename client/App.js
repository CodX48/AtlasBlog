import { HomePage } from "./AppClient/src/Homepage.js";
import { RegisterSide } from "./AppClient/src/EnteringPage.js";
import { verifyUser } from "./AppClient/APIs/ApisServies.js";
import { setToken} from "./AppClient/APIs/BasedApis.js";
import { userinfo } from "./AppClient/User.js";

 const authHeader = localStorage.getItem('authorization');
  if (authHeader) {
    const user = await verifyUser({ token: authHeader });
    setToken(authHeader);
    //console.log(authHeader);x
    userinfo(user);
    //console.log(user);
    document.body.prepend(await HomePage(user));
  } else {
    document.body.prepend(RegisterSide()); 
};
