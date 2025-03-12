// src/graphqlHelper.js
import axios from "axios";

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL;

export const fetchGraphQLData = async (query) => {
  try {
    const response = await axios.post(GRAPHQL_URL, { query });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from GraphQL:", error);
    throw error;
  }
};
