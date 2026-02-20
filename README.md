# Disaster Management Platform

A full-stack web application built on the **MERN** stack (MongoDB, Express, React, Node) designed to support communities during natural and man-made disasters.

Users can report incidents, request help, monitor relief operations, and receive real-time notifications. Role-based access controls allow volunteers, script-writers, and administrators to manage and publish content. The frontend is built with React and Tailwind CSS powered by Vite, while the backend exposes REST APIs using Express and MongoDB for persistence.

---

## 🚀 Features

- User authentication (signup/login) with JWT
- Role-based permissions:
  - **General user**: dashboard, notifications, report incidents
  - **Volunteer**: user abilities + create/update reports on behalf of others
  - **Script-writer**: volunteer rights + upload official reports for public display
  - **Administrator**: manage users and assign/revoke roles
- Forgot / reset password flow via email
- Dashboard for authenticated access
- Responsive React UI with smooth transitions and card-style layouts
- Informational pages (Home, About) and choice flow for guests vs logged-in users

---

## 🏗️ Stack & Structure

- **Backend**: Node.js, Express, MongoDB (via Mongoose), JWT, bcrypt, nodemailer
- **Frontend**: React, React Router v7, Tailwind CSS, Vite, React Icons
- **Dev tools**: ESLint, PostCSS, Vite development server

```
disaster-management/
├─ backend/          # Express server, routes, models
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  └─ server.js
├─ frontend/         # React application
│  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ styles/
│  │  └─ utils/
│  ├─ package.json
│  └─ tailwind.config.js
└─ README.md
```

---

## 💻 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 1. Clone the repository

```bash
git clone https://github.com/Ullash2401/disaster-management.git
cd disaster-management
```

### 2. Backend Setup

```bash
cd backend
npm install    # or yarn
```

Create a `.env` file in `backend/` with the following variables:

```
MONGO_URI=<your mongodb connection string>
JWT_SECRET=<secret for JWT tokens>
EMAIL_HOST=<smtp host>
EMAIL_PORT=<smtp port>
EMAIL_USER=<smtp user>
EMAIL_PASS=<smtp password>
```

Run the server:

```bash
npm start
```

The backend will listen on **http://localhost:5000** by default.

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install    # or yarn
```

Start the development server:

```bash
npm run dev
```

The React app will be available at **http://localhost:5173**.

> The frontend makes API calls to `http://localhost:5000/api` by default.

### 4. Build for Production

```bash
cd frontend
npm run build
# serve the `dist/` folder with any static host
```

For backend deployment, set the same environment variables and run `npm start` or use a process manager like PM2.

---

## 📝 Usage

1. Visit the home page to read about the platform.
2. Choose **Login** or continue as a guest from the choice screen.
3. Register a new account to access the dashboard and reporting features.
4. Administrators can manage user roles via the backend or a future admin UI.

> The **About** link is hidden when you're already on the Home or About page, per UX design.

---

## 📦 Dependencies

See `backend/package.json` and `frontend/package.json` for a full list of dependencies. Key packages include:

- `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `nodemailer`
- `react`, `react-router-dom`, `tailwindcss`, `vite`

---

## 📂 Folder-specific Style Guidelines

- Each **page** component in `src/pages` uses Tailwind utility classes; shared components live in `src/components`.
- Global CSS lives in `src/styles`; most pages are self-contained with inline Tailwind classes.

---

## 🤝 Contributing

Feel free to open issues or pull requests. Some areas for improvement:

- Add admin interface for role management
- Internationalization
- Unit and integration tests
- Real-time notifications via WebSocket

Please follow conventional commits or update this README with any new setup instructions.

---