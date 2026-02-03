"use client";

import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import { ArticleTemplate } from "@/components/template/ArticleTemplate";
import { useRecommendedArticles } from "@/hooks/useArticle";
import type { ArticleParams } from "@/types/article";
import { useState } from "react";
import { PaginationCompact } from "@/components/molecules/PaginationCompact";

export default function Home() {
  const [page, setPage] = useState(1);
  const params: ArticleParams = {
    page: page,
    limit: 10,
  };
  const query = useRecommendedArticles(params);
  return (
    <div className="">
      <Header />

      {/* Konten utama scrollable */}
      <main className="flex-1 overflow-y-auto container mx-auto p-4">
        <ArticleTemplate
          title="Recommended For You"
          articles={query.data?.data}
          isLoading={query.isLoading}
          isFetching={query.isFetching}
          isError={query.isError}
          onRetry={() => query.refetch()}
        />
        <div className="my-4">
          <PaginationCompact
            currentPage={page}
            totalPages={query.data?.lastPage || 1}
            onPageChange={setPage}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
