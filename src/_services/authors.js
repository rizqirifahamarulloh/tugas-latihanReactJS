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