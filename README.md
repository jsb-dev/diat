# Diat

## Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Client](#client)
    - [Server](#server)
- [Built With](#built-with)
  - [Client](#client-1)
  - [server](#server-1)
  - [Both](#both)
- [Contact](#contact)

## About the Project

Diat is a full stack PWA designed to integrate rich text editing with a traditional drag-and-drop interface. It was my first time developing within Next. The inspiration for this project came from my desire to document things visually and logically, all from the same platform. This is particularly useful for planning projects and providing visual, logical aids during the development process.

## Getting Started

### Prerequisites

This is a next.js project bootstrapped with create-next-app, so you'll want to make sure you have updated node and npm before installing

### Installation

The project is split into `client` and `server` directories:

#### Client

Move into the `client` directory and `npm install` to install the necessary packages. Once this is done, you can use the default scripts provided by next. Start with `npm run dev` to start the development server. IMPORTANT: Be sure to check your styles injection order when making major CSS changes. Run `npm run build` before any deployments to ensure UI consistency. You can find mor specifics in the client-side [package.json](client/package.json).

#### Server

Move into the `server` directory and `npm install` to install everything. It's a Node.js server configured with nodemon for hot-reloading. Use `npm start` to begin the development server. You can find out more in the server-side [package.json](server/package.json).

## Built With

### Diat is a MERN stack react-redux-next project:

#### Client

- `React`: UI development
- `Next.js`: Development framework
- `Redux`: State-management
- `ReactFlow`: Diagram functionality
- `TipTap.js`: Text-editing functionality

#### Server

- `Express.js`: API
- `MongoDb`: Database

#### Both

- `validator` for input validation

## Contact

**Jacob Booth**

- [Email](mailto:jsb-dev@outlook.com)
- [YourGitHubProfile](https://github.com/jsb-dev)
