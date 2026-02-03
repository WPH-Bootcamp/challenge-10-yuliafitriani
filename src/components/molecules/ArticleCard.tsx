import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArticleAction } from "@/components/molecules/ArticleAction";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Article } from "@/types/article";

type Props = {
  article: Article;
};
const ArticleCard = ({ article }: Props) => {
  const date = new Date(article.createdAt);

  const dateFormatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-row w-full gap-6 border-b border-neutral-300 py-6">
      <Card className="relative w-85 h-64 p-0 m-0 hidden lg:block">
        <Image
          src="https://cdn.aglty.io/blog-starter-2021-template/posts/virtual-tour_20210331171226_0.jpg"
          alt={article.title}
          className="object-cover rounded-md"
          fill
        />
      </Card>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-md">{article.title}</h2>
        {article.tags && (
          <div className="flex flex-row w-full gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
        <p className="text-xs lg:text-sm text-neutral-900 line-clamp-2">
          {article.content.replace(/<[^>]+>/g, "")}
        </p>
        <div className="flex flex-row gap-3">
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
        </div>
        <ArticleAction likes={article.likes} comments={article.comments} />
      </div>
    </div>
  );
};

export default ArticleCard;
