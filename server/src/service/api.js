import axios from "axios";
import { BASE_URL } from "../service/helper";
export const getOrder = async (id) => {
  try {
    return await axios.get(`${BASE_URL}/orders/editOrder/${id}`);
  } catch (error) {
    console.log(error);
  }
};
// Update order API endpoint
export const updateOrder = async (id, updatedOrder) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/orders/updateOrder/${id}`,
      updatedOrder
    );
    return response.data;
  } catch (error) {
    // Handle error
    throw error.response.data;
  }
};
