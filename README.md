# GoDesh - Tourism & Travel Platform

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10.0-FFCA28?logo=firebase)](https://firebase.google.com/)

A modern, feature-rich tourism and travel platform built with React that connects travelers with tour guides, packages, and travel experiences.

## 🚀 Features

### For Travelers

- **Browse Travel Packages** - Discover curated travel experiences and packages
- **Tour Guide Booking** - Connect with professional tour guides
- **Travel Stories** - Read and share travel experiences from fellow travelers
- **Travel Tips** - Access comprehensive travel guides and tips
- **Reviews & Ratings** - Make informed decisions with authentic reviews
- **Responsive Design** - Seamless experience across all devices

### For Tour Guides

- **Profile Management** - Create and manage professional profiles
- **Package Creation** - Design and offer custom travel packages
- **Booking Management** - Handle reservations and client communications
- **Earnings Tracking** - Monitor income and performance metrics

### For Administrators

- **User Management** - Oversee user accounts and permissions
- **Content Moderation** - Ensure quality and compliance
- **Analytics Dashboard** - Track platform performance and insights
- **Payment Processing** - Manage transactions and financial operations

## 🛠️ Tech Stack

### Frontend

- **React 19.1.0** - Modern React with latest features
- **Vite 7.0.0** - Fast build tool and development server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Flowbite React** - UI components built on Tailwind CSS

### State Management & Data Fetching

- **TanStack Query** - Server state management and caching
- **React Context** - Client-side state management
- **React Hook Form** - Form handling and validation

### UI/UX & Animations

- **GSAP** - Professional-grade animations
- **Lenis** - Smooth scrolling experience
- **Framer Motion** - React animation library
- **Material-UI** - Additional UI components
- **Lucide React** - Beautiful icon library

### Backend & Services

- **Firebase** - Authentication, database, and hosting
- **Cloudinary** - Image and media management
- **Stripe** - Payment processing and subscriptions

### Development Tools

- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **TypeScript Support** - Type checking and IntelliSense

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:

   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Available Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Start development server             |
| `npm run build`       | Build for production                 |
| `npm run preview`     | Preview production build             |
| `npm run lint`        | Run ESLint for code quality          |
| `npm run postinstall` | Post-installation setup for Flowbite |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components and routing
│   ├── dashboard/      # User dashboard pages
│   │   ├── Admin/      # Admin-specific features
│   │   ├── Guide/      # Tour guide features
│   │   ├── Tourist/    # Traveler features
│   │   └── Payment/    # Payment management
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── services/           # API and external service integrations
├── utils/              # Utility functions and helpers
├── assets/             # Static assets (images, icons)
├── Animation/          # Animation components and hooks
├── Layouts/            # Layout components
├── router/             # Routing configuration
└── firebase/           # Firebase configuration and utilities
```

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project
2. Enable Authentication, Firestore, and Storage
3. Configure security rules for your use case
4. Add your Firebase configuration to environment variables

### Cloudinary Setup

1. Create a Cloudinary account
2. Configure upload presets and transformations
3. Add your cloud name to environment variables

### Stripe Setup

1. Create a Stripe account
2. Configure webhook endpoints
3. Add your publishable key to environment variables

## 🚀 Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Other Platforms

The built application can be deployed to any static hosting service:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Ensure all tests pass before submitting
- Update documentation as needed



## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation and FAQs


---

**GoDesh** - Connecting travelers with extraordinary experiences worldwide.
