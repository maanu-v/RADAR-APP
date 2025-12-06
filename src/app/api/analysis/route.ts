import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { sensorData } = await req.json();

    if (!sensorData) {
      return Response.json({ error: 'Sensor data is required' }, { status: 400 });
    }

    const { urea, fluid, spo2: ppg } = sensorData;

    const systemPrompt = `
    You are an expert Nephrologist and Critical Care AI Specialist.
    Analyze the following patient vitals:
    
    1. UREA: ${urea.risk} (Value: ${urea.value} ${urea.unit})
    2. FLUID (ECW/TBW): ${fluid.risk} (Value: ${fluid.value} ${fluid.unit}, Phase Angle: ${fluid.phaseAngle})
    3. PPG (SpO2): ${ppg.risk} (Value: ${ppg.value} ${ppg.unit})
    
    TASK:
    Generate a structured medical analysis in JSON format.
    
    The JSON object MUST have the following fields:
    - "diagnosis": A short, punchy title for the diagnosis (e.g., "Fluid Overload Detected").
    - "diagnosisDetail": A concise explanation of the findings (max 2 sentences).
    - "timeline": The recommended time window for action (e.g., "4-6 Hours", "Immediate", "24 Hours").
    - "timelineReason": A short reason for the timeline (e.g., "Risk of pulmonary edema increases significantly after 6 hours.").
    - "urgency": One of "High", "Medium", "Low".
    - "actions": An array of 3 specific, actionable steps (strings).

    Return ONLY the JSON object. Do not include any markdown formatting or extra text.
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: "Generate analysis." }
      ],
      model: 'llama-3.1-8b-instant',
      response_format: { type: 'json_object' }
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No content received from AI');
    }

    const analysis = JSON.parse(responseContent);

    return Response.json(analysis);

  } catch (error) {
    console.error('Error in analysis API:', error);
    return Response.json({ error: 'Failed to process analysis request' }, { status: 500 });
  }
}
