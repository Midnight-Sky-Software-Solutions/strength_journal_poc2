
export function dateFormat1(dateString: string): string {
  const asDate = new Date(dateString);
  return `${asDate.getFullYear()}-${asDate.getMonth() < 10 ? '0' : ''}${asDate.getMonth()+1}-${asDate.getDate()+1 < 10 ? '0' : ''}${asDate.getDate()}`;
}

export const KG_GUID = '4BC96550-F274-4A90-978B-92A398F8C49D';
export const LBS_GUID = 'BF8DF35B-2F45-4A79-A49C-D3ACA4A12CD6';