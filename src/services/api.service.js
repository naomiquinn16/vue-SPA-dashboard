import axios from "axios";

const API_URL = 'https://swapi.dev/api/';

export async function fetchAllPeople() {
  const people = await axios.get(`${API_URL}/people`);
  return people.data.results;
}

export async function fetchAllPlanets() {
  const planets = await axios.get(`${API_URL}/planets`);
  return planets.data.results;
}