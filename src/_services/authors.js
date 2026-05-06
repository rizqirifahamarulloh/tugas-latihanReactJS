import API from "../_api";

export const getAuthors = async () => {
  const {data} = await API.get("/authors");
  return data.data
}

export const createAuthor = async (payload) => {
  const { data } = await API.post("/authors", payload);
  return data;
}

export const getAuthor = async (id) => {
  const { data } = await API.get(`/authors/${id}`);
  return data.data || data;
}

export const updateAuthor = async (id, payload) => {
  try {
    const response = await API.post(`/authors/${id}?_method=PUT`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    const response = await API.delete(`/authors/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting author:", error);
    throw error;
  }
};