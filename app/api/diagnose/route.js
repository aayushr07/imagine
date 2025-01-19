export async function POST(req) {
  try {
    const {
      imageBase64,
      symptoms,
      age,
      weight,
      breed,
      vaccinationStatus,
      healthHistory,
    } = await req.json();

    // Validate inputs
    if (!imageBase64 || !symptoms || !age || !weight || !breed || !vaccinationStatus || !healthHistory) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    if (typeof age !== 'number' || typeof weight !== 'number') {
      return new Response(JSON.stringify({ error: 'Age and weight must be numbers' }), { status: 400 });
    }

    // Simulated image analysis results
    const simulatedResults = [
      { description: 'Healthy Animal', score: 0.95 },
      { description: 'Disease: Foot-and-mouth disease', score: 0.75 },
      { description: 'Disease: Rabies', score: 0.60 },
      { description: 'Disease: Bovine Tuberculosis', score: 0.50 },
      { description: 'Disease: Mastitis', score: 0.40 },
    ];

    // Additional data-based diagnostic logic
    let likelyDisease = 'Healthy Animal';

    if (symptoms?.toLowerCase().includes('blisters') || symptoms?.toLowerCase().includes('fever')) {
      likelyDisease = 'Foot-and-mouth disease';
    } else if (symptoms?.toLowerCase().includes('aggression') || symptoms?.toLowerCase().includes('saliva')) {
      likelyDisease = 'Rabies';
    } else if (symptoms?.toLowerCase().includes('cough') || symptoms?.toLowerCase().includes('weight loss')) {
      likelyDisease = 'Bovine Tuberculosis';
    } else if (symptoms?.toLowerCase().includes('swelling') || symptoms?.toLowerCase().includes('pain')) {
      likelyDisease = 'Mastitis';
    }

    if (vaccinationStatus?.toLowerCase() === 'not vaccinated' && likelyDisease === 'Healthy Animal') {
      likelyDisease = 'At risk of common diseases due to lack of vaccination';
    }

    if (healthHistory?.toLowerCase().includes('previous mastitis')) {
      likelyDisease = 'Mastitis (Recurrent case)';
    }

    // Build the analysis summary
    const analysisSummary = {
      symptoms,
      age,
      weight,
      breed,
      vaccinationStatus,
      healthHistory,
      likelyDisease,
    };

    // Simulated response
    const response = {
      responses: [
        {
          labelAnnotations: simulatedResults,
        },
      ],
      analysisSummary,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response(JSON.stringify({ error: 'Failed to process the request' }), { status: 500 });
  }
}
