import API from "../_api";

export const getBooks = async () => {
  const {data} = await API.get("/books");
  return data.data
}

export const getBook = async (id) => {
  const { data } = await API.get(`/books/${id}`);
  return data.data;
};

export const createBook = async (formData) => {
  try {
    const response = await API.post("/books", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
}

export const updateBook = async (id, formData) => {
  try {
    const response = await API.post(`/books/${id}?_method=PUT`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await API.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};