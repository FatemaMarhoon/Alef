import { FirebaseSetup } from "../services/authService";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = FirebaseSetup();

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
        "BIdL7dmKEnK1yWWl-W6SEhGV-TLkH49Ul0t9ONePlmx1KrrZLdPFg5pYB7aLmSN7itpu1Mwzwk0wY7XQmDfOeDU"
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
