# 🎮 BetMaster Mini

![MERN Stack](https://img.shields.io/badge/MERN-Stack-000000?style=for-the-badge&logo=mongodb&logoColor=green)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

Wait less, Play more. A premium, full-stack web application for viewing live Sports Matches and playing high-quality Casino Games. Built with a modern **MERN** stack and designed with a "Dark Mode" aesthetic.

---

## ✨ Features

### 🏈 Sports & Casino Hub
-   **Unified Dashboard:** seamlessly switch between high-stakes Casino games and Live Sports matches.
-   **Live Data:** View real-time match details (Teams, Timings) and Casino provider info.
-   **Smart Search:** Instantly find your favorite game or team with a debounced search bar.
-   **Filtering:** Drill down by category (e.g., "Slots", "IPL", "EPL") or provider (e.g., "Evolution", "NetEnt").

### ❤️ Favorites System
-   **Personalized Collection:** Mark any game as a favorite with a single click.
-   **Persistent State:** Your favorites are saved to your profile and persist across sessions.
-   **Quick Access:** View all your managed favorites in a dedicated view.

### 🔐 Secure Authentication
-   **JWT Authorization:** Fully secured API using JSON Web Tokens.
-   **Protected Routes:** Frontend route guards ensure only authenticated users can access the dashboard.
-   **Session Management:** Automatic session expiry handling with user-friendly redirects.

### 🎨 Visual Excellence
-   **Premium UI:** Custom dark theme using Tailwind CSS.
-   **Dynamic Images:** High-quality, game-specific imagery for an immersive experience.
-   **Responsive:** Fully optimized for desktop, tablet, and mobile viewing.

---

## 🛠️ Technology Stack

| Area | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite)** | Lightning-fast SPA framework |
| | **Tailwind CSS v4** | Utility-first styling for premium UI |
| | **Axios** | API requests and Interceptors |
| | **Lucide React** | Modern, clean iconography |
| **Backend** | **Node.js** | Runtime environment |
| | **Express.js** | API Framework |
| | **Mongoose** | MongoDB Object Modeling |
| | **BCryptJS** | Password Hashing |
| **Database** | **MongoDB** | NoSQL Data Persistence |

---

## 🚀 Getting Started

Follow these steps to get the project running locally on your machine.

### Prerequisites
-   [Node.js](https://nodejs.org/) (v16+)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 1. Clone the Repository
```bash
git clone <repository_url>
cd betmaster-mini
```

### 2. Backend Setup
Navigate to the `server` directory and install dependencies.

```bash
cd server
npm install
```

**Environment Configuration (.env)**
Create a `.env` file in the `server` folder:
```env
MONGO_URI=mongodb://localhost:27017/betmaster  # Or your MongoDB Atlas URI
JWT_SECRET=your_super_secret_key_123
PORT=5000
```

**Seed the Database**
Populate the app with our premium game selection:
```bash
node seed.js
```

**Start the Server**
```bash
node index.js
```
> Server will run at `http://localhost:5000`

### 3. Frontend Setup
Open a new terminal, navigate to the `client` directory.

```bash
cd client
npm install
```

**Environment Configuration (.env)**
Create a `.env` file in the `client` folder:
```env
VITE_API_URL=http://localhost:5000
```

**Run the Development Server**
```bash
npm run dev
```
> App will launch at `http://localhost:5173`

---

## 🔌 API Documentation

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/games` | Fetch all available games | ✅ |
| `GET` | `/favorites` | Get user's favorite games | ✅ |
| `POST` | `/favorites/:gameId` | Toggle favorite status | ✅ |
| `DELETE` | `/favorites/:gameId` | Remove from favorites | ✅ |

---

## 📂 Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/           # Axios setup & Interceptors
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth Context Provider
│   │   ├── pages/         # Dashboard, Login, Favorites
│   │   └── App.jsx        # Routing & Layouts
│
├── server/                 # Node.js Backend
│   ├── controllers/       # Logic for requests
│   ├── middleware/        # Auth verification
│   ├── models/            # Mongoose Schemas
│   ├── routes/            # API Endpoints
│   └── seed.js            # Database Seeder
```


Made with ❤️ by Devansh
