import axios from "axios";


const BASE_URL = "http://localhost:3002/api/v0";
export const fetchDashboardSummary = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/analytics/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    throw error;
  }
};
