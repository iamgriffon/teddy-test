type ClassValue = string | number | boolean | null | undefined | ClassArray | ClassDictionary;
type ClassArray = ClassValue[];
interface ClassDictionary {
  [id: string]: boolean | undefined | null;
}

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}

export const breakpoints = {
  mobile: 'only screen and (max-width : 768px)',
}
