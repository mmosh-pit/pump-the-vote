import axios from "axios";

export const getTotalMints = async () => {
  try {
    const result = await axios.get(`/api/get-option?name=totalmints`);
    return result.data != "" ? parseInt(result.data) : 0;
  } catch (error) {
    return 0;
  }
};
