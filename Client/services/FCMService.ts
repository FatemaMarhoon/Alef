import { getMessaging } from "firebase/messaging/sw";
import { initializeApp } from 'firebase/app';
import {FirebaseSetup} from './authService'
import { getToken } from "firebase/messaging";

export function messagingSetup() {
    const messaging = getMessaging(FirebaseSetup());
    // Add the public key generated from the console here.
    getToken(messaging, {vapidKey: "BIdL7dmKEnK1yWWl-W6SEhGV-TLkH49Ul0t9ONePlmx1KrrZLdPFg5pYB7aLmSN7itpu1Mwzwk0wY7XQmDfOeDU"});    
}

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
}