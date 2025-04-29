import { NavigationBar, HomePage } from "./AppClient/src/Homepage.js";
import { RegisterSide } from "./AppClient/src/EnteringPage.js";
import { verifyUser } from "./AppClient/APIs/ApisServies.js";
import { setToken} from "./AppClient/APIs/BasedApis.js";

(async () => {
  const authHeader = localStorage.getItem('authorization');
  if (authHeader) {
      const user = await verifyUser({ token: authHeader });
      setToken(authHeader);
      console.log(user);
      document.body.prepend(HomePage(user));
  } else {
    document.body.prepend(RegisterSide());
  }
})();
