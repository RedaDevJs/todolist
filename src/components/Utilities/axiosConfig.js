const getAxiosConfig = () => {
  const token = getToken();
  if (!token) {
    console.error("Token is null. Please authenticate first.");
    throw new Error("Token is null. Please authenticate first.");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
