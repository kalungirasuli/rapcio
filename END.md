# Rapcio Application Overview

## Introduction
Rapcio is a modern web application designed for sports club management, player registration, and referee operations. The frontend is built with React, TypeScript, Redux, and Tailwind CSS, providing a responsive and user-friendly interface. The backend is powered by Express and better-sqlite3, ensuring fast and reliable data storage.

## Main Features

### 1. Authentication & Role Management
- **Login:** Secure login for users with roles: SUPER_ADMIN, ADMIN, and REFEREE.
- **Role-based Navigation:** Users are redirected to dashboards based on their role after login.
- **Token-based Auth:** JWT tokens are used for session management and API security.

### 2. User Management
- **Add/Edit/Delete Users:** Admins can manage users, assign roles, and update user information.
- **User Profile:** Each user can view and update their profile.

### 3. Player Management
- **Add Players:** Admins can register new players with detailed information.
- **View All Players:** List and search all registered players.
- **View Player Details:** See detailed information for each player.

### 4. Sports Club Management
- **Add Clubs:** Admins can register new sports clubs.
- **View All Clubs:** List and search all registered clubs.

### 5. Referee Operations
- **QR Code Scanning:** Referees can scan QR codes for player verification.

### 6. UI/UX
- **Modern Design:** Clean, responsive layouts using Tailwind CSS.
- **Reusable Components:** Button, InputField, DataTable, Modal, etc.
- **Dark Mode Support:** Toggle between light and dark themes.

## Application Structure

- `src/pages/auth/` — Authentication pages (Login, Forgot Password)
- `src/pages/admin/` — Admin dashboard, user, player, and club management
- `src/pages/referee/` — Referee dashboard and QR code scanning
- `src/components/` — Reusable UI components
- `src/layouts/` — Layouts for authentication and dashboard
- `src/store/` — Redux store and slices for state management
- `src/utils/` — API utilities and helpers

## How It Works
1. **User logs in** via the login form. Credentials are sent to `/auth/login`.
2. **JWT token** is stored in Redux and localStorage for authenticated requests.
3. **Role-based routing** ensures users see only the pages relevant to their role.
4. **Admins** can manage users, players, and clubs through dedicated forms and tables.
5. **Referees** use the QR code scanner for player verification at events.

## Getting Started
- Install dependencies: `npm install`
- Start the backend server: `npm run server`
- Start the frontend: `npm run dev`

## Technologies Used
- React, TypeScript, Redux, Tailwind CSS
- Express, better-sqlite3, JWT

## Required Datasets by User Role

### SUPER_ADMIN
- All users (including admins and referees)
- All players
- All clubs
- Full access to all datasets for management and oversight

### ADMIN
- All users (except SUPER_ADMIN)
- All players
- All clubs
- Can add/edit/delete users (except SUPER_ADMIN), players, and clubs

### REFEREE
- Players (for verification and QR code scanning)
- Clubs (for context during events)
- Limited user data (only their own profile)

## API Payloads for Add Forms

### Add Player Form
**Endpoint:** `/players` (POST)
**Payload Example:**
```json
{
  "familyName": "string",
  "firstName": "string",
  "languageOfTheName": "string",
  "dateOfBirth": "string",
  "gender": "string",
  "countryOfBirth": "string",
  "mainNationality": "string",
  "secondaryNationality": "string",
  "regionOrStateOfBirth": "string",
  "cityOfBirth": "string",
  "identificationNumber": "string",
  "status": "string",
  "clubId": "string"
}
```

### Add Club Form
**Endpoint:** `/clubs` (POST)
**Payload Example:**
```json
{
  "clubName": "string",
  "email": "string",
  "description": "string"
}
```

### Add User Form
**Endpoint:** `/auth/signup/admin` or `/auth/signup/referee` (POST)
**Payload Example:**
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```
- The endpoint is chosen based on the selected role (administrator or referee).

## API Payloads for Viewing Individual Records

### View Player
**Source:** Redux store (no direct API call in ViewPlayer)
- The player is found in the Redux state by ID. No payload is sent to the API when viewing a player; the data is already loaded from the list endpoint.

### View User
**Source:** `/data/users.json` (local JSON file)
- The user is found by ID in a static JSON file. No payload is sent to the API; the data is loaded from the file and filtered client-side.

### View Club
**Source:** Redux store (no direct API call in AllSportsClubs)
- The club is found in the Redux state by ID. No payload is sent to the API when viewing a club; the data is already loaded from the list endpoint.

## QR Code Scanning (Referee)

When a referee scans a player's QR code, the following occurs:

- The QR code contains the player's unique ID (e.g., `playerId`).
- The frontend sends a GET request to the server:

  **Endpoint:** `/players/:id` (GET)
  **Example:** `/players/12345`

- **Request Payload:**
  - No body payload; the player ID is sent as a URL parameter.

- **Server Response:**
  ```json
  {
    "id": "12345",
    "familyName": "Doe",
    "firstName": "John",
    "dateOfBirth": "2000-01-01",
    "gender": "Male",
    "mainNationality": "Country",
    "status": "Active",
    "identificationNumber": "ID123456",
    "countryOfBirth": "Country",
    "cityOfBirth": "City",
    "clubId": "67890"
    // ...other player details
  }
  ```

- The frontend displays the full player details to the referee for verification.

---
This ensures referees can instantly verify a player's identity and details by scanning their QR code at events.

Each role is granted access only to the datasets necessary for their responsibilities, ensuring security and proper data segregation throughout the application.

For more details, see the codebase and README.md.
