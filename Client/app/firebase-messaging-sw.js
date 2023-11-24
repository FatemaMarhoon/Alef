import { FirebaseSetup } from "../services/authService";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const app = FirebaseSetup();
const messaging = getMessaging(app);

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
     
      getToken(messaging, {
        vapidKey:
          "BOG9J-kXKbi1tyNp-qYrfZB-iKSvRITw__9dLk-A2iS-W_dv2bjbTNp8FGv6KkAmX0aGBU3CKnY0R2SRmJwNDCQ"
      }).then((currentToken) => {
        if (currentToken) {
          
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
        onMessage(messaging, (payload) => {
          console.log('Message received. ', payload);
          // ...
        });
      });

    } else {
      console.log("Do not have permission!");
    }
  });
}

//load messages recived while on foreground



requestPermission();


