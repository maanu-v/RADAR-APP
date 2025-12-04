# RADAR-APP: Multi-Agent Healthcare Monitoring Platform

A comprehensive healthcare monitoring system that simulates and processes sensor data (Thoracic Fusion, Biochem Patch, Smart Ring) using a multi-agent architecture to provide real-time clinical risk assessment.

## 🌟 Overview

This project implements a multi-agent healthcare monitoring platform using **Next.js**, **Prisma**, and **PostgreSQL**.

The system simulates three key data streams:
- **PPG Ring**: Updates every 1 second (SpO₂, Heart Rate).
- **Biochem Patch**: Generates voltage readings for Urea levels every 15 seconds (demo mode).
- **Bioimpedance Patch**: Sends ECW/TBW and Phase Angle data every 15 seconds (demo mode).

### How it Works
1. **Data Ingestion**: Raw sensor data is posted to `/api/vitals`.
2. **Processing**: Backend converts raw signals into medical features (mg/dL, ECW/TBW), assigns risk thresholds (GREEN–RED), and calculates trends.
3. **Multi-Agent Analysis**:
   - **Urea Agent**: Analyzes kidney stress.
   - **Fluid Agent**: Analyzes edema and fluid overload.
   - **PPG Agent**: Analyzes oxygenation and heart rhythm.
4. **Fusion Engine**: A Fusion Agent aggregates all agent outputs to determine a final unified clinical risk.
   - *Rule*: Any RED → Final RED.
   - *Rule*: Multiple ORANGEs → ORANGE.
   - *Rule*: Otherwise, highest severity prevails.
5. **Storage & UI**: Results are stored in PostgreSQL via Prisma and broadcasted to the Next.js dashboard for real-time visualization.

## 🚀 Features

- **Real-time Dashboard**: Live visualization of patient vitals and risk levels.
- **Multi-Agent System**: Intelligent reasoning for different physiological subsystems.
- **Role-Based Access**: Secure authentication for Doctors and Patients using **NextAuth.js**.
- **Data Visualization**: Interactive charts and trends using **Recharts**.
- **Dark Mode**: Fully supported UI with light/dark themes.
- **Sensor Simulation**: Built-in simulation for testing and demonstration.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://authjs.dev/) (v5)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: Lucide React

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (Local or Docker)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd radar_app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/radar_db"
   AUTH_SECRET="your-secure-random-string"
   ```

4. **Database Setup:**
   Push the schema to your database:
   ```bash
   pnpm prisma db push
   ```

5. **View Database:**
   Open Prisma Studio to view and manage your database:
   ```bash
   pnpm prisma studio
   ```

6. **Seed the Database:**
   Populate the database with initial data:
   ```bash
   pnpm tsx seed-db.ts
   ```

7. **Run the Development Server:**
   ```bash
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/app`: Next.js App Router pages and API routes.
- `/src/components`: Reusable UI components.
- `/prisma`: Database schema and migrations.
- `/public`: Static assets.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
