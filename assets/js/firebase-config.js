/**
 * Firebase Configuration - Firestore Edition
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Select your project
 * 3. Click the gear icon → Project settings
 * 4. Scroll down to "Your apps" and copy the firebaseConfig
 * 5. Replace the config below with your values
 * 6. In Firebase console, go to "Firestore Database"
 * 7. Set up security rules (see FIREBASE_SETUP.md)
 */

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let firebaseInitialized = false;
let db = null;

try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        firebaseInitialized = true;
        console.log('Firebase (Firestore) initialized successfully');
    } else {
        console.warn('Firebase not configured. Please update firebase-config.js with your Firebase credentials.');
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
}
