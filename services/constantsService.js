import { API_HOST } from "../constants";

const getAllContracts = async () => {
  const apiUrl = `https://${API_HOST}/api/contracts`;

  let res = await fetch(apiUrl);
  res = await res.json();

  return res;
};

export { getAllContracts };
