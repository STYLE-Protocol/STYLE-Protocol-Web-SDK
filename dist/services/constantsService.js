const API_HOST = "style-protocol-api.vercel.app";

const getAllContracts = async () => {
  const apiUrl = `https://${API_HOST}/api/contracts`;

  let res = await fetch(apiUrl);
  res = await res.json();

  return res;
};

exports.getAllContracts = getAllContracts;
