# **Real-Time Chat App Backend**

This is the backend for a real-time chat application built with **Node.js**, **Express.js**, **Socket.IO**, and **MongoDB**. The backend handles user authentication, chat message storage, and real-time communication via WebSockets.

## **Table of Contents**
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Feedback](#feedback)


## **Project Overview**
The backend server for a real-time chat application that facilitates user authentication, message storage, and real-time message delivery using Socket.IO. It interacts with MongoDB for persistent storage of chat messages and user information, and it exposes several RESTful API endpoints to the frontend.

## **Features**
- **User Authentication**: Signup, login, and token-based authentication using JWT.
- **Real-Time Messaging**: Powered by Socket.IO, enabling real-time chat between users.
- **Chat History**: Stores chat messages in MongoDB for future retrieval.
- **Private Chats**: Supports both one-on-one chats.
- **RESTful API**: Exposes several REST endpoints to handle users, chats, and messages.

## **Technologies**
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Framework for handling HTTP requests and building RESTful APIs.
- **Socket.IO**: For real-time, bidirectional communication between the client and server.
- **MongoDB**: NoSQL database for storing user and chat data.
- **JWT (JSON Web Tokens)**: For secure user authentication.

## **Installation**

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd real-time-chat-app-backend
    ```

2. **Install dependencies**:
    ```bash
    yarn install
    ```

3. **Set up environment variables** (see below).

4. **Run the server**:
    ```bash
    yarn start
    ```

## **Environment Variables**

You need to create a `.env` file in the root directory with the following variables:

```plaintext
PORT=5000
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>
SOCKET_PORT=4000
```

## **API EndPoints**

| **API Endpoint**               | **Method** | **Description**                                            | **Request Body / Parameters**                 | **Authentication** |
|---------------------------------|------------|------------------------------------------------------------|------------------------------------------------|--------------------|
| `/api/user/register`            | POST       | Registers a new user.                                       | `userObj`: Object containing user details.     | No                 |
| `/api/user/login`               | POST       | Logs in an existing user.                                   | `userObj`: Object containing login details.    | No                 |
| `/accessjwt`                    | GET        | Retrieves a new access JWT token.                           | None                                           | Yes, with refresh token |
| `/api/user/find/:_id`           | GET        | Retrieves a single user's data by ID.                       | `_id`: User ID (URL param).                    | Yes                |
| `/api/user/getalluser`          | GET        | Retrieves all users.                                        | None                                           | Yes                |
| `/api/chats/:userId`            | GET        | Retrieves all chats for a specific user by user ID.         | `userId`: User ID (URL param).                 | Yes                |
| `/api/chats/find/:userId`       | GET        | Finds the chat for a specific user.                         | `userId`: User ID (URL param).                 | Yes                |
| `/api/chats`                    | POST       | Creates a new chat between two users.                       | `firstId`, `secondId`: User IDs (body params). | Yes                |
| `/api/messages/:_id`            | GET        | Retrieves all messages in a chat by chat ID.                | `_id`: Chat ID (URL param).                    | Yes                |
| `/api/messages`                 | POST       | Sends a message in a chat.                                  | `chatId`, `senderId`, `text`: Message details. | Yes                |


## **Deployment**

The application is hosted on Render. 

## **Feedback**

If you encounter any issues or have feedback, please feel free to contact me at:

📧 **Email**: [roshan.bhattarai@proroshan.com](mailto:roshan.bhattarai@proroshan.com)

