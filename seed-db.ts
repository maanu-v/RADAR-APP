import 'dotenv/config'
import prisma from './src/lib/prisma'

async function main() {
  const email = process.argv[2]
  if (!email) {
    console.error("Please provide an email address: npx tsx seed-db.ts <email>")
    process.exit(1)
  }

  console.log(`Seeding data for ${email}...`)

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    console.error("User not found!")
    process.exit(1)
  }

  // Create Fusion Log
  const fusionLog = await prisma.fusionLog.create({
    data: {
      userId: user.id,
      finalRisk: "GREEN",
      summary: "Patient is stable. Kidney function markers are optimal. Fluid balance is well-maintained.",
      urgentActions: "None. Continue standard monitoring.",
      longTermAdvice: "Maintain current hydration levels and dietary restrictions."
    }
  })

  // Urea Reading
  await prisma.sensorReading.create({
    data: {
      userId: user.id,
      type: "BIOCHEM_PATCH",
      urea: 32.5,
      riskLevel: "GREEN",
      explanation: "Urea level is 32.5 mg/dL, which is within the healthy range (20-40).",
      trend: "stable",
      fusionLogId: fusionLog.id
    }
  })

  // Fluid Reading
  await prisma.sensorReading.create({
    data: {
      userId: user.id,
      type: "THORACIC_FUSION",
      ecw_tbw: 0.38,
      phase_angle: 5.8,
      riskLevel: "GREEN",
      explanation: "ECW/TBW ratio is 0.38, indicating normal hydration status.",
      trend: "stable",
      fusionLogId: fusionLog.id
    }
  })

  // Heart Rate / SpO2 (Smart Ring)
  await prisma.sensorReading.create({
    data: {
      userId: user.id,
      type: "SMART_RING",
      heartRate: 72,
      spo2: 98,
      riskLevel: "GREEN",
      explanation: "Heart rate and oxygen saturation are optimal.",
      trend: "stable",
      fusionLogId: fusionLog.id
    }
  })

  console.log("✅ Data seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
