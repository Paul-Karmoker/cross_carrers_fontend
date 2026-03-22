// utils/stripCitations.ts (create this file)
export const stripCitationMarkers = (html: string): string => {
  // Remove all [citation:X] patterns (X = digits)
  return html.replace(/\[\s*citation:\s*\d+\s*\]/gi, '');
};