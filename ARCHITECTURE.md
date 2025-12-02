# 🏗️ Hybrid Architecture: Next.js + FastAPI

This document outlines the architecture for the Multi-Agent Healthcare Monitoring Platform. The system uses a **Hybrid Architecture** where **FastAPI** handles the heavy lifting (AI agents, data processing, fusion logic) and **Next.js** handles the presentation layer (UI, Dashboard, Real-time visualization).

---

## 📌 System Overview

| Component | Technology | Responsibility |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15** (React) | Dashboard UI, Real-time Graphs, User Interaction. |
| **Backend** | **FastAPI** (Python) | Sensor Ingestion, Risk Classification, LLM Agents, Fusion Logic, WebSockets. |
| **Database** | **PostgreSQL** (via Prisma) | Long-term storage of patient history (optional/parallel to in-memory state). |
| **AI Layer** | **Gemini / OpenAI** | Medical reasoning and risk assessment. |

---

## 1️⃣ Backend Architecture (FastAPI)

The backend is the "Brain" of the operation. It receives raw sensor data, processes it through a pipeline of logic and AI, and pushes the final decision to the frontend.

### **📂 File Structure**

```
backend/
├── app/
│   ├── main.py                 # Entry point, initializes FastAPI & WebSocket
│   ├── models.py               # Pydantic models for request/response validation
│   ├── state.py                # In-memory store for latest patient state
│   ├── agents/                 # AI Agent Logic
│   │   ├── urea_agent.py       # Urea Specialist Agent
│   │   ├── fluid_agent.py      # Fluid Specialist Agent
│   │   └── fusion_agent.py     # Fusion Agent (Final Decision Maker)
│   ├── logic/                  # Deterministic Medical Logic
│   │   ├── thresholds.py       # Risk classification rules (<40 Green, >150 Red, etc.)
│   │   ├── trends.py           # Trend calculation (Increasing/Decreasing)
│   │   └── fusion_rules.py     # Strict rules (Any RED -> RED)
│   ├── routers/                # API Endpoints
│   │   ├── vitals.py           # POST /vitals (Ingestion Pipeline)
│   │   └── dashboard.py        # GET /dashboard (Frontend Polling)
│   ├── websocket/              # Real-time Communication
│   │   └── notifier.py         # Manages active WebSocket connections
│   └── utils/
│       └── time.py             # Time formatting helpers
├── simulator/
│   └── simulate.py             # Script to generate dummy sensor data
└── requirements.txt            # Python dependencies
```

### **🔄 Data Processing Pipeline (The "Vitals" Flow)**

1.  **Ingestion**: `POST /vitals` receives raw JSON from the simulator.
2.  **Classification**:
    *   **Urea**: Mapped to Green/Blue/Yellow/Orange/Red based on mg/dL.
    *   **Fluid**: Mapped to risk based on ECW/TBW and Phase Angle.
3.  **Trend Analysis**: Compare current value vs. previous value in `state.py`.
4.  **Agent Reasoning (Parallel)**:
    *   `urea_agent`: Receives value + status + trend. Returns Risk + Reason.
    *   `fluid_agent`: Receives value + status + trend. Returns Risk + Reason.
5.  **Fusion (The Judge)**:
    *   `fusion_agent`: Receives outputs from both agents.
    *   **Deterministic Rules**: Applies strict overrides (e.g., "If any RED -> Final RED").
    *   **LLM Synthesis**: Generates a clinical summary and advice.
6.  **Broadcast**:
    *   Updates `state.py`.
    *   Pushes new state to all connected WebSockets.

---

## 2️⃣ Frontend Architecture (Next.js)

The frontend is the "Face" of the operation. It focuses on visualizing the complex data coming from the backend in a simple, digestible format.

### **📂 Key Components**

*   **`DashboardPage`**: The main container.
*   **`StatusCircle`**: A large, animated indicator of the current Fusion Risk (Green/Orange/Red).
*   **`LiveVitalsCard`**: Displays the raw numbers (Urea mg/dL, ECW/TBW) with small trend arrows.
*   **`AgentReasoning`**: Collapsible cards that show *why* the Urea/Fluid agent made their decision.
*   **`TrendGraph`**: Real-time line charts (using Recharts) showing the last 30 minutes of data.

### **🔌 Integration Points**

1.  **Initial Load**:
    *   `GET http://localhost:8000/dashboard?patient_id=P001`
    *   Populates the UI with the latest known state.
2.  **Real-Time Updates**:
    *   Connect to `ws://localhost:8000/ws`
    *   Listen for `update` events.
    *   Update State → Trigger React Re-render → Animate colors/graphs.

---

## 3️⃣ Implementation Roadmap

### **Phase 1: Backend Skeleton (FastAPI)**
*   [ ] Set up Python environment & install FastAPI/Uvicorn.
*   [ ] Create file structure.
*   [ ] Implement `models.py` (Pydantic schemas).
*   [ ] Implement `logic/thresholds.py` (The hard rules).

### **Phase 2: The Intelligence (Agents)**
*   [ ] Implement `agents/` with dummy returns first.
*   [ ] Connect `vitals.py` pipeline (Ingest -> Classify -> Agent -> Fusion).
*   [ ] Test with `simulate.py`.

### **Phase 3: Real-Time & Frontend**
*   [ ] Implement WebSocket in FastAPI.
*   [ ] Build Next.js Dashboard.
*   [ ] Connect Frontend to WebSocket.

### **Phase 4: Real AI**
*   [ ] Replace dummy agents with actual LLM calls (Gemini/OpenAI).
