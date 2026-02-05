import { useQuery } from "@tanstack/react-query";
import { ArticleByIdApi } from "@/lib/article.api";

export const useArticleDetail = (id: number) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => ArticleByIdApi(id),
  });
};
