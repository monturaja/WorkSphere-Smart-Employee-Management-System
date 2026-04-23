# 🚀 WorkSphere | Smart Employee Management System

**WorkSphere** is a premium, high-performance Employee Management System (EMS) designed with a modern **Glassmorphism** aesthetic. It provides a comprehensive suite of tools for workforce oversight, administrative governance, and employee self-service.

![WorkSphere Banner](public/next.svg) <!-- Replace with a real screenshot later -->

## ✨ Key Features

- **🛡️ Role-Based Access Control (RBAC)**: Distinct, personalized dashboards for **Admins**, **HR**, and **Employees**.
- **📊 Real-time Analytics**: High-level personnel verification and activity logistics for decision-makers.
- **💼 Workforce Management**: Centralized employee directory, dynamic department provisioning, and recruitment tools.
- **🕒 Attendance & Leave Matrix**: Automated chronological verification of check-ins and absence request management.
- **💰 Fiscal Oversight**: Complete payroll history and financial disbursement tracking.
- **📱 Responsive UI/UX**: Mobile-first design that scales seamlessly from smartphones to 4K desktops.
- **✨ Premium Aesthetics**: Dark-themed glassmorphism with vibrant gradients and hardware-accelerated animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Turbopack)
- **Design**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Auth**: [Next-Auth](https://next-auth.js.org/) (Secure JWT-based portals)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Custom Tailwind keyframes & transitions

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/monturaja/WorkSphere-Smart-Employee-Management-System.git
cd WorkSphere-Smart-Employee-Management-System
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Launch Development Environment
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to see the system in action.

## 🚢 Deployment

The project is optimized for deployment on the **Vercel Platform**. Ensure all environment variables are configured in the Vercel dashboard during the import process.

## 📜 License
Produced under the MIT License. Built with passion for excellence in workforce management.
