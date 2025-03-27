# Project Setup 

## 🚀 Getting Started
Follow these steps to set up and run the project on your local machine.

---

## 📌 Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

Install Expo CLI globally (if not installed):
```sh
npm install -g expo-cli
```

---

## 👥 Clone the Repository

```sh
git clone <your-repository-url>
cd <project-folder>
```

---

## 🔑 Firebase Configuration

### 1️⃣ Create a `.env` file in the root directory and add your Firebase credentials:
```sh
API_KEY=your-api-key
AUTH_DOMAIN=your-auth-domain
PROJECT_ID=your-project-id
STORAGE_BUCKET=your-storage-bucket
MESSAGING_SENDER_ID=your-messaging-sender-id
APP_ID=your-app-id
MEASUREMENT_ID=your-measurement-id
```

### 2️⃣ Update the `firebase.js` file to use environment variables:
```javascript
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export { firebase, db };
```

### 3️⃣ Firestore Security Rules (Public Access)
Go to **Firestore Database > Rules** in [Firebase Console](https://console.firebase.google.com/) and set:
```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```
Click **Publish** to save.

---

## 📦 Install Dependencies
```sh
npm install
```

---

## ▶️ Run the Project
Start the development server:
```sh
npm expo start
```
Scan the QR code in the Expo Go app on your mobile device or run on an emulator.

---

## ❗ Important Notes
- Ensure **.env file is not pushed to GitHub** (It's already ignored in `.gitignore`).
- If any issue occurs, run `expo doctor` to check for problems.
- Firestore is **public**, so be cautious with sensitive data.

---

## 🎯 Need Help?
If you face any issues, feel free to ask! 😊

