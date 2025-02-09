// Common chemical formulas and their SMILES notation
const COMMON_COMPOUNDS = {
  // Natural Products
  'C20H20O4': 'CC1=CC2=C(C=C1O)OC1=C2C(=O)C=C2C(C)(C)CCC(=O)C21', // Frondosin A
  'C21H20O6': 'COc1ccc2c(c1)C(=O)C1=C(O2)C(=O)CC(O)(CC1)C(C)=O', // Usnic acid
  'C15H10O7': 'O=c1c(O)c(-c2ccc(O)c(O)c2)oc2cc(O)cc(O)c12', // Quercetin

  // Common Pharmaceuticals
  'C9H8O4': 'CC(=O)OC1=CC=CC=C1C(=O)O',  // Aspirin
  'C8H9NO2': 'CC(=O)NC1=CC=C(O)C=C1',     // Paracetamol
  'C17H19NO3': 'CN1CC(C=C2C=C(OC)C(=O)C=C2)C2=C(C1)C=C(OC)C(=O)C=2', // Codeine
  'C8H11NO2': 'CNC[C@H](O)C1=CC=C(O)C=C1', // Epinephrine

  // Basic Organic Compounds
  'CH3COOH': 'CC(=O)O',     // Acetic acid
  'C2H5OH': 'CCO',          // Ethanol
  'CH3OH': 'CO',            // Methanol
  'C6H6': 'c1ccccc1',       // Benzene
  'C6H12O6': 'C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O', // Glucose
  
  // Simple Inorganic Compounds
  'NH3': 'N',               // Ammonia
  'H2O': 'O',               // Water
  'CH4': 'C',               // Methane
  'CO2': 'O=C=O',          // Carbon dioxide
  'HCl': 'Cl',             // Hydrochloric acid
  
  // Alternative Names
  'FRONDOSIN_A': 'CC1=CC2=C(C=C1O)OC1=C2C(=O)C=C2C(C)(C)CCC(=O)C21',
  'ASPIRIN': 'CC(=O)OC1=CC=CC=C1C(=O)O',
  'GLUCOSE': 'C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O'
}

// Common names and their formulas
const COMPOUND_NAMES = {
  // Natural Products
  'C20H20O4': 'Frondosin A',
  'C21H20O6': 'Usnic acid',
  'C15H10O7': 'Quercetin',

  // Pharmaceuticals
  'C9H8O4': 'Aspirin',
  'C8H9NO2': 'Paracetamol',
  'C17H19NO3': 'Codeine',
  'C8H11NO2': 'Epinephrine',

  // Basic Organic Compounds
  'CH3COOH': 'Acetic acid',
  'C2H5OH': 'Ethanol',
  'CH3OH': 'Methanol',
  'C6H6': 'Benzene',
  'C6H12O6': 'Glucose',

  // Simple Inorganic
  'NH3': 'Ammonia',
  'H2O': 'Water',
  'CH4': 'Methane',
  'CO2': 'Carbon dioxide',
  'HCl': 'Hydrochloric acid',

  // Alternative Names
  'FRONDOSIN_A': 'Frondosin A',
  'ASPIRIN': 'Aspirin',
  'GLUCOSE': 'Glucose'
}

export function formatToSMILES(compound) {
  // Remove spaces and convert to uppercase
  const normalized = compound.replace(/\s+/g, '').toUpperCase()
  
  // Check if it's a common compound
  if (COMMON_COMPOUNDS[normalized]) {
    return COMMON_COMPOUNDS[normalized]
  }

  // Check if it's already in SMILES notation
  if (isValidSMILES(normalized)) {
    return normalized
  }

  // Try to parse molecular formula
  if (isValidMolecularFormula(normalized)) {
    // For unknown compounds, generate a basic SMILES
    return generateBasicSMILES(normalized)
  }

  throw new Error(`Unsupported compound: ${compound}. Please use a supported chemical formula or SMILES notation.`)
}

function isValidMolecularFormula(formula) {
  // Basic molecular formula validation
  const molecularFormulaPattern = /^([A-Z][a-z]?\d*)+$/
  return molecularFormulaPattern.test(formula)
}

function generateBasicSMILES(formula) {
  // Basic SMILES generation for unknown compounds
  // This is a simplified version - in reality, you'd want more sophisticated structure generation
  const elements = formula.match(/[A-Z][a-z]?\d*/g) || []
  return elements.join('')
}

function isValidSMILES(smiles) {
  // Enhanced SMILES validation
  const validChars = /^[A-Za-z0-9@\[\]\(\)=#\-+\\\/\.\s{},$%^&*]+$/
  const balancedBrackets = (str) => {
    const pairs = { '(': ')', '[': ']', '{': '}' }
    const stack = []
    
    for (let char of str) {
      if ('([{'.includes(char)) {
        stack.push(char)
      } else if (')]}'.includes(char)) {
        const last = stack.pop()
        if (pairs[last] !== char) return false
      }
    }
    return stack.length === 0
  }

  return validChars.test(smiles) && balancedBrackets(smiles)
}

export function validateCompound(compound) {
  try {
    formatToSMILES(compound)
    return true
  } catch (error) {
    return false
  }
}

export function getCompoundName(smiles) {
  // First try reverse lookup from SMILES to formula
  for (const [formula, smilesNotation] of Object.entries(COMMON_COMPOUNDS)) {
    if (smilesNotation === smiles) {
      return COMPOUND_NAMES[formula] || formula
    }
  }
  return smiles // Return SMILES if no common name found
}

export function getSupportedCompounds() {
  return Object.entries(COMPOUND_NAMES)
    .map(([formula, name]) => ({
      formula,
      name,
      smiles: COMMON_COMPOUNDS[formula]
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
} 