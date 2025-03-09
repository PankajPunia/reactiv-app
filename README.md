# ReactivApp

<img src="./recording.gif" width="400" height="900">

## Features

- Product listing
- Product details
- Shopping cart

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/PankajPunia/reactiv-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd ReactivApp
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Install the necessary pods for iOS:
   ```sh
   npx pod-install
   ```

## Usage

1. Start metro:
   ```sh
   npm start
   ```
2. Run the application on an Android or iOS simulator:
   ```sh
   npm run android
   npm run ios
   ```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── services/         # API services and data handling
├── utils/            # Utility functions and helpers
├── navigation/       # App navigaiton structure
├── context/          # State management
├── screens/          # Screens
└── ...               # Other files and directories
```

## Overview of Implementation

### Architecture Choices

- **Component-Based Architecture**: The application is built using reusable React Native components to ensure modularity and maintainability.
- **TypeScript**: TypeScript is used to provide type safety and improve code quality.
- **React Query**: Manages data fetching, caching, and synchronization, simplifying API calls and reducing boilerplate while keeping data up to date

### Navigation

- **React Navigation**: React Navigation is used for client-side routing to handle navigation between different screens of the application. It uses combination of bottom tab navigator and native stack.

### State Management

- **React Context API**: The Context API is used for managing global state, such as the shopping cart.
- **Local State**: Local state is managed using React's `useState` hooks for component-specific state.


