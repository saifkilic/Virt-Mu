# 🏛️ Virt-Mu — Bilingual Virtual Museum Platform

Virt-Mu is an interactive, full-stack digital heritage platform designed to preserve, catalog, and showcase historical Pakistani artifacts. The application provides an immersive cultural learning experience across four major historical taxonomies—bridging antiquity with minimalist web design, seamless English and Urdu bilingual localization, and high-performance interactive galleries.

Developed as a modern alternative to traditional, static museum archives, Virt-Mu streamlines the exploration of South Asian antiquities through data-driven interfaces optimized for high-fidelity performance on desktop and mobile viewports.

---

## 🛠️ Technical Stack

### Frontend Architecture
- **Framework:** React 19 (TypeScript with strict `verbatimModuleSyntax`)
- **Build Tool:** Vite (Ultra-fast HMR and production bundling)
- **Styling:** Tailwind CSS v4 (Custom cultural color variables & fluid typography)
- **Routing:** React Router DOM v6 (Programmatic layout structures)
- **Icons:** Lucide React

### Backend Infrastructure
- **Runtime:** Node.js
- **Server:** Express
- **Database:** MongoDB (Mongoose ODM)
- **Asset Management:** Cloudinary API (Dynamic image transformation & delivery)

---

## 🎨 Design System

Virt-Mu follows **Editorial Minimalism**—centering visual content while establishing cultural weight through historical accents.

### Color Palette
| Color | Hex | Purpose |
|-------|-----|---------|
| Ground Tone | `#3E2723` | Deep timber brown (historical stability, antiquity) |
| Historical Gold | `#D4AF37` | Muted luxury gold (highlights, active states, borders) |
| Traditional Green | `#11814F` | Deep elegant green (depth, cultural resonance) |

### Typography
- **English:** Clean sans-serif layouts (LTR)
- **Urdu:** Balanced Nastaliq font scaling (RTL)

---

## 🚀 Core Features

### 1. Bilingual Interface (LTR/RTL)
- **Dynamic Runtime Orientation:** Seamless switching between English (LTR) and Urdu (RTL) without page reloads
- **Global Language Context:** User preferences cached via `localStorage` for instant persistence
- **Structural Reordering:** Navigation, sidebars, grids, and callouts adjust flex/block hierarchy based on directionality

### 2. High-Performance Galleries
- **Optimized Image Distribution:** Cloud-delivered assets via Cloudinary minimize rendering overhead
- **Fast Network Delivery:** High-resolution artifact details load instantly in standard browsers
- **Adaptive Breakpoints:** Fluid, container-based grid system transitions elegantly from desktop layouts to mobile swipe-and-tap lists

### 3. Engagement Telemetry
- **Progress Tracking:** Monitors unique artifacts inspected against total room count
- **Session Timer:** Active stopwatch component for per-hall user engagement
- **Atomic Metrics:** Background hooks using MongoDB `$inc` operations ensure non-blocking performance

### 4. Enterprise-Grade Schema
- **Relational Mapping:** Bridges users, museums, rooms, items, comments, and saved collections
- **Optimized Indexing:** Compound indices (`{ museumCode: 1, slug: 1 }`) ensure lightning-fast queries
- **Lean Queries:** Selective projection (`.select()`, `.lean()`) bypasses heavy document parsing on critical routes

---

## 🏛️ Supported Museums & Taxonomies

| Museum | Location | Era & Focus |
|--------|----------|-------------|
| **Lahore Museum** | Lahore | Mughal & Islamic artistry, royal decrees, calligraphic manuscripts, miniature paintings |
| **Taxila Museum** | Taxila | Gandhara & Buddhist civilizations, sculptural items, Hellenistic-Buddhist trade artifacts |
| **National Museum Karachi** | Karachi | Indus Valley & Islamic art, pottery, calligraphic panels, historical coins |
| **Mohenjo-daro Museum** | Sindh | Bronze Age civilization, architectural layouts, weight measures, signature seals |

---

## ⚡ Quick Start

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **MongoDB:** Local or remote instance (Atlas Cluster recommended)
- **Cloudinary:** Account with API credentials

### Phase 1: Environment Setup

**Backend** — Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/virtmu
JWT_SECRET=your_super_secure_random_hash_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Frontend** — Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Phase 2: Start Backend

```bash
cd backend
npm install
npm run dev
```

**Expected Output:**
```
[Database] MongoDB Connected Successfully
[Server] Running smoothly on port 5000
```

### Phase 3: Start Frontend

```bash
cd frontend
npm install
npm run dev
```

**Access:** Open `http://localhost:5173` in your browser

---

## 🔒 Security & Optimization

### Atomic Database Operations
- View engagement counters use MongoDB `$inc` operations
- Bypasses local variable read-write state loops for exact data alignment

### Query Optimization
- Selective field projection using `.select('titleUrdu titleEnglish images roomCode slug')`
- `.lean()` queries bypass document instantiation on read-heavy routes
- Reduces network bandwidth and eliminates parsing bottlenecks

### Token-Protected Routing
- Client data interactions pass structural tokens via Axios headers
- Underlying `auth.ts` verification script handles data access authorization

### Database Indexing Strategy
```typescript
// Compound index for fast museum + artifact lookups
ArtifactSchema.index({ museumCode: 1, slug: 1 }, { unique: true });
```

---

## 📁 Project Structure

```
virt-mu/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows TypeScript strict mode
- Bilingual content is properly localized
- Changes are tested on both desktop and mobile viewports

---

## 📝 License

[Add your license information here]

---

**Virt-Mu:** Preserving South Asian heritage through technology. 
