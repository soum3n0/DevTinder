
# DevTinder 💻❤️

DevTinder is a MERN stack-based web application that helps developers connect with like-minded individuals. Whether you're looking for collaborators, peers, or mentors, DevTinder is a platform for developers to meet and network through a swipe-based interface.

---

## 🌐 Live Demo

🚀 [Link to Live Site](#) — *(https://devtinder-frontend-2q0b.onrender.com/)*

---

## 📌 Features

- 🔐 **Authentication** — Secure login/signup using JWT and bcrypt.
- 🧑‍💻 **User Profiles** — Tailored profile setup including name, age, gender, skills, and bio.
- 🔄 **Simple Interface** — Like/Ignore functionality for discovering developers.
- 💬 **Real-Time Chat** — Instant messaging via Socket.IO after mutual connection.
- 🧾 **Connection Requests** — Manage incoming/outgoing connection requests.
- 🧭 **Feed Pagination** — Optimized user loading with infinite scroll and API pagination.
- 📸 **Profile Pictures** — Upload your avatar to personalize your developer card.

---

## ⚙️ Tech Stack

- **Frontend:** React, TailwindCSS, Redux Toolkit, React Router
- **Backend:** Node.js, Express.js, MongoDB
- **Real-time:** Socket.IO
- **Authentication:** JWT, bcrypt
- **Deployment:** Render.com

---

## 🔧 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/soum3n0/DevTinder.git
cd devTinder
```

2. **Install dependencies**

```bash
# For frontend
cd devTinder-UI
npm install

# For backend
cd ../devTinder-Backend
npm install
```

3. **Set up environment variables**

Create `.env` files for both frontend and backend.

**Backend `.env`**
```env
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_TOKEN_SECRET=your_jwt_secret
```

**Frontend `.env`**
```env
VITE_CLOUDINARY_API=your_api
```

4. **Start development servers**

```bash
# In /client
npm run dev

# In /server
npm run start
```

---

## 🔐 Developer Verification (Coming Soon)

Currently, DevTinder is tailored for developers through UI/UX and skill-based inputs. We plan to implement developer verification using:

- ✅ GitHub OAuth login
- ✅ Skill assessment or LinkedIn validation

---

## 📂 Folder Structure

```
devTinder/
├── devTinder-UI/           # React Frontend
│   └── ...
├── devTinder-Backend/           # Express Backend
│   └── ...
```

---

## 🤝 Contributing

Contributions are welcome! Open an issue or pull request to improve features or fix bugs.

---

## 🧑‍💻 Made with ❤️ for Developers
