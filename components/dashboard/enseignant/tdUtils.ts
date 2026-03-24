/**
 * Determines the educational level type based on the class name.
 * Primary (Primaire) for CM2, Secondary (Secondaire) for others (3ème, Tle).
 */
export function getTDType(classe: string | undefined | null): 'Primaire' | 'Secondaire' {
  if (!classe) return 'Secondaire';
  const normalizedClasse = classe.toLowerCase().trim();
  
  if (normalizedClasse.includes('cm2')) {
    return 'Primaire';
  }
  
  return 'Secondaire';
}
