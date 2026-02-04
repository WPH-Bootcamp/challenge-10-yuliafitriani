"use client";

import {
  ArticleTemplate,
  ArticleMostLikeTemplate,
} from "@/components/template/ArticleTemplate";
import {
  useRecommendedArticles,
  useMostLikedArticles,
} from "@/hooks/useArticle";
import type { ArticleParams } from "@/types/article";
import { useState } from "react";
import { PaginationCompact } from "@/components/molecules/PaginationCompact";

export default function HomeTemplate() {
  const [page, setPage] = useState(1);

  const params: ArticleParams = {
    page,
    limit: 10,
  };

  const recommendedQuery = useRecommendedArticles(params);
  const mostLikedQuery = useMostLikedArticles({ limit: 5, page: 1 });

  return (
    <div>
      <main className="flex-1 overflow-y-auto container mx-auto">
        <div className="grid gap-8 lg:grid-cols-[7fr_3fr]">
          {/* Left content */}
          <div className="w-full p-4">
            <div className="lg:border-r lg:border-neutral-300 lg:pr-16">
              <ArticleTemplate
                title="Recommended For You"
                articles={recommendedQuery.data?.data}
                isLoading={recommendedQuery.isLoading}
                isFetching={recommendedQuery.isFetching}
                isError={recommendedQuery.isError}
                onRetry={() => recommendedQuery.refetch()}
              />
            </div>

            <div className="my-4">
              <PaginationCompact
                currentPage={page}
                totalPages={recommendedQuery.data?.lastPage || 1}
                onPageChange={setPage}
              />
            </div>
          </div>

          {/* Mobile divider */}
          <div className="block w-full h-2 bg-neutral-300 lg:hidden" />

          {/* Right sidebar */}
          <div className="w-full p-4">
            <ArticleMostLikeTemplate
              title="Most Liked"
              articles={mostLikedQuery.data?.data}
              isLoading={mostLikedQuery.isLoading}
              isFetching={mostLikedQuery.isFetching}
              isError={mostLikedQuery.isError}
              onRetry={() => mostLikedQuery.refetch()}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
