# Real-Time Chat Application

A modern real-time chat application built with Node.js, Express, and Socket.IO that allows users to join chat rooms, send messages, and share their location with others in the same room.

## Features

- **Real-time messaging**: Instant message delivery using WebSockets
- **Chat rooms**: Users can create or join existing chat rooms
- **User tracking**: Shows who is currently active in each chat room
- **Location sharing**: Users can share their current location with a clickable Google Maps link
- **Responsive design**: Works on desktop and mobile devices

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - Socket.IO for real-time bidirectional communication

- **Frontend**:
  - HTML5/CSS3
  - Bootstrap for responsive design
  - JavaScript (Client-side)
  - Mustache.js for HTML templating
  - Moment.js for time formatting
  - Socket.IO Client

## How It Works

1. Users enter their display name and a room name on the homepage
2. Upon joining, users can see who else is in the room via the sidebar
3. Messages appear in real-time for all users in the same room
4. Users receive notifications when others join or leave
5. The location sharing feature uses the browser's Geolocation API

## Getting Started

### Prerequisites

- Node.js (v10.x or higher)
- npm (v6.x or higher)

### Installation

1. Clone the repository

```
git clone https://github.com/yourusername/chat-app.git
cd chat-app
```

2. Install dependencies

```
npm install
```

3. Create a configuration file

```
mkdir -p configs
touch configs/dev.env
```

4. Add the following to the dev.env file:

```
PORT=3000
```

### Running the Application

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

Once running, access the application at `http://localhost:3000`

## Future Enhancements

- Private messaging between users
- File sharing capabilities
- User authentication
- Message history persistence
- Emojis and rich text support

## License

ISC
