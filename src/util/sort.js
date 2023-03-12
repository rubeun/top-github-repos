/**
 * 
 * @param {Array} inputArr  
 * @param {String} orderBy 
 * @returns 
 */
export const sortArrByDate = (inputArr , orderBy = "desc") => {
  inputArr.sort((a, b) => {
    let dateA = new Date(a.created_at), dateB = new Date(b.created_at);
    if (orderBy === "asc") {
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    } else if (orderBy === "desc") {
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    } 
  });  
  return inputArr;
}