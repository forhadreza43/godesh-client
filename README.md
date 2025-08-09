# 🌍 Tourism Management System
<img src="https://i.ibb.co.com/0R0YrqNV/Screenshot-2025-08-07-213748.png" alt="Banner" width="100%" />
A full-stack **Tourism Management System** that connects tourists with tour guides through a streamlined booking and storytelling platform. The system supports **role-based access** for Admins, Tourists, and Guides, and includes features like booking management, payments (via Stripe), guide applications, story sharing, and more.

## 🚀 Live Site

🔗 [Visit Live Application](https://godesh-1ab55.web.app/)

---

## 👤 Roles and Features

### 🧳 Tourist (Default User)
- 🔍 Browse all travel **packages**
- 👨‍🏫 View **tour guides** and detailed guide profiles
- 📝 **Add travel stories** with images
- 📅 **Book a tour package**
- 💳 **Make payments** securely using **Stripe**
- 🧑‍💼 **Edit their own profile**
- 🧑‍🌾 Apply to become a **tour guide**

---

### 🧭 Guide
- 📝 Add and manage personal **stories**
- 📥 See all **assigned bookings** (once selected by a tourist)
  - ✅ Accept tour if status is "In Review"
  - ❌ Reject tour with confirmation
- 🧑‍💼 Edit their own profile

---

### 🛠️ Admin
- ➕ **Add new tour packages**
- ✅ **Approve or reject tour guide applications**
- 🗂️ Manage users and roles
- 📝 Review and approve stories
- 📈 View platform analytics

---

## 💻 Tech Stack

- **Frontend:** React, TailwindCSS, React Router, React Hook Form, Tanstack Query, Axios  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT + Custom Role-Based Middleware  
- **Payments:** Stripe  
- **Image Uploads:** Cloudinary  
- **UI Enhancements:** React Hot Toast, Reusable Modal Components  

---

## 🧪 Features Preview

- 🎯 Role-based dashboards (Admin / Tourist / Guide)
- 📄 Paginated and filtered list views
- 📷 Multi-image story upload & sharing (Facebook, X, WhatsApp)
- 📬 Email-based identity and session handling
- 🔒 Secure API access with `axiosSecure`

---

## 🛠️ Setup Instructions

> Make sure you have **Node.js**, **MongoDB**, and a `.env` file set up.

### 1. Clone the repository

```bash
git clone https://github.com/forhadreza43/godesh-client.git
cd godesh-client

```
