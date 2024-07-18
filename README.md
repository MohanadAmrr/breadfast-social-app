# Breadfast Social App

## Description

Breadfast Social App is a sample social mobile application built with React Native and Expo. It features a splash screen, a home screen with a list of posts, and a detailed view for each post including comments.

## Screenshots



<img src="Simulator Screenshot - iPhone Xs - 2024-07-18 at 07.00.42 #2.png" width="200" alt="Post Details">
<img src="Simulator Screenshot - iPhone Xs - 2024-07-18 at 06.52.20.png" width="200" alt="Splash Screen">
<img src="Simulator Screenshot - iPhone Xs - 2024-07-18 at 06.54.20.png" width="200" alt="Posts List">

## Features

- Splash screen with animated logo
- Home screen displaying a list of posts
- Detailed post view with comments
- Pull-to-refresh functionality
- Integration with GoRest API for fetching posts and comments

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (for mobile development)
- Expo Go app on your physical device (optional, for testing on real devices)

## Installation

1. Clone the repository:

```bash
# clone the repo usnig this command
$ git clone https://github.com/your-username/breadfast-social-app.git

# navigate to project folder
$ cd breadfast-social-app

```

2. Install dependencies:

```bash
#  install dependencies
$ npm install

# if youre using yarn:
$ yarn install

```

3. Running the App

```bash
# Start the development server:
$ npm start

# Run on specific platforms:
# iOS:
$ npm run ios
# Android:
$ npm run android
# Web: 
$ npm run web
```

## App Folder Structure
```
breadfast-social-app/
├── assets/
│   └── breadfastlogo.png
├── __tests__/
│   └── PostsDetailsScreen.test.tsx
├── src/
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── PostsScreen.tsx
│   │   └── PostDetailsScreen.tsx
│   ├── types/
│   │   └── types.ts
│   
├── app.json
├── App.tsx
├── package.json
├── tsconfig.json
└── README.md
```
