/**
 * API calls to GitHub. Fetching an array of objects containing data on the top repositories from Github based on language (default is javascript)
 */
const apiURL = 'https://api.github.com/search/repositories';

export const getTopRepos = async ( language = 'javascript', sort = 'stars', order = 'desc' ) => {
  const queryURL = `${apiURL}?q=language:${language}&sort=${sort}&order=${order}`;
  const response = await fetch(queryURL);
  const json = await response.json();
  return json.items;
}