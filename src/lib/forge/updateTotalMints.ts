import axios from "axios";

export const updateTotalMints = async (totalMints: any) => {
  await axios.post("/api/set-option", {
    name: "totalmints",
    value: totalMints,
  });
};
