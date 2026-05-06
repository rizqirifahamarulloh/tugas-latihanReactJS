import API from "../_api";

export const getGenres = async () => {
  const {data} = await API.get("/genres");
  return data.data
}

export const createGenre = async (payload) => {
  const { data } = await API.post("/genres", payload);
  return data;
}

export const getGenre = async (id) => {
  const { data } = await API.get(`/genres/${id}`);
  return data.data || data;
}

export const updateGenre = async (id, payload) => {
  try {
    const response = await API.post(`/genres/${id}?_method=PUT`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating genre:", error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  try {
    const response = await API.delete(`/genres/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting genre:", error);
    throw error;
  }
};