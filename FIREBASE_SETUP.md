# Firebase Setup Instructions

This guide will help you set up Firebase to collect and store customer reviews.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** (or select an existing one)
3. Enter a project name (e.g., "moreaiineeditplease")
4. Click **Continue**
5. Disable Google Analytics (optional, not needed for this)
6. Click **Create project**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** `</>`
2. Enter an app nickname (e.g., "AI Services Review Site")
3. **Do NOT** check "Also set up Firebase Hosting"
4. Click **Register app**
5. **Copy the firebaseConfig object** - you'll need this!

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Set Up Realtime Database

1. In the Firebase Console, click **"Realtime Database"** in the left menu
2. Click **"Create Database"**
3. Select your database location (choose closest to your users)
4. Choose **"Start in test mode"** for now (we'll secure it later)
5. Click **Enable**

## Step 4: Update Your Code

1. Open `assets/js/firebase-config.js`
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Step 5: Deploy Your Site

Push your updated code and deploy to your hosting platform (GitHub Pages, Netlify, Vercel, etc.)

## Step 6: Test It!

1. Visit your website
2. Go to the **Reviews** tab
3. Select a service and submit a review
4. Check the Firebase Console → Realtime Database to see your data!

## Viewing Your Data in Firebase

### Real-time Database Structure:
```
moreaiineeditplease/
├── ratings/
│   ├── AI Actress/
│   │   ├── useful: 15
│   │   ├── not-useful: 3
│   │   └── banned: 1
│   └── Auto-Sorry Bot/
│       ├── useful: 23
│       └── not-useful: 2
└── reviews/
    ├── AI Actress/
    │   ├── -NaBC123/
    │   │   ├── rating: "useful"
    │   │   ├── comment: "Love it!"
    │   │   └── timestamp: 1234567890
    │   └── -NaBC456/
    │       └── ...
    └── ...
```

## Security Rules (Optional but Recommended)

After testing, secure your database:

1. Go to **Realtime Database → Rules**
2. Update rules to allow reads but require validation for writes:

```json
{
  "rules": {
    ".read": true,
    "ratings": {
      "$service": {
        ".write": true,
        ".validate": "newData.hasChildren(['useful', 'not-useful', 'banned'])"
      }
    },
    "reviews": {
      "$service": {
        ".write": true,
        "$review": {
          ".validate": "newData.hasChildren(['rating', 'timestamp']) && newData.child('rating').val().matches(/^(useful|not-useful|banned)$/)"
        }
      }
    }
  }
}
```

## Fallback Mode

If you don't set up Firebase, the site will automatically use **localStorage** as a fallback. Reviews will be stored locally in each user's browser (not shared across users).

## Free Tier Limits

Firebase's free "Spark" plan includes:
- **Realtime Database:** 1GB storage, 10GB/month downloads
- **100 simultaneous connections**
- More than enough for your review system!

## Troubleshooting

### "Firebase not configured" warning
- Make sure you've replaced the placeholder values in `firebase-config.js`
- Check browser console for errors

### Data not saving
- Check Firebase Console → Realtime Database → Rules (should be in test mode initially)
- Check browser console for permission errors

### Data not loading
- Verify your `databaseURL` is correct
- Make sure Realtime Database is enabled in Firebase Console

## Need Help?

Check the [Firebase Documentation](https://firebase.google.com/docs/database/web/start) for more details!
