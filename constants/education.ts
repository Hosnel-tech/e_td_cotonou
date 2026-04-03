export const CLASSES = ['CM2', '3ème', 'Tle'] as const;

export const SUBJECTS_BY_CLASS: Record<string, string[]> = {
  'CM2': ['ES', 'EST', 'Math', 'Communication orale', 'Expression écrite', 'Dessin/Couture'],
  '3ème': ['Français', 'Anglais', 'Math', 'SVT', 'Hist-Geo', 'PCT'],
  'Tle': ['Français', 'Anglais', 'Math', 'SVT', 'Hist-Geo', 'Physique', 'Chimie', 'Philo']
};

export const SECONDARY_SUBJECTS = Array.from(new Set([
  ...SUBJECTS_BY_CLASS['3ème'],
  ...SUBJECTS_BY_CLASS['Tle']
])).sort();

export const SCHOOLS = [
  'SURU LERE', 'AKPAKPA CENTRE', 'SEGBEYA', 'GBEGAMEY', 'L\'OCEAN', 
  'FIYEGNON', 'LITTORAL', 'LES PYLÖNES', 'LES PYRAMIDES', 'ENTENTE'
] as const;
