const axios = require('axios')
const apiget = new axios.Axios();

const aGet = async (url, data) => {
  apiget.get(url, data);
}
module.exports = {
  aGet
}