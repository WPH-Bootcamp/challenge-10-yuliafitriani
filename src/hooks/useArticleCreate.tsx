// src/features/blog/hooks/useCreateBlog.ts
import { useMutation } from "@tanstack/react-query";
import { CreateArticleApi } from "@/lib/article.api";
import { ArticleCreatePayload } from "@/types/article";

export const useArticleCreate = () => {
  return useMutation({
    mutationFn: (payload: ArticleCreatePayload) => CreateArticleApi(payload),
  });
};
