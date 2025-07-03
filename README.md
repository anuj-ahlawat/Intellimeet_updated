<img width="1440" alt="Screenshot 2025-07-03 at 10 09 55 PM" src="https://github.com/user-attachments/assets/ebdd4d51-1fb4-4ca6-b8e0-64881225e17c" /># Intellimeet

Intellimeet is a modern, AI-powered video meeting platform built with Next.js, Stream Video SDK, and Clerk authentication. It enables users to schedule, join, and manage video meetings, view recordings, and generate AI-based meeting summaries.

## Features

- **Instant, Scheduled, and Personal Meetings**: Start an instant meeting, schedule one for later, or use your personal meeting room.
- **Join via Invitation Link**: Easily join meetings using a shared link.
- **Meeting Calendar**: Visualize upcoming meetings in a calendar view.
- **Meeting Recordings**: Access and manage recordings of past meetings.
- **AI-Powered Summaries**: Generate automated summaries of meeting recordings using an integrated AI service.
- **Live Captions**: Real-time speech-to-text captions during meetings (browser-supported).
- **In-Meeting Chat**: Communicate with participants via chat.
- **Participant Management**: View and manage meeting participants.
- **Responsive UI**: Modern, mobile-friendly interface with dark mode support.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Video/Audio**: [Stream Video React SDK](https://getstream.io/video/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Calendar**: react-big-calendar, date-fns
- **UI Components**: Radix UI, Lucide Icons
- **AI Summarization**: Custom FastAPI backend (see below)

## Getting Started

### Prerequisites
- Node.js 18+
- Yarn or npm
- [Stream Video API credentials](https://getstream.io/video/)
- [Clerk credentials](https://clerk.dev/)
- (Optional) FastAPI backend for AI summaries (see below)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Intellimeet_updated-main\ 2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your Stream and Clerk credentials:
     ```env
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
     STREAM_API_KEY=your-stream-api-key
     STREAM_API_SECRET=your-stream-api-secret
     NEXT_PUBLIC_BASE_URL=http://localhost:3000
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### AI Summarization Backend (Optional)
- The `/api/summarize` route proxies requests to a FastAPI backend at `http://127.0.0.1:8000/process_video`.
- To enable AI-powered meeting summaries, run the FastAPI backend locally or update the endpoint in `app/api/summarize/route.ts`.

## Usage

- **Home/Landing**: Greeted with a dashboard to start, join, or schedule meetings.
- **Calendar**: View all upcoming meetings in a calendar format.
- **Recordings**: Access, play, and delete meeting recordings. Generate AI summaries for recordings.
- **Personal Room**: Each user has a unique, persistent meeting room.
- **In-Meeting**: Video, audio, chat, live captions, participant management, and layout controls.

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Lint the codebase

## Folder Structure

- `app/` — Next.js app directory (pages, API routes, layouts)
- `components/` — Reusable React components
- `hooks/` — Custom React hooks
- `constants/` — App-wide constants
- `public/` — Static assets (icons, images)
- `lib/` — Utility functions
- `providers/` — Context and provider components
- ## 📸 Screenshots

### 🏠 Dashboard

[Uploading Screenshot 2025-07-03 at 10.09.55 PM.png…]()

<img width="1420" alt="Screenshot 2025-07-03 at 10 10 39 PM" src="https://github.com/user-attachments/assets/0ca26de1-ba28-4e3f-a971-2d65a12b612e" />


### 📅 Calendar View

<img width="1144" alt="Screenshot 2025-07-03 at 10 11 17 PM" src="https://github.com/user-attachments/assets/11540d66-321c-4101-a3c7-3cae20f28d2b" />

### 🎥 In-Meeting Interface

![Uploading Screenshot 2025-07-03 at 10.11.57 PM.png…]()



## License

This project is for educational and demonstration purposes only. For production use, review and update security, privacy, and deployment settings as needed.
