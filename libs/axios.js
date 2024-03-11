import { Axios } from 'axios';
const apiget = new Axios();

const aGet = async (url, data) => {
  apiget.get(url, data);
}
export default {
  aGet
}