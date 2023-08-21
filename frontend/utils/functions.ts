export const formatDateToJST = (dateString: string): string => {
  const date = new Date(dateString);

  date.setHours(date.getHours() + 9);

  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
  const DD = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const MIN = String(date.getMinutes()).padStart(2, "0");
  const SS = String(date.getSeconds()).padStart(2, "0");

  return `${YYYY}-${MM}-${DD} ${HH}:${MIN}:${SS}`;
};
