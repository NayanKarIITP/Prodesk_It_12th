🚀 Live Chat Room: Real-time WebSocket ApplicationA high-performance, bidirectional chat application built to demonstrate the power of WebSockets over traditional HTTP. This project enables instant communication across isolated chat rooms with zero-latency feedback.
🛠️ Tech StackLayerTechnologyFrontendReact.js (Hooks, Context)BackendNode.js, Express.jsReal-TimeSocket.io (WebSockets)StylingCSS3 (Flexbox & Modern UI)

✨ Features

🟢 Level 1: Foundation[x] Instant Messaging: Real-time data transfer without page refreshes.[x] Bi-directional Flow: Server-to-client push notifications.

🟡 Level 2: User Experience[x] User Identification: Personalized usernames displayed in chat bubbles.[x] Typing Indicator: Live "User is typing..." status updates.[x] System Notifications: Alerts for users joining/leaving the room.

🔴 Level 3: Advanced Architecture[x] Room Isolation: Distinct channels for "General" and "Tech Support."[x] Targeted Broadcasting: Logic ensuring messages stay within the selected room.[x] Auto-Scroll UI: Seamless conversation tracking via useRef.[x] Connection Cleanup: Implemented socket.off() to prevent memory leaks and duplicates.

🏗️ Architecture OverviewUnlike standard REST APIs where the client must request data, this app uses a persistent connection:Handshake: Client establishes a persistent connection with the Node.js server.Room Logic: Server stores user state and manages room-based broadcasting using socket.to(room).emit().State Sync: React manages the UI state locally for the sender while simultaneously syncing with the backend.

🚀 Getting Started1. Clone the RepositoryBashgit clone [your-repo-link]
2. Setup the ServerBashcd server
npm install
node server.js
3. Setup the ClientBashcd client
npm install
npm start

🎥 Demo WalkthroughTo verify Level 3 (Room Isolation):Open two browser tabs and join the "General" room.Open one browser tab and join "Tech Support".Send a message in "General"—it will only appear in the first two tabs, proving the advanced routing logic is successful.📄 LicenseDeveloped as part of the Fullstack Developer Track B requirements.
