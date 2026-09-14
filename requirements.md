# StudyFlix Phase 1 Requirements

## Overview
This document outlines the detailed requirements for the UI components assigned to **Abhirath** for **Phase 1** of the StudyFlix project. The primary goal of this phase is to build a fully navigable and visually polished frontend using React, relying entirely on mock/dummy data.

Based on the assignment, the following screens are to be built:
1. Login + Signup
2. Onboarding
3. Profile
4. Settings

---

## 1. Login & Signup
### Functional Requirements
- **Signup View:** Form containing fields for Full Name, Email, Password, and Confirm Password.
- **Login View:** Form containing fields for Email and Password.
- **Toggle/Navigation:** Users should be able to seamlessly switch between the Login and Signup views.
- **Validation:** Basic client-side validation (e.g., valid email format, password length, passwords match).
- **Dummy Data Behavior:** Simulate successful login/signup using predefined dummy user credentials. No real backend connection should be made.

### Code & Technical Requirements
- **Components:** `Login`, `Signup` (can be wrapped in an `Auth` layout component).
- **State Management:** Use `useState` for form handling.
- **Routing:** Implement React Router for navigation (`/login`, `/signup`).
- **Styling:** Premium, modern aesthetics (e.g., glassmorphism card on a dynamic background).

---

## 2. Onboarding
### Functional Requirements
- **Multi-step Flow:** A sequential flow presented to users immediately after signup to personalize their experience (e.g., selecting learning goals, subjects of interest, or current education level).
- **Navigation:** "Next", "Back", and "Skip" buttons to navigate through the onboarding steps.
- **Progress Indication:** A visual indicator showing the user's progress through the onboarding steps (e.g., a progress bar or step dots).
- **Dummy Data Behavior:** Provide a predefined, mock list of subjects/interests for the user to select from.

### Code & Technical Requirements
- **Components:** `Onboarding` (main container), with sub-components for each step (`StepOne`, `StepTwo`, etc.).
- **State Management:** Lift state up to the `Onboarding` container to track the current step and the choices made across steps.
- **Styling:** Smooth transitions/animations between steps using CSS.

---

## 3. Profile
### Functional Requirements
- **User Information:** Display the user's avatar, name, email, and a brief bio.
- **Learning Statistics:** Show visual representations of progress (e.g., courses completed, hours studied, current streak).
- **Dummy Data Behavior:** Create a comprehensive mock user object (`mockUser.js`) to populate all fields and statistics on the page.

### Code & Technical Requirements
- **Components:** `Profile`, `StatCard`, `UserAvatar`.
- **Layout:** Responsive grid or flexbox layout to organize the user details and statistics cleanly.
- **Styling:** Use modern typography and subtle hover effects on interactive elements.

---

## 4. Settings
### Functional Requirements
- **Categories:** Organize settings into logical sections such as Account (change name, email, password), Preferences (notifications, dark/light theme), and Danger Zone (logout, delete account).
- **Forms/Toggles:** Use form inputs for text changes and toggle switches for boolean preferences.
- **Dummy Data Behavior:** Simulate saving changes (e.g., a mock "Saved!" toast notification) without persisting to a real database. State should update to reflect changes locally.

### Code & Technical Requirements
- **Components:** `Settings` (layout with side navigation or tabs), `SettingsSection`, `ToggleSwitch`.
- **State Management:** Use React Context if global settings (like Theme) need to affect the entire application.

---

## General Phase 1 Requirements (For All Tasks)
- **Framework:** React.js (functional components and hooks).
- **Styling:** Vanilla CSS with a focus on visual excellence. Avoid generic designs; use curated color palettes, smooth gradients, and micro-animations to create a premium feel.
- **Data:** **Strictly use mock data.** Create a `data/mockData.js` file to centralize all dummy information (users, subjects, stats) so it can easily be swapped out in Phase 4.
- **Routing:** Ensure all these screens are interconnected using a routing library (e.g., `react-router-dom`) so the application is fully navigable.

---

## Required APIs & Data Structures (Phase 1 Mock APIs)
Since Phase 1 uses dummy data, you should build **Mock API Services** (using asynchronous functions with `setTimeout`) to simulate network requests. This will make the Phase 4 (MERN Integration) seamless.
- **Auth Service:**
  - `login(email, password)`: Returns a mock JWT token and dummy user object.
  - `signup(userData)`: Simulates user creation and returns a success status.
- **User Service:**
  - `getUserProfile()`: Returns mock user details, avatar URL, and learning stats.
  - `updateUserSettings(settings)`: Simulates updating preferences (e.g., theme, email).
- **Browser APIs:** 
  - `localStorage` / `sessionStorage`: Use for temporarily persisting mock auth state and theme preferences during the session.
  - **React Context API:** Use to manage global state like the logged-in User session and Dark/Light Mode across the app.

## Important Shortcuts & Commands
### Development Commands (Terminal)
- `npm run dev` : Start the local development server.
- `npm install react-router-dom` : Install the required routing library (if not already installed).

### UI / Keyboard Shortcuts (For Premium UX)
- **Forms (Login/Signup/Settings):** Bind the `Enter` key to submit forms seamlessly without needing to click the submit button.
- **Onboarding Navigation:** Allow users to use `Enter` to proceed to the next step, and `Esc` to skip.
- **Modals/Dropdowns:** Ensure the `Esc` key closes any open menus, settings modals, or toast notifications.
- **Accessibility:** Ensure all inputs, buttons, and toggle switches are fully navigable using the `Tab` key.

---

## Dummy Data Structures
To populate your UI in Phase 1, you should create a `src/data/mockData.js` file with predefined JSON structures. This allows you to design your components accurately before the real database is integrated.

**1. Mock User Object (Profile & Settings)**
```javascript
export const mockUser = {
  id: "usr_123",
  name: "Abhirath",
  email: "abhirath@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhirath",
  bio: "Passionate learner exploring web development and AI.",
  joinDate: "2023-08-15",
  stats: {
    coursesCompleted: 4,
    hoursStudied: 120,
    currentStreak: 12, // in days
  },
  preferences: {
    theme: "dark", // or 'light'
    notificationsEnabled: true
  }
};
```

**2. Mock Onboarding Data (Subjects/Interests)**
```javascript
export const mockOnboardingSubjects = [
  { id: "sub_1", name: "Frontend Development", icon: "💻" },
  { id: "sub_2", name: "Backend APIs", icon: "⚙️" },
  { id: "sub_3", name: "Artificial Intelligence", icon: "🤖" },
  { id: "sub_4", name: "UI/UX Design", icon: "🎨" },
  { id: "sub_5", name: "Data Science", icon: "📊" }
];
```

**3. Mock Auth Responses**
```javascript
export const mockAuthResponse = {
  token: "mock_jwt_token_header.payload.signature",
  user: mockUser
};
```
