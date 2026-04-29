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