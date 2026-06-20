# Virt-Mu — Bilingual Virtual Museum Platform

> ### ⚠️ Work in Progress (WIP)
> This project is currently under active development. The frontend layout templates, bilingual localization context, and routing structures are operational, while the production backend services and live API integrations are currently being wired up.

Virt-Mu is an interactive, full-stack digital heritage platform designed to preserve and showcase historical artifacts. The application provides an immersive cultural learning experience featuring seamless English and Urdu bilingual support, responsive viewports with dedicated 2D layouts for mobile devices, and spatial exploration mechanics.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React 19 with TypeScript (Strict `verbatimModuleSyntax` configuration)
* **Styling:** Tailwind CSS (Custom color design system including cultural accent tokens)
* **Routing:** React Router DOM v6
* **Icons:** Lucide React

### Backend
* **Runtime Environment:** Node.js
* **Framework:** Express
* **Database:** MongoDB via Mongoose Object Modeling

---

## 🚀 Key Features Implemented

* **Bilingual Translation Matrix:** Dynamic runtime language switching between English and right-to-left (RTL) Urdu layouts without page reloads.
* **Adaptive Viewport Canvas:** High-fidelity spatial interaction simulation for desktop viewports alongside an automated fluid 2D responsive grid fallback optimized for mobile devices.
* **Granular Exploration Metrics:** Live state tracking monitors visitor engagement by processing the count of unique artifacts inspected against the room total alongside an ongoing active session stopwatch.
* **Universal Desktop Navigation:** Accessible right-aligned navigation panel anchoring user persistence pathways across `/favorites` and `/profile` routes.
* **Strict Relational Schemas:** Optimized MongoDB collection blueprints detailing precise validation criteria for Users, Museums, Rooms, Artifacts, Favorites, and Comments.

---

## 📂 Project Architecture

```text
Virt-Mu/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI layout elements (Navbar, etc.)
│   │   ├── context/        # Global states (Language, Theme, Authentication)
│   │   ├── pages/          # Layout containers (Dashboard, MuseumView)
│   │   └── services/       # Client API endpoint network configurations
├── server/                 # Express backend application
│   └── src/
│       ├── models/         # Mongoose validation blueprint templates
│       ├── controllers/    # Request processing logic layers
│       └── routes/         # Network routing end-point bindings

