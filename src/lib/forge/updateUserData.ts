import axios from "axios";

export const updateUserData = async (params: any, wallet: string) => {
  await axios.put("/api/update-wallet-data", {
    field: "profile",
    value: params,
    wallet: wallet,
  });
};
