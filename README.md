# 🌿 Nozomi Care Website

Welcome to the official repository for the **Nozomi Care** website. This is a modern, high-performance web application designed for professional healthcare services, built with a focus on user experience, internationalization, and smooth animations.

---

## 🚀 Quick Start

Get up and running in less than 2 minutes!

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Version 20.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [pnpm](https://pnpm.io/) / [yarn](https://yarnpkg.com/)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tombui99/nozomi-care-website.git
cd nozomi-care-website
npm install
```

### 3. Development

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the result! ⚡️

### 4. Seed the password administrator

Enable **Email/Password** under Firebase Console → Authentication → Sign-in method. Then provide a Firebase service-account key (or Application Default Credentials) and run:

```bash
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/service-account.json \
ADMIN_PASSWORD='Admin123!' \
npm run seed:admin
```

This creates or updates the single password account exposed by the website as username `admin@nozomicare.vn`. The script also creates the matching `admins/admin@nozomicare.vn` Firestore document. The password is deliberately supplied through an environment variable so it is never included in the browser bundle or committed to source control. Run the seed command again with a new value to rotate it.

---

## 🛠 Tech Stack

This project leverages the latest technologies for a premium web experience:

- **Frontend Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 7](https://vitejs.dev/) (Lightning fast builds)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (Utility-first CSS)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Silky smooth transitions)
- **Icons:** [Lucide React](https://lucide.dev/) (Clean, consistent iconography)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Internationalization:** [i18next](https://www.i18next.com/) (Supports 🇻🇳 Vietnamese, 🇺🇸 English, 🇯🇵 Japanese)
- **Backend & Hosting:** [Firebase](https://firebase.google.com/)

---

## ✨ Key Features

- **📱 Fully Responsive:** Optimized for Mobile, Tablet, and Desktop.
- **🌐 Multi-language Support:** Seamless switching between Vietnamese, English, and Japanese.
- **✨ Premium UI/UX:** Built with modern design principles, featuring glassmorphism and subtle micro-animations.
- **📰 News Management:** Integrated system for managing and displaying healthcare news.
- **🔥 Firebase Integration:** Ready for production deployment with Firebase Hosting.

---

## 📂 Project Structure

```text
src/
├── assets/         # Images, fonts, and static assets
├── components/     # Reusable React components (Header, Footer, Hero, etc.)
├── lib/            # Utility functions and shared logic
├── firebase.ts     # Firebase configuration and initialization
├── i18n.ts         # Internationalization setup (VN, EN, JP)
├── App.tsx         # Main application entry and routing
└── main.tsx        # React DOM mounting
```

---

## ☁️ Deployment

The project is configured for **Firebase Hosting**.

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Login to Firebase (if not already):**

   ```bash
   npx firebase-tools login
   ```

3. **Deploy to production:**

   ```bash
   npx firebase-tools deploy
   ```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by the Nozomi Care Team.
