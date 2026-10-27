# CodeAlpha_SocialMedia 💬⚡

A full-stack Mini Social Media Platform built for the **CodeAlpha Full Stack Web Development Internship** (Task 2).

![Tech Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue)
![Deployment](https://img.shields.io/badge/Deployment-Vercel%20Ready-black)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Project Overview
**Pulse Social** is a responsive mini social networking application engineered according to the CodeAlpha internship specifications. It features real-time interaction, dynamic feeds, post composition with rich media and hashtags, follow/unfollow mechanisms, user profile management, interactive comments, and a RESTful Express.js backend ready for local running and Vercel serverless deployment.

### ✨ Implemented Features
- **User Profiles**:
  - Full profile pages with cover photos, avatars, bios, location badges, and join dates.
  - Live follower, following, and post counts.
  - Interactive profile editor (customize name, bio, location, and avatar).
- **Post Creation & Feed Management**:
  - Rich post composer with image URL attachment, hashtag taxonomy, and character counter.
  - Dual feed view: **"For You"** (Global community stream) and **"Following"** (Filtered stream of followed creators).
  - Relative time ago calculations (`5m ago`, `2h ago`).
- **Interactive Like & Follow System**:
  - Animated heart like button with instant counter updates.
  - Dynamic follow / unfollow toggle on profiles and the "Who to Follow" recommendation sidebar.
- **Comments & Conversations**:
  - Nested comment threads per post with author badge and relative timestamp.
  - Instant reply submission.
- **Search & Hashtag Discovery**:
  - Search bar to filter posts by keyword or author.
  - Trending hashtags widget (`#CodeAlpha`, `#WebDev`, `#FullStack`, etc.) with instant filter pill and clear toggle.
- **User Authentication**:
  - User registration and login modal with session persistence.
- **RESTful API Backend**:
  - `GET /api/posts` - Fetch posts (with filtering by following, tag, search query).
  - `POST /api/posts` - Create new post.
  - `POST /api/posts/:id/like` - Toggle like.
  - `POST /api/posts/:id/comments` - Add comment.
  - `GET /api/users` & `GET /api/users/:id` - Fetch users and detailed profile.
  - `POST /api/users/:id/follow` - Toggle follow/unfollow.
  - `PUT /api/users/:id` - Update user profile.
  - `POST /api/auth/login` & `POST /api/auth/register` - Authentication endpoints.

---

## 🛠️ Technology Stack
- **Frontend**: Semantic HTML5, Modern Responsive CSS3 (CSS Variables, Flexbox, CSS Grid), Vanilla JavaScript (ES6+ async/await, Fetch API)
- **Backend**: Node.js, Express.js
- **Database Layer**: In-memory + JSON store with localStorage synchronization for serverless persistence
- **Hosting / Deployment**: Configured for Vercel Serverless Functions (`vercel.json`)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/SelvaKailashS/CodeAlpha_SocialMedia.git
cd CodeAlpha_SocialMedia
npm install
```

### 2. Run the Application
```bash
npm start
```
Visit `http://localhost:5000` in your web browser.

---

## ☁️ Deploying to Vercel
This repository is pre-configured with `vercel.json` for zero-configuration deployment:
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Click **"Add New Project"** and select `CodeAlpha_SocialMedia`.
4. Click **Deploy**. Vercel will automatically build the static assets and serverless `/api` endpoints!

---

## 👨‍💻 Author
**Selva Kailash S**  
- GitHub: [@SelvaKailashS](https://github.com/SelvaKailashS)  
- Internship: CodeAlpha Full Stack Web Development
