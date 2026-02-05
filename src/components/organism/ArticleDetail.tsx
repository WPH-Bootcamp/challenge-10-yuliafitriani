import React from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import type { Article } from "@/types/article";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArticleAction } from "@/components/molecules/ArticleAction";
// import { useLikePost } from "../../mutations";

type Props = {
  article: Article;
};

export const ArticleDetail: React.FC<Props> = ({ article }) => {
  const date = new Date(article.createdAt);

  const dateFormatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="w-full space-y-4">
      <h1 className="text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
        {article.title}
      </h1>
      <div className="flex flex-wrap items-center gap-2">
        {article.tags && (
          <div className="flex flex-row w-full gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col justify-start">
        <Avatar>
          <AvatarImage src={article.author.name} alt={article.author.name} />
          <AvatarFallback>
            {article.author.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Label>{article.author.name}</Label>
        <Label>
          <svg
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="2" fill="#A4A7AE" />
          </svg>
        </Label>
        <Label>{dateFormatted}</Label>

        <ArticleAction likes={article.likes} comments={article.comments} />
      </div>
    </header>
  );
};
