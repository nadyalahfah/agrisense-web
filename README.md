# AgriSense - Instant Rice Disease Detection & Smart Farming Assistant

AgriSense is a web-based AI assistant designed to help smallholder farmers and extension officers detect 10 types of rice diseases instantly, calculate economic losses in Rupiah, warn of weather-driven fungal risks, and connect to agricultural experts.

This project was developed for the FunDev<> International Competition 2026, directly supporting SDG 2: Zero Hunger and SDG 12: Responsible Consumption and Production.

- **Live Demo:** https://agrisense-web-ten.vercel.app/
- **Product Demo Video:** https://youtu.be/2mCexba68q0

## The Problem

Every diseased leaf is a harvest at risk.

- **37.2% estimated rice yield loss** from combined pest injuries and weeds in tropical Asia.
- **60M+ people faced hunger worldwide in 2024**, highlighting the urgent need for stronger food security.
- **Look-alike symptoms:** Leaf blast, brown spot, and bacterial blight are incredibly hard to tell apart by eye.
- **Thin expert coverage:** About 47,600 extension workers serve roughly 75,000 agricultural villages (approximately 0.6 per village).

**The Gap:** Farmers lack an instant, affordable, expert-grade diagnosis at the moment it matters most.

## The Solution

From leaf photo to informed farming decisions, in seconds.

AgriSense replaces delayed manual scouting and expensive cloud AI apps with a local-first, end-to-end workflow:

1. **Capture:** Upload a rice leaf photo from any phone.
2. **Detect:** MobileNetV2 on TensorFlow.js runs on-device inference.
3. **Diagnose:** Get the disease class with a confidence score.
4. **Decide:** View financial loss in Rupiah, weather risk, care schedule, and a direct link to TANIA (Ministry of Agriculture).

### Core Features

- **AI-Powered Detection:** 10 rice disease classes with on-device inference (no image upload for prediction).
- **Economic Impact:** Potential loss estimated in Rupiah based on land area and yield.
- **Weather Warnings:** Open-Meteo API alerts for fungal disease risks.
- **Care Scheduler:** Automated 14-day reminders with daily web notifications.
- **Disease WebGIS:** Community disease map with CSV export for extension offices.
- **Expert Consultation (TANIA):** Direct WhatsApp link with prefilled diagnosis to the Ministry's digital assistant.
- **Accessibility:** Bilingual UI (ID/EN), Dark Mode, and an Offline Emergency Guide.

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | React.js, Vite, Tailwind CSS |
| Machine Learning | TensorFlow.js, MobileNetV2 (CNN) |
| Database & Auth | Supabase PostgreSQL, Supabase Auth, Supabase Storage |
| Maps | React-Leaflet, OpenStreetMap |
| Weather Data | Open-Meteo API |
| Deployment | Vercel (CI/CD from GitHub) |

## Local Development Guide

Follow these steps to run AgriSense on your local computer.

### 1. Clone the Repository

Ensure Git is installed, then run the following commands in your terminal:

```bash
git clone https://github.com/nadyalahfah/agrisense-web.git
cd agrisense-web
```

### 2. Install Dependencies

Ensure Node.js is installed, then run:

```bash
npm install
```

### 3. Set Up Environment Variables & Supabase

Create a file named .env in the project's root folder, then add the following configuration:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Important: Never include the service_role key or secret key in your frontend code.

Supabase Setup Requirements:
- Database Tables:
  - detections (columns: id, label, confidence, thumbnail, latitude, longitude, user_id, created_at).
  - reminders (columns: id, detection_id, title, is_completed, due_date, created_at).
- Storage: Create a public bucket named detections to store history photos.

### 4. Run the Application

Run the development server with the following command:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 5. Update the Project on GitHub and Vercel

After making changes to the code, run the following commands to upload changes to GitHub:

```bash
git add .
git commit -m "Update fitur AgriSense"
git push origin main
```

Pushing to the connected branch will automatically trigger the deployment process on Vercel.


## Team Profile & Contact

Proyek ini dikembangkan oleh tim mahasiswa untuk **FunDev<> International Competition 2026**.

- **Nadya Lahfah** — Frontend Developer & UI/UX Designer
- **Elaine Keisha M. Pasaribu** — Machine Learning Engineer & Data Scientist


## Impact & Sustainable Development Goals (SDGs)

AgriSense aims to protect rice yields by catching diseases early and cut crop waste with precise, timely treatment decisions.
- **SDG 2 (Zero Hunger):** Supporting food security through early disease detection and crop protection.
- **SDG 12 (Responsible Consumption and Production):** Encouraging precise plant care decisions and responsible resource use.


## Pilot Targets (Proposed)

- 3+ farmer groups onboarded.
- 90%+ diagnostic accuracy on field images.
- Less than 1 minute photo-to-decision time.
- 100% on-device image privacy.

---

© 2026 AgriSense. All Rights Reserved.
