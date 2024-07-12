import axios from "axios";

const COUNTRIES_API_ENDPOINT = "https://restcountries.com/v2/all?fields=name";

export const fetchCountries = async () => {
  try {
    const response = await axios.get(COUNTRIES_API_ENDPOINT);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const fetchPlayers = async () => {
//   try {
//     const response = await axios.get(API_ENDPOINT_PLAYER);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const API_ENDPOINT_PLAYER =
  "https://amg4s3caoi.execute-api.us-east-1.amazonaws.com/dev/players";

export const API_ENDPOINT_TEAMS =
  "https://amg4s3caoi.execute-api.us-east-1.amazonaws.com/dev/teams";
