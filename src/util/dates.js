
/**
 * Converts github's created_at string to a readable format (e.g. 2015-03-07T22:25:10Z to Wed Mar 7 2015)
 * @param {String} dateStr 
 */
export const convertDate = dateStr => {
  return new Date(dateStr).toDateString();
}