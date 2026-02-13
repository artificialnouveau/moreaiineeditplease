/**
 * Firebase Configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (or use existing)
 * 3. Click "Add app" and choose Web (</>)
 * 4. Register your app
 * 5. Copy the firebaseConfig object
 * 6. Replace the config below with your values
 * 7. In Firebase console, go to "Realtime Database" and click "Create Database"
 * 8. Start in "test mode" for now (you can secure it later)
 */

// TODO: Replace with your Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let firebaseInitialized = false;
let database = null;

try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        firebaseInitialized = true;
        console.log('Firebase initialized successfully');
    } else {
        console.warn('Firebase not configured. Please update firebase-config.js with your Firebase credentials.');
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
}
