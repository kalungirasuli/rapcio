# Rapcio Server API Documentation

This document provides comprehensive information about all API endpoints available in the Rapcio Server application.

## Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Clubs](#clubs)
- [Players](#players)

## Authentication

### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Permissions**: None

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response:**

- **Code**: 200 OK

```json
{
  "message": "Login successful",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```

**Error Responses:**

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "Email and password are required" }`

- **Code**: 401 Unauthorized
  - **Content**: `{ "message": "Invalid credentials" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error during login" }`

### Create Admin User

- **URL**: `/api/auth/signup/admin`
- **Method**: `POST`
- **Auth Required**: Yes
- **Permissions**: SUPER_ADMIN only

**Request Body:**

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

**Success Response:**

- **Code**: 201 Created

```json
{
  "message": "Admin user created successfully",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "role": "ADMIN"
  }
}
```

**Error Responses:**

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "Full name, email and password are required" }`

- **Code**: 409 Conflict
  - **Content**: `{ "message": "Email already in use" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error during admin signup" }`

### Create Referee User

- **URL**: `/api/auth/signup/referee`
- **Method**: `POST`
- **Auth Required**: Yes
- **Permissions**: ADMIN or SUPER_ADMIN

**Request Body:**

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

**Success Response:**

- **Code**: 201 Created

```json
{
  "message": "Referee user created successfully",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "role": "REFEREE"
  }
}
```

**Error Responses:**

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "Full name, email and password are required" }`

- **Code**: 409 Conflict
  - **Content**: `{ "message": "Email already in use" }`

- **Code**: 403 Forbidden
  - **Content**: `{ "message": "Requires ADMIN or SUPER_ADMIN role" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error during referee signup" }`

## Users

### Get All Users

- **URL**: `/api/users`
- **Method**: `GET`
- **Auth Required**: Yes
- **Permissions**: All authenticated users (results filtered by role)

**Success Response:**

- **Code**: 200 OK

```json
{
  "message": "Users retrieved successfully",
  "users": [
    {
      "id": "string",
      "fullName": "string",
      "email": "string",
      "role": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

**Notes:**
- SUPER_ADMIN and ADMIN users can see all users
- REFEREE users can only see their own record

**Error Response:**

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while retrieving users" }`

### Get User by ID

- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Permissions**: ADMIN or the user themselves

**URL Parameters:**

- `id`: User ID

**Success Response:**

- **Code**: 200 OK

```json
{
  "message": "User retrieved successfully",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "role": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

**Error Responses:**

- **Code**: 404 Not Found
  - **Content**: `{ "message": "User not found" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while retrieving user" }`

### Update User

- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Permissions**: ADMIN or the user themselves

**URL Parameters:**

- `id`: User ID

**Request Body:**

```json
{
  "fullName": "string", // optional
  "email": "string" // optional
}
```

**Success Response:**

- **Code**: 200 OK

```json
{
  "message": "User updated successfully",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "role": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

**Error Responses:**

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "At least one field (fullName or email) is required" }`

- **Code**: 404 Not Found
  - **Content**: `{ "message": "User not found" }`

- **Code**: 409 Conflict
  - **Content**: `{ "message": "Email already in use by another user" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while updating user" }`

### Delete User

- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Permissions**: ADMIN only

**URL Parameters:**

- `id`: User ID

**Success Response:**

- **Code**: 200 OK

```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**

- **Code**: 404 Not Found
  - **Content**: `{ "message": "User not found" }`

- **Code**: 403 Forbidden
  - **Content**: `{ "message": "Cannot delete SUPER_ADMIN user" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while deleting user" }`

## Clubs

### Get All Clubs

- **URL**: `/api/clubs`
- **Method**: `GET`
- **Auth Required**: Yes
- **Permissions**: All authenticated users

**Success Response:**

- **Code**: 200 OK

```json
[
  {
    "id": "string",
    "clubName": "string",
    "email": "string",
    "description": "string"
  }
]
```

**Error Response:**

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while fetching clubs" }`

### Get Club by ID

- **URL**: `/api/clubs/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Permissions**: All authenticated users

**URL Parameters:**

- `id`: Club ID

**Success Response:**

- **Code**: 200 OK

```json
{
  "id": "string",
  "clubName": "string",
  "email": "string",
  "description": "string",
  "players": [
    {
      "id": "string",
      "familyName": "string",
      "firstName": "string",
      "dateOfBirth": "string",
      "gender": "string",
      "clubId": "string",
      // other player fields
    }
  ]
}
```

**Error Responses:**

- **Code**: 404 Not Found
  - **Content**: `{ "message": "Club not found" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while fetching club" }`

### Create Club

- **URL**: `/api/clubs`
- **Method**: `POST`
- **Auth Required**: Yes
- **Permissions**: ADMIN only

**Request Body:**

```json
{
  "clubName": "string", // required
  "email": "string", // optional
  "description": "string" // optional
}
```

**Success Response:**

- **Code**: 201 Created

```json
{
  "message": "Club created successfully",
  "club": {
    "id": "string",
    "clubName": "string",
    "email": "string",
    "description": "string"
  }
}
```

**Error Responses:**

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "Club name is required" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while creating club" }`

### Update Club

- **URL**: `/api/clubs/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Permissions**: ADMIN only

**URL Parameters:**

- `id`: Club ID

**Request Body:**

```json
{
  "clubName": "string", // optional
  "email": "string", // optional
  "description": "string" // optional
}
```

**Success Response:**

- **Code**: 200 OK

```json
{
  "message": "Club updated successfully",
  "club": {
    "id": "string",
    "clubName": "string",
    "email": "string",
    "description": "string"
  }
}
```

**Error Responses:**

- **Code**: 404 Not Found
  - **Content**: `{ "message": "Club not found" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while updating club" }`

### Delete Club

- **URL**: `/api/clubs/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Permissions**: ADMIN only

**URL Parameters:**

- `id`: Club ID

**Success Response:**

- **Code**: 200 OK

```json
{
  "message": "Club deleted successfully"
}
```

**Error Responses:**

- **Code**: 404 Not Found
  - **Content**: `{ "message": "Club not found" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while deleting club" }`

## Players

### Get All Players

- **URL**: `/api/players`
- **Method**: `GET`
- **Auth Required**: Yes
- **Permissions**: All authenticated users

**Success Response:**

- **Code**: 200 OK

```json
[
  {
    "id": "string",
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
]
```

**Error Response:**

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while fetching players" }`

### Get Player by ID

- **URL**: `/api/players/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Permissions**: All authenticated users

**URL Parameters:**

- `id`: Player ID

**Success Response:**

- **Code**: 200 OK

```json
{
  "id": "string",
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
  "clubId": "string",
  "club": {
    "id": "string",
    "clubName": "string",
    "email": "string",
    "description": "string"
  }
}
```

**Error Responses:**

- **Code**: 404 Not Found
  - **Content**: `{ "message": "Player not found" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while fetching player" }`

### Create Player

- **URL**: `/api/players`
- **Method**: `POST`
- **Auth Required**: Yes
- **Permissions**: ADMIN only

**Request Body:**

```json
{
  "familyName": "string", // required
  "firstName": "string", // required
  "languageOfTheName": "string", // optional
  "dateOfBirth": "string", // required (YYYY-MM-DD format)
  "gender": "string", // required
  "countryOfBirth": "string", // optional
  "mainNationality": "string", // optional
  "secondaryNationality": "string", // optional
  "regionOrStateOfBirth": "string", // optional
  "cityOfBirth": "string", // optional
  "identificationNumber": "string", // optional
  "status": "string", // optional
  "clubId": "string" // optional
}
```

**Success Response:**

- **Code**: 201 Created

```json
{
  "message": "Player created successfully",
  "player": {
    "id": "string",
    "familyName": "string",
    "firstName": "string",
    // other player fields
  }
}
```

**Error Responses:**

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "Required fields missing", "requiredFields": ["familyName", "firstName", "dateOfBirth", "gender"] }`
  - **Content**: `{ "message": "Club not found" }`
  - **Content**: `{ "message": "Identification number already exists" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while creating player" }`

### Update Player

- **URL**: `/api/players/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Permissions**: ADMIN only

**URL Parameters:**

- `id`: Player ID

**Request Body:**

```json
{
  "familyName": "string", // optional
  "firstName": "string", // optional
  "languageOfTheName": "string", // optional
  "dateOfBirth": "string", // optional
  "gender": "string", // optional
  "countryOfBirth": "string", // optional
  "mainNationality": "string", // optional
  "secondaryNationality": "string", // optional
  "regionOrStateOfBirth": "string", // optional
  "cityOfBirth": "string", // optional
  "identificationNumber": "string", // optional
  "status": "string", // optional
  "clubId": "string" // optional
}
```

**Success Response:**

- **Code**: 200 OK

```json
{
  "message": "Player updated successfully",
  "player": {
    "id": "string",
    "familyName": "string",
    "firstName": "string",
    // other player fields
  }
}
```

**Error Responses:**

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "No fields to update provided" }`
  - **Content**: `{ "message": "Club not found" }`
  - **Content**: `{ "message": "Identification number already exists" }`

- **Code**: 404 Not Found
  - **Content**: `{ "message": "Player not found" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while updating player" }`

### Delete Player

- **URL**: `/api/players/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Permissions**: ADMIN only

**URL Parameters:**

- `id`: Player ID

**Success Response:**

- **Code**: 200 OK

```json
{
  "message": "Player deleted successfully"
}
```

**Error Responses:**

- **Code**: 404 Not Found
  - **Content**: `{ "message": "Player not found" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "message": "Server error while deleting player" }`