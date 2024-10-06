import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const getImg = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/img`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getEventsByCategory = async (categoryIds: number[] = []) => {
  try {
    const queryString =
      categoryIds.length > 0 ? `?categoryIds=${categoryIds.join(",")}` : "";
    const response = await axios.get(`${BASE_URL}/events${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered events:", error);
    throw error;
  }
};

export const getEventsByContinent = async (continent: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/events-by-continent`, {
      params: { continent },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events by continent:", error);
    throw error;
  }
};

export const getEventCounts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events-count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event counts:", error);
    throw error;
  }
};
