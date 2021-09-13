import axios from "axios";

const API_URL = 'https://swapi.dev/api/';

export async function fetchAllPeople() {
  let res = await axios.get(`${API_URL}/people`);
  return res.data.results;
}