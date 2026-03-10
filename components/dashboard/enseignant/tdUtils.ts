/**
 * Determines the educational level type based on the class name.
 * Primary (Primaire) for CM2, Secondary (Secondaire) for others (3ème, Tle).
 */
export function getTDType(classe: string | undefined | null): 'Primaire' | 'Collège' {
  if (!classe) return 'Collège';
  const normalizedClasse = classe.toLowerCase().trim();
  
  if (normalizedClasse.includes('cm2')) {
    return 'Primaire';
  }
  
  // Default to Collège for 3ème, Tle, etc.
  return 'Collège';
}
