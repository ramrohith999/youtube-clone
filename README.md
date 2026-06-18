# 🎥 YouTube Clone

A full-stack YouTube Clone built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). Users can create channels, upload videos, like/dislike videos, comment on videos, and manage their own content.

## 🚀 Live Demo

Frontend: https://youtubeclone-alpha-jade.vercel.app/

Backend: https://youtube-clone-1wgh.onrender.com

---

## 📌 Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT Authentication
* Protected Routes
* Redux Authentication State Management

### Video Management

* Upload Videos
* Edit Videos
* Delete Videos
* View Videos
* Search Videos
* Filter Videos by Category
* Related Videos Section
* View Count Tracking

### Channel Management

* Create Channel
* View Channel Page
* Channel Banner
* Channel Description
* Channel Video Listing
* Automatic Video Upload to User's Channel

### Engagement Features

* Like Videos
* Dislike Videos
* Add Comments
* Edit Own Comments
* Delete Own Comments

### Authorization

* Users can only edit/delete their own videos
* Users can only edit/delete their own comments
* Guests cannot perform restricted actions

### User Interface

* Responsive Design
* Modern Layout
* Sidebar Navigation
* Sticky Header
* Category Filters
* Dark Mode
* Toast Notifications
* Loading States
* Route-Based Lazy Loading
* Footer Navigation
* Custom 404 Page

---

## 🏆 Key Highlights

* Full Stack MERN Application
* JWT Authentication & Protected Routes
* CRUD Operations for Videos, Comments, and Channels
* Redux Toolkit State Management
* Responsive Design with Tailwind CSS
* Production Deployment using Render and Vercel
* Route-Based Code Splitting using React.lazy() and Suspense
* Dark Mode Support
* Modern UI/UX Design

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* React Icons
* React Hot Toast
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

## 📂 Project Structure

```bash
youtube-clone/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── features/
│   │   ├── layouts/
│   │   └── utils/
│   │
│   └── public/
│
├── screenshots/
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/ramrohith999/youtube-clone.git
cd youtube-clone
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

Backend runs on:

```txt
http://localhost:5000
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Videos

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | /api/videos             |
| GET    | /api/videos/:id         |
| POST   | /api/videos             |
| PUT    | /api/videos/:id         |
| DELETE | /api/videos/:id         |
| PATCH  | /api/videos/:id/like    |
| PATCH  | /api/videos/:id/dislike |
| PATCH  | /api/videos/:id/view    |

### Comments

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | /api/comments/:videoId |
| POST   | /api/comments          |
| PUT    | /api/comments/:id      |
| DELETE | /api/comments/:id      |

### Channels

| Method | Endpoint                    |
| ------ | --------------------------- |
| POST   | /api/channels               |
| GET    | /api/channels/:id           |
| GET    | /api/channels/:id/videos    |
| GET    | /api/channels/owner/:userId |

---

## 📸 Screenshots

### Home Page

![Home](./screenshots/Home%20page.png)

### Video Player

![Video Player](./screenshots/video%20player%20page.png)

### Channel Page

![Channel](./screenshots/channel%20page.png)

### Upload Video

![Upload](./screenshots/upload%20video%20page.png)

### Create Channel

![Create Channel](./screenshots/create%20channel%20page.png)

----

## 👨‍💻 Author

**Ram Rohith Maringanti**

GitHub: https://github.com/ramrohith999

LinkedIn: https://www.linkedin.com/in/ram-rohith-maringanti-587b03138/

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
