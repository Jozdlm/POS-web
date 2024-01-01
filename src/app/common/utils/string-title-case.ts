export function stringToTitleCase(str: string): string {
  str = str.trim().toLowerCase();
  return str.replace(/\b\w/g, (s) => s.toUpperCase());
}
