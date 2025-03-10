
export function dateFormat1(dateString: string): string {
  const asDate = new Date(dateString);
  return `${asDate.getFullYear()}-${asDate.getMonth() < 10 ? '0' : ''}${asDate.getMonth()}-${asDate.getDate() < 10 ? '0' : ''}${asDate.getDate()}`;
}