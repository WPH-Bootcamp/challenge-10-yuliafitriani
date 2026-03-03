"use client";

import { ArticleTemplate } from "@/components/template/ArticleTemplate";
import { useSearchArticles } from "@/hooks/useArticle";
import type { ArticleSearchParams } from "@/types/article";
import { useSearchParams } from "next/navigation";

export default function SearchTemplate() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const params: ArticleSearchParams = {
    query: q,
    page: 1,
    limit: 10,
  };

  const query = useSearchArticles(params);

  return (
    <div>
      <main className="flex-1 overflow-y-auto container mx-auto p-4">
        {query.data?.data ? (
          <ArticleTemplate
            title={`Result For "${q}"`}
            articles={query.data?.data}
            isLoading={query.isLoading}
            isFetching={query.isFetching}
            isError={query.isError}
            onRetry={() => query.refetch()}
          />
        ) : (
          <div>No results found</div>
        )}
      </main>
    </div>
  );
}
