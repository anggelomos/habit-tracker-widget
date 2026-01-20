# 🎯 Habit Tracker Widget

A modern, interactive habit tracking widget built with React, TypeScript, and Vite. Track your daily habits, build streaks, and visualize your progress with an intuitive interface.

## ✨ Features

- 📊 Track multiple habits with customizable tasks
- 🔥 Monitor your streaks and stay motivated
- 🎨 Clean, responsive UI with a modern design
- ⚡ Fast and lightweight React application
- 🔄 Real-time updates with React Compiler optimizations

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd habit-tracker-widget

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment to Vercel

Deploying your habit tracker to Vercel is quick and straightforward:

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy from your project directory:
```bash
vercel
```

3. Follow the prompts and your app will be live!

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Visit [vercel.com](https://vercel.com) and sign in

3. Click **"Add New Project"**

4. Import your repository

5. Configure your project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Click **"Deploy"** and wait for the build to complete

Your habit tracker will be live at `https://your-project-name.vercel.app`

### Environment Variables

If your app requires environment variables, add them in the Vercel dashboard under **Project Settings → Environment Variables** before deploying.

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **React Compiler** for automatic optimizations
- **ESLint** for code quality

## 📁 Project Structure

```
src/
├── components/      # React components organized by feature
├── context/         # React Context providers
├── assets/          # Static assets (images, icons)
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## 🤝 Contributing

Contributions are welcome! Please ensure you:
- Run `npm run lint` before committing
- Run `npm run build` to verify production builds
- Keep commits focused and well-described
