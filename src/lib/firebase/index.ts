// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrR52CelaVY2QyeJdfiEAP9C1oQq1l_A8',
  authDomain: 'hikage-works.firebaseapp.com',
  projectId: 'hikage-works',
  storageBucket: 'hikage-works.appspot.com',
  messagingSenderId: '141706354198',
  appId: '1:141706354198:web:6357f01a5ca9f2648e9f37',
  measurementId: 'G-8WHCZ8CYGS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const messaging = getMessaging(app);
      const token = await getToken(messaging, {
        vapidKey:
          'BF0Dk08j4tFT5AKrXLHkeKFqdP_2qQ3DyhlcvshzVV9Y9fTJ3i2YAMZGd-K9F-xpEG1a9WCg0UOJO76-tUNHYAY',
      });
      // submit token
      fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
    }
  } catch (error) {
    console.error(error);
  }
};
