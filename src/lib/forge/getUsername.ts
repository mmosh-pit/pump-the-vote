import axios from "axios";

export const getUsername = async (pubKey: any) => {
  try {
    const result = await axios.get(`/api/get-wallet-data?wallet=${pubKey}`);

    return result.data?.profile?.username || "";
  } catch (error) {
    return "";
  }
};
