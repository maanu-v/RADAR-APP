export const dynamic = 'force-dynamic';

import { 
  generatePatientData, 
  calculateFusionScore, 
  generateFusionOutput 
} from '@/lib/data-utils';

export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const startTime = Date.now();
      let lastHrUpdate = 0;
      let lastUreaUpdate = 0;
      
      // Initialize with baseline data
      let currentData = generatePatientData(0);

      const sendData = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        // Get the "ideal" data for this exact moment in the simulation
        const simulatedSnapshot = generatePatientData(elapsed);
        let updated = false;

        // Update HR & SpO2 every 3 seconds
        if (elapsed - lastHrUpdate >= 3000) {
          currentData.heartRate = simulatedSnapshot.heartRate;
          currentData.spo2 = simulatedSnapshot.spo2;
          lastHrUpdate = elapsed;
          updated = true;
        }

        // Update Urea & Fluid every 15 seconds
        if (elapsed - lastUreaUpdate >= 15000) {
          currentData.urea = simulatedSnapshot.urea;
          currentData.fluid = simulatedSnapshot.fluid;
          lastUreaUpdate = elapsed;
          updated = true;
        }

        // If any parameter updated, re-calculate fusion to ensure consistency
        if (updated) {
          const fusionScore = calculateFusionScore(
            currentData.urea.risk, 
            currentData.fluid.risk, 
            currentData.heartRate.risk, 
            currentData.spo2.risk
          );
          
          currentData.fusion = generateFusionOutput(
            fusionScore,
            currentData.urea.risk,
            currentData.fluid.risk,
            currentData.heartRate.risk,
            currentData.spo2.risk
          );
        }

        const message = `data: ${JSON.stringify(currentData)}\n\n`;
        controller.enqueue(encoder.encode(message));
      };

      // Send initial data immediately
      sendData();

      // Check for updates every 1 second
      const intervalId = setInterval(sendData, 1000);

      // Clean up interval when stream closes
      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
