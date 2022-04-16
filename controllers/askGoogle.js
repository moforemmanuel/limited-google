const axios = require("axios").default;

module.exports = async (searchQuery) => {
  const query_str = searchQuery;
  const query_arr = query_str.split(" ");
  const query = query_arr.join("+");

  const options = {
    method: 'GET',
    url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${query}`,
    headers: {
      'x-user-agent': 'desktop',
      'x-proxy-location': 'EU',
      'x-rapidapi-host': 'google-search3.p.rapidapi.com',
      'x-rapidapi-key': '84be106354msh1e7622dcbc9111ep1937eejsnb7411de2c219'
    }
  };

  return await axios.request(options)
  // .then(function (response) {
  //   console.log(response.data);
  //   return response.data
  // }).catch(function (error) {
  //   console.error(error);
  //   return error;
  // });
}