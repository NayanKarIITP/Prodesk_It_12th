🛠️ Phase 1: My Core Architecture
My Contribution: I initialized the React App and the Node.js server. I established the basic Express routes and installed the necessary dependencies (socket.io, socket.io-client, cors).

Prompt 1 (Refining My Setup): "I have my Express server running on port 5000 and my React app on 3000. Help me configure the CORS settings in io so my frontend can safely connect without being blocked."

Prompt 2 (Event Naming): "I’ve set up my socket.on listeners, but I want to standardize my event names (e.g., send_message vs receive_message). What is the industry standard for naming these real-time events?"

🔍 Phase 2: Solving Logical Bugs
My Contribution: I wrote the initial logic for Level 2 (User IDs) and Level 3 (Rooms). However, I encountered "Echo" bugs and "State" bugs that I needed the AI to help me debug.

Prompt 3 (The 'Echo' Bug): "My Level 3 rooms are working, but when I send a message, it appears twice on my screen. I am adding it to state locally and the server is also sending it back. How do I change io.to to socket.to to stop this echo?"

Prompt 4 (React Cleanup): "I noticed that every time I refresh my chat, my message listeners double up. Help me write a useEffect cleanup function using socket.off() to ensure I only have one active listener at a time."

Prompt 5 (Variable Definition): "I'm getting an ESLint error 'setTyper' is not defined. Help me sync my useState hook names with my useEffect calls so the typing indicator works."

🎨 Phase 3: UI/UX & Polish
My Contribution: I built the functional HTML forms and buttons. I used the AI to provide high-end CSS and interactive features to make the "Tech Support" and "General" rooms look professional.

Prompt 6 (Modern UI): "I have the basic chat working. Give me a modern CSS layout using Flexbox that centers the login card and gives the chat bubbles a 'WhatsApp' look with tails."

Prompt 7 (Auto-Scroll): "When the chat gets long, I have to scroll down manually. Help me implement a useRef hook that automatically scrolls the chat-body to the bottom whenever a new message arrives."

Prompt 8 (System Messages): "My server sends a 'System' message when a user joins. How do I conditionally style these messages in React so they are centered and gray, while user messages stay in bubbles
