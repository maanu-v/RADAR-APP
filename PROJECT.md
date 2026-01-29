# RADAR: Renal Analytics & Dialysis Alert Response Ecosystem
## Project Evaluation & Status Report

### Team 1 - RADAR.AI
*   **Medical Team:** Piyush Mishra, Thijil Shivanand
*   **Engineering Team:** Vijay Santhosh, Kaniska, Manasa

---

## 1. Innovation and Novelty
**"Closing the Blind Spot in Renal Care"**
*   **The Paradigm Shift:** RADAR shifts the focus from **episodic, in-clinic monitoring** (during dialysis) to **continuous, inter-dialytic monitoring**. Current solutions leave patients vulnerable for 2-3 days between sessions; RADAR fills this critical gap.
*   **Hybrid AI Architecture:** Unlike standard "black box" AI models, RADAR employs a **Novel Hybrid Approach**:
    *   **Deterministic Layer:** Hard-coded, medically calibrated algorithms (Fusion Logic) ensure 100% reliable, explainable alerting for safety-critical thresholds (e.g., Potassium levels).
    *   **Generative Layer (LLM):** An integrated Large Language Model acts as the "Cognitive Interface," translating complex physiological data into empathetic, actionable advice for patients.
*   **Multi-Sensor Fusion:** Instead of relying on a single metric, RADAR synthesizes **Bioimpedance (Fluid)**, **ECG (Potassium/Heart)**, and **Biochemistry (Urea)** to create a holistic "Patient State" that is greater than the sum of its parts.

## 2. Clarity of Problem and Understanding of Healthcare Context
**"The Silent Killer: Inter-dialytic Crises"**
*   **The Persona:** The project is deeply rooted in the reality of patients like **Mr. Devaraj (68, CKD)**, who dismiss "mild shortness of breath" only to suffer a cardiac arrest from hyperkalemia days later.
*   **The Clinical Gap:** The team clearly identifies that standard vitals (BP/HR) fail to catch renal-specific killers like **Hyperkalemia** (high potassium) and **Fluid Overload** (pulmonary edema) until it is too late.
*   **Systemic Insight:** The report highlights the "Financial Drain" of reactive care—paying for ICU beds and emergency transport ("The Golden Hour")—versus the cost-efficiency of preventative home monitoring.

## 3. Technical Complexity and Execution
**"From Simulation to Synthesis"**
*   **Real-Time Simulation Engine:** The system features a robust backend (`src/lib/data-utils.ts`) that simulates complex physiological deterioration scenarios (Baseline → Escalation → Crisis) to validate the detection logic.
*   **Advanced Data Fusion:** The `calculateFusionScore` algorithm implements a weighted medical scoring system:
    *   *Heart Rate (30%) + Fluid (22%) + Urea (15%) + SpO2 (12%)*
    *   This demonstrates a nuanced understanding that "risk" is multivariate.
*   **LLM Integration (RAG-Lite):** The `api/chat/route.ts` implements a grounded generation pipeline. It injects the *exact* deterministic sensor values into the LLM's system prompt, preventing hallucinations while leveraging the model's reasoning capabilities to explain *why* the patient is deteriorating.
*   **Modern Stack:** Built on **Next.js 14**, utilizing Server Actions, real-time UI updates, and a responsive design suitable for both desktop and mobile (tele-health).

## 4. Relevance to Theme: AI in Healthcare
**"AI as the 'Always-On' Nephrologist"**
*   **Preventing Hallucinations:** The system addresses the biggest criticism of AI in health by strictly separating **Data Generation** (Deterministic) from **Data Interpretation** (LLM). The AI never "guesses" a potassium level; it only analyzes the provided fact.
*   **Clinical Reasoning:** The LLM is used effectively to connect disparate symptoms (e.g., "Your fluid is high AND your oxygen is dropping → This suggests fluid in the lungs").
*   **Empathy at Scale:** The AI chatbot provides 24/7 reassurance and guidance, reducing caregiver burnout and patient anxiety, a core tenet of patient-centered AI.

## 5. Potential for Impact
**"Saving Lives, Saving Costs"**
*   **Mortality Reduction:** By detecting Hyperkalemia (the "Silent Killer") early via ECG T-wave analysis and biochemical trends, RADAR can directly prevent fatal arrhythmias.
*   **Resource Optimization:** Reducing unnecessary ER visits for "false alarms" while ensuring critical cases get an ambulance immediately (The "Renal Triage" System).
*   **Rural Accessibility:** The "Tele-nephrology" aspect bridges the divide for patients in remote villages who cannot easily visit a dialysis center for a check-up.

## 6. Scalability and Practicality
**"A Platform, Not Just a Product"**
*   **Modular "Bio-Hub" Design:** The architecture is designed to accept inputs from various sensors (Smart Ring, Patches, BP Cuff). New sensors can be added without rewriting the core logic.
*   **Non-Invasive Focus:** By prioritizing wearable tech (Sweat patches, PPG rings) over implantables, the solution is significantly more affordable and patient-friendly, aiding adoption.
*   **Cross-Disease Potential:** The core "Monitoring + AI Triage" loop is applicable beyond Renal care to Heart Failure, COPD, and Post-operative monitoring.

## 7. Presentation and Communication
**"Visualizing the Invisible"**
*   **Intuitive Dashboard:** The UI uses a clear "Traffic Light" color system (Green/Yellow/Orange/Red) that is instantly understandable by non-medical users.
*   **Narrative-Driven:** The project effectively communicates the "Why" through the patient journey (Mr. Devaraj), making the technical solution emotionally resonant.
*   **Action-Oriented:** Every alert is paired with a specific action (e.g., "Schedule Dialysis Today," "Call EMS"), ensuring the data leads to decision-making.

---
