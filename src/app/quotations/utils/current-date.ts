export function getCurrentDate(): string {
  const currentDate = new Date();

  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
  const year = currentDate.getFullYear().toString();

  return `${year}-${month}-${day}`;
}
