"use client";

import { useArticleDetail } from "@/hooks/useArticleDetail";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import UseAuthor from "@/components/molecules/Author";

type Props = {
  articleId: number;
};

const ArticleDetailTemplate = ({ articleId }: Props) => {
  const { data, isLoading, isError } = useArticleDetail(articleId);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError || !data) return <p className="p-6">Article not found</p>;

  const article = data;

  const date = new Date(article.createdAt);

  const dateFormatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <h1 className="text-3xl font-bold">{article.title}</h1>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="flex gap-2">
            {article.tags.map((tag: string) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
        {/* Author */}
        <UseAuthor
          name={article.author.name}
          avatarUrl={article.author.name}
          date={dateFormatted}
        />

        {/* Cover */}
        {article.imageUrl && (
          <div className="relative w-full h-100">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </main>
  );
};

export default ArticleDetailTemplate;
