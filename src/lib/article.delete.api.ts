import api from "./api";

type response = {
  success: boolean;
};

export const ArticleDeleteApi = async (id: number): Promise<response> => {
  const { data } = await api.delete<response>(`/posts/${id}`);

  return data;
};
