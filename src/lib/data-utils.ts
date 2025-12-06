export const dynamic = 'force-dynamic';

// --- Classification Logic ---

export const classifyUrea = (val: number): string => {
  if (val >= 20 && val <= 40) return "GREEN";
  if (val >= 41 && val <= 80) return "BLUE";
  if (val >= 81 && val <= 100) return "YELLOW";
  if (val >= 101 && val <= 150) return "ORANGE";
  if (val > 150) return "RED";
  return "GREEN"; // < 20
};

export const classifyFluid = (ecw: number, pa: number): string => {
  if (pa < 4.5) return "RED";
  if (ecw >= 0.49) return "RED";
  if (ecw < 0.39 && pa > 6.8) return "GREEN";
  if (ecw >= 0.46 && ecw <= 0.48) return "ORANGE";
  if (ecw >= 0.43 && ecw <= 0.45) return "YELLOW";
  if (ecw >= 0.39 && ecw <= 0.42) return "BLUE";
  return "BLUE"; // Default
};

export const classifyHeartRate = (val: number): string => {
  if (val >= 60 && val <= 100) return "GREEN";
  if ((val >= 101 && val <= 120) || (val >= 41 && val <= 59)) return "BLUE";
  if (val >= 121 && val <= 140) return "YELLOW";
  if (val < 30) return "RED";
  if (val > 140 || val < 40) return "ORANGE";
  return "GREEN";
};

export const classifySpo2 = (val: number): string => {
  if (val > 95) return "GREEN";
  if (val >= 92 && val <= 94) return "BLUE";
  if (val >= 90 && val <= 91) return "YELLOW";
  if (val >= 85 && val < 90) return "ORANGE";
  return "RED"; // < 85
};

// --- Styling Logic ---

export const getStyles = (status: string) => {
  switch (status) {
    case "GREEN":
      return { color: "text-emerald-600", bg: "bg-emerald-50", bar: "bg-emerald-500", badge: "Normal", badgeColor: "bg-emerald-50 text-emerald-600" };
    case "BLUE":
      return { color: "text-blue-600", bg: "bg-blue-50", bar: "bg-blue-500", badge: "Advisory", badgeColor: "bg-blue-50 text-blue-600" };
    case "YELLOW":
      return { color: "text-yellow-600", bg: "bg-yellow-50", bar: "bg-yellow-500", badge: "Warning", badgeColor: "bg-yellow-50 text-yellow-600" };
    case "ORANGE":
      return { color: "text-orange-600", bg: "bg-orange-50", bar: "bg-orange-500", badge: "Urgent", badgeColor: "bg-orange-50 text-orange-600" };
    case "RED":
      return { color: "text-red-600", bg: "bg-red-50", bar: "bg-red-500", badge: "Critical", badgeColor: "bg-red-50 text-red-600" };
    default:
      return { color: "text-slate-600", bg: "bg-slate-50", bar: "bg-slate-500", badge: "Unknown", badgeColor: "bg-slate-50 text-slate-600" };
  }
};

// --- Fusion Logic ---

const SEVERITY_MAP: Record<string, number> = {
  "GREEN": 0,
  "BLUE": 1,
  "YELLOW": 2,
  "ORANGE": 3,
  "RED": 4
};

const REVERSE_SEVERITY_MAP: Record<number, string> = {
  0: "GREEN",
  1: "BLUE",
  2: "YELLOW",
  3: "ORANGE",
  4: "RED"
};

export const getSeverity = (risk: string): number => SEVERITY_MAP[risk] || 0;

export const fuseRisks = (ureaRisk: string, fluidRisk: string, ppgRisk: string): string => {
  const sUrea = getSeverity(ureaRisk);
  const sFluid = getSeverity(fluidRisk);
  const sPpg = getSeverity(ppgRisk);

  // If any RED -> final RED
  if (ureaRisk === "RED" || fluidRisk === "RED" || ppgRisk === "RED") return "RED";

  // Else if any two ORANGE -> ORANGE
  const risks = [ureaRisk, fluidRisk, ppgRisk];
  const orangeCount = risks.filter(r => r === "ORANGE").length;
  if (orangeCount >= 2) return "ORANGE";

  // Else if ORANGE + YELLOW -> ORANGE
  if (orangeCount >= 1 && risks.includes("YELLOW")) return "ORANGE";

  // Else if any two YELLOW -> YELLOW
  const yellowCount = risks.filter(r => r === "YELLOW").length;
  if (yellowCount >= 2) return "YELLOW";

  // Else if all BLUE -> BLUE
  if (ureaRisk === "BLUE" && fluidRisk === "BLUE" && ppgRisk === "BLUE") return "BLUE";

  // Else if all GREEN -> GREEN
  if (ureaRisk === "GREEN" && fluidRisk === "GREEN" && ppgRisk === "GREEN") return "GREEN";

  // Else -> highest severity among the three
  return REVERSE_SEVERITY_MAP[Math.max(sUrea, sFluid, sPpg)] || "GREEN";
};

export const generateFusionOutput = (finalRisk: string, ureaRisk: string, fluidRisk: string, ppgRisk: string) => {
  let summary = `Fused analysis based on Urea (${ureaRisk}), Fluid (${fluidRisk}), and SPO2 (${ppgRisk}).`;
  let urgentActions = "Continue monitoring all vitals.";
  let longTermAdvice = "Maintain healthy lifestyle and regular checkups.";

  if (finalRisk === "RED") {
    summary = "CRITICAL: Immediate attention required due to high risk indicators.";
    urgentActions = "Alert medical staff immediately. Check hydration and kidney function.";
  } else if (finalRisk === "ORANGE") {
    summary = "WARNING: Elevated risk detected.";
    urgentActions = "Consult nephrologist. Monitor fluid intake closely.";
  } else if (finalRisk === "YELLOW") {
    summary = "CAUTION: Moderate risk indicators present.";
    urgentActions = "Schedule follow-up. Review diet and medication.";
  }

  // Styles for the fusion card
  let styles = {
    borderColor: "border-emerald-500",
    gradient: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-700",
    badge: "Normal",
    iconColor: "text-white"
  };

  if (finalRisk === "RED") {
    styles = { borderColor: "border-red-600", gradient: "from-red-600 to-rose-700", textColor: "text-red-700", badge: "Critical", iconColor: "text-white" };
  } else if (finalRisk === "ORANGE") {
    styles = { borderColor: "border-orange-500", gradient: "from-orange-500 to-amber-600", textColor: "text-orange-700", badge: "Urgent", iconColor: "text-white" };
  } else if (finalRisk === "YELLOW") {
    styles = { borderColor: "border-yellow-500", gradient: "from-yellow-400 to-amber-500", textColor: "text-yellow-700", badge: "Warning", iconColor: "text-white" };
  } else if (finalRisk === "BLUE") {
    styles = { borderColor: "border-blue-500", gradient: "from-blue-500 to-cyan-600", textColor: "text-blue-700", badge: "Advisory", iconColor: "text-white" };
  }

  return { finalRisk, summary, urgentActions, longTermAdvice, styles };
};

export const generatePatientData = () => {
    // Generate Random Data
    const ureaVal = Math.floor(Math.random() * (160 - 15) + 15);
    const fluidVal = parseFloat((Math.random() * (0.6 - 0.3) + 0.3).toFixed(2));
    const phaseAngleVal = parseFloat((Math.random() * (10.0 - 3.0) + 3.0).toFixed(1));
    const heartRateVal = Math.floor(Math.random() * (150 - 30) + 30);
    const spo2Val = Math.floor(Math.random() * (100 - 80) + 80);

    // Classify
    const ureaRisk = classifyUrea(ureaVal);
    const fluidRisk = classifyFluid(fluidVal, phaseAngleVal);
    const hrRisk = classifyHeartRate(heartRateVal);
    const spo2Risk = classifySpo2(spo2Val);

    // Fuse
    const fusion = generateFusionOutput(
      fuseRisks(ureaRisk, fluidRisk, spo2Risk), // Using SPO2 as PPG equivalent
      ureaRisk,
      fluidRisk,
      spo2Risk
    );

    // Construct Response
    return {
      urea: {
        value: ureaVal,
        unit: "mg/dL",
        status: ureaRisk,
        risk: ureaRisk, // Alias for chat prompt
        reason: `Value ${ureaVal} is in ${ureaRisk} range`, // Simple reason for chat
        styles: getStyles(ureaRisk)
      },
      fluid: {
        value: fluidVal,
        unit: "ECW/TBW",
        phaseAngle: phaseAngleVal,
        status: fluidRisk,
        risk: fluidRisk, // Alias for chat prompt
        reason: `ECW/TBW ${fluidVal} with Phase Angle ${phaseAngleVal} indicates ${fluidRisk}`, // Simple reason
        styles: getStyles(fluidRisk)
      },
      heartRate: {
        value: heartRateVal,
        unit: "bpm",
        status: hrRisk,
        styles: getStyles(hrRisk)
      },
      spo2: {
        value: spo2Val,
        unit: "%",
        status: spo2Risk,
        risk: spo2Risk, // Alias for chat prompt
        reason: `SPO2 ${spo2Val}% is ${spo2Risk}`, // Simple reason
        styles: getStyles(spo2Risk)
      },
      fusion: fusion
    };
}
