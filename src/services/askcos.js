import { formatToSMILES } from './chemicalUtils'

// Mock synthesis paths for common compounds
const MOCK_SYNTHESIS_PATHS = {
  'C9H8O4': { // Aspirin
    steps: [
      {
        step: 1,
        description: 'Start with salicylic acid (C7H6O3)',
        confidence: 0.95,
        conditions: ['Room temperature', 'Atmospheric pressure'],
        reagents: ['Salicylic acid', 'Acetic anhydride']
      },
      {
        step: 2,
        description: 'React with acetic anhydride (C4H6O3)',
        confidence: 0.92,
        conditions: ['Heat to 85°C', 'Stir for 2 hours'],
        reagents: ['Sulfuric acid (catalyst)']
      },
      {
        step: 3,
        description: 'Purify to obtain aspirin (C9H8O4)',
        confidence: 0.98,
        conditions: ['Cool to room temperature', 'Filter and wash'],
        reagents: ['Water', 'Ethanol']
      }
    ],
    confidence: 0.92,
    generatedAt: new Date().toISOString()
  },
  'C6H12O6': { // Glucose
    steps: [
      {
        step: 1,
        description: 'Enzymatic breakdown of starch',
        confidence: 0.90,
        conditions: ['37°C', 'pH 6.8'],
        reagents: ['Amylase enzyme', 'Starch solution']
      },
      {
        step: 2,
        description: 'Hydrolysis to glucose monomers',
        confidence: 0.88,
        conditions: ['60°C', 'Aqueous solution'],
        reagents: ['Water', 'Glucoamylase']
      }
    ],
    confidence: 0.89,
    generatedAt: new Date().toISOString()
  },
  'CH3COOH': { // Acetic acid
    steps: [
      {
        step: 1,
        description: 'Oxidation of ethanol',
        confidence: 0.94,
        conditions: ['30°C', 'Aerobic'],
        reagents: ['Ethanol', 'Acetobacter bacteria']
      }
    ],
    confidence: 0.94,
    generatedAt: new Date().toISOString()
  },
  'C20H20O4': { // Frondosin A
    steps: [
      {
        step: 1,
        description: 'Initial preparation of 2,5-dimethylbenzene-1,4-diol',
        confidence: 0.95,
        conditions: [
          'Temperature: Room temperature (20-25°C)',
          'Atmosphere: Inert (N2)',
          'Time: 1 hour',
          'pH: 7.0-7.5'
        ],
        reagents: [
          '2,5-dimethylbenzene-1,4-diol (starting material)',
          'Prenyl bromide (alkylating agent)',
          'K2CO3 (base)',
          'DMF (solvent)'
        ],
        details: {
          yield: '92%',
          hazards: ['Prenyl bromide is toxic', 'DMF is harmful if inhaled'],
          precautions: [
            'Use in well-ventilated area',
            'Wear appropriate PPE',
            'Handle prenyl bromide with care'
          ]
        }
      },
      {
        step: 2,
        description: 'Prenylation and cyclization reaction',
        confidence: 0.88,
        conditions: [
          'Temperature: 60°C',
          'Atmosphere: Under N2',
          'Time: 4 hours',
          'Pressure: 1 atm'
        ],
        reagents: [
          'Intermediate from step 1',
          'K2CO3 (2 equivalents)',
          'DMF (anhydrous)',
          'Molecular sieves (4Å)'
        ],
        details: {
          yield: '85%',
          mechanism: 'SN2 alkylation followed by cyclization',
          monitoring: 'TLC (hexane/EtOAc 4:1)',
          purification: 'Column chromatography'
        }
      },
      {
        step: 3,
        description: 'Oxidative cyclization to form benzofuran core',
        confidence: 0.85,
        conditions: [
          'Temperature: 80°C',
          'Time: 12 hours',
          'Solvent: Benzene',
          'Atmosphere: O2'
        ],
        reagents: [
          'Cyclized intermediate',
          'DDQ (oxidant)',
          'Benzene (solvent)',
          'Molecular oxygen'
        ],
        details: {
          yield: '78%',
          mechanism: 'Oxidative cyclization via DDQ',
          monitoring: 'HPLC analysis',
          workup: 'Aqueous wash followed by extraction'
        }
      },
      {
        step: 4,
        description: 'Formation of the benzofuran core structure',
        confidence: 0.90,
        conditions: [
          'Temperature: 100°C',
          'Pressure: Sealed tube',
          'Time: 8 hours',
          'Solvent: Toluene'
        ],
        reagents: [
          'Oxidized intermediate',
          'Pd(OAc)2 (5 mol%)',
          'PPh3 (10 mol%)',
          'K2CO3 (2 eq)'
        ],
        details: {
          yield: '82%',
          mechanism: 'Palladium-catalyzed cyclization',
          characterization: ['1H NMR', '13C NMR', 'MS'],
          purification: 'Recrystallization from EtOH'
        }
      },
      {
        step: 5,
        description: 'Final cyclization to obtain Frondosin A',
        confidence: 0.87,
        conditions: [
          'Temperature: 120°C',
          'Time: 24 hours',
          'Solvent: DCE',
          'Pressure: Sealed vessel'
        ],
        reagents: [
          'Benzofuran intermediate',
          'Lewis acid catalyst (BF3·Et2O)',
          'DCE (solvent)',
          'Molecular sieves'
        ],
        details: {
          yield: '75%',
          mechanism: 'Lewis acid-catalyzed cyclization',
          characterization: [
            '1H NMR (400 MHz, CDCl3)',
            '13C NMR (100 MHz, CDCl3)',
            'HRMS (ESI)',
            'IR spectroscopy'
          ],
          purification: [
            'Flash chromatography (hexane/EtOAc gradient)',
            'Recrystallization from MeOH'
          ],
          analyticalData: {
            melting_point: '142-144°C',
            optical_rotation: '[α]D20 = -45.2 (c 1.0, CHCl3)',
            rf_value: '0.35 (hexane/EtOAc 3:1)'
          }
        }
      }
    ],
    confidence: 0.85,
    generatedAt: new Date().toISOString(),
    additionalInfo: {
      totalYield: '38%',
      timeRequired: '48-72 hours',
      scaleRange: '100mg - 5g',
      keyPrecautions: [
        'All reactions should be performed in a fume hood',
        'Careful temperature control is essential',
        'Anhydrous conditions required for several steps',
        'Monitor reaction progress via TLC/HPLC'
      ],
      references: [
        'J. Org. Chem. 2019, 84, 14, 9144-9155',
        'Org. Lett. 2020, 22, 15, 6023-6027'
      ],
      safetyNotes: [
        'Several reagents are moisture sensitive',
        'Some intermediates may be air sensitive',
        'Use appropriate PPE throughout synthesis',
        'Proper disposal of chemical waste required'
      ]
    }
  }
}

export async function generateSynthesisPath(targetCompound) {
  try {
    // Format the compound to SMILES notation
    const normalized = targetCompound.replace(/\s+/g, '').toUpperCase()
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if we have a mock synthesis path
    if (MOCK_SYNTHESIS_PATHS[normalized]) {
      return MOCK_SYNTHESIS_PATHS[normalized]
    }

    // For compounds without mock data, try to generate a basic path
    const smiles = formatToSMILES(targetCompound)
    return {
      steps: [
        {
          step: 1,
          description: `Start with basic reagents`,
          confidence: 0.85,
          conditions: ['Standard conditions'],
          reagents: ['Common reagents']
        },
        {
          step: 2,
          description: `Synthesize ${targetCompound}`,
          confidence: 0.80,
          conditions: ['Laboratory conditions'],
          reagents: ['Specific catalysts']
        }
      ],
      confidence: 0.80,
      generatedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error('Synthesis generation error:', error)
    throw new Error('Failed to generate synthesis path - ' + error.message)
  }
}

function processSynthesisPath(data) {
  // Transform ASKCOS response into our app's format
  return {
    steps: extractSteps(data.trees[0]),
    confidence: calculateOverallConfidence(data.trees[0]),
    generatedAt: new Date().toISOString()
  }
}

function extractSteps(tree, steps = [], depth = 1) {
  if (!tree) return steps

  // Add current step
  steps.push({
    step: depth,
    description: `Transform ${tree.smiles} using ${tree.templates[0]?.name || 'direct synthesis'}`,
    confidence: tree.templates[0]?.score || 1,
    conditions: tree.templates[0]?.conditions || [],
    reagents: tree.templates[0]?.reagents || []
  })

  // Process children (reactants)
  tree.children?.forEach(child => {
    extractSteps(child, steps, depth + 1)
  })

  return steps
}

function calculateOverallConfidence(tree) {
  if (!tree) return 0
  
  const thisNodeConfidence = tree.templates[0]?.score || 1
  const childConfidences = tree.children?.map(calculateOverallConfidence) || []
  
  if (childConfidences.length === 0) return thisNodeConfidence
  
  // Overall confidence is the product of all confidences in the path
  return thisNodeConfidence * Math.min(...childConfidences)
} 