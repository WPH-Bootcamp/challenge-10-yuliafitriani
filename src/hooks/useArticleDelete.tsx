import { useMutation } from "@tanstack/react-query";
import { ArticleDeleteApi } from "@/lib/article.delete.api";

export const useArticleDelete = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await ArticleDeleteApi(id);
      return res;
    },
  });
};
