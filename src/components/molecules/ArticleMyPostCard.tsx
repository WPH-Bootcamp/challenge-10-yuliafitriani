import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Article } from "@/types/article";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { AlertDialogDestructive } from "./AlertDialogDestructive";

type Props = {
  article: Article;
  onDelete: () => void;
};
const ArticleMyPostCard = ({ article, onDelete }: Props) => {
  const createdAt = new Date(article.createdAt);
  const updatedAt = new Date(article.createdAt);

  const createdAtFormatted = createdAt.toLocaleTimeString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const updatedAtFormatted = updatedAt.toLocaleTimeString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const router = useRouter();

  return (
    <div className="flex flex-row w-full gap-6 border-b border-neutral-300 py-6">
      <div className="flex flex-col gap-4">
        <Card className="relative w-85 h-64 p-0 m-0 hidden lg:block">
          <Image
            src={article.imageUrl}
            alt={article.title}
            className="object-cover rounded-md"
            fill
          />
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <h2
          role="button"
          tabIndex={0}
          className={cn(
            "font-bold text-md cursor-pointer",
            "hover:underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300",
          )}
          onClick={() => router.push(`/article/${article.id}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/article/${article.id}`);
            }
          }}
        >
          {article.title}
        </h2>
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
          <span className="text-xs text-neutral-700">
            Created {createdAtFormatted}
          </span>
          <Separator orientation="vertical" />
          <span className="text-xs text-neutral-700">
            Last Updated {updatedAtFormatted}
          </span>
        </div>
        <div className="flex flex-row -mx-4">
          <Button variant="link">Statistic</Button>
          <Separator orientation="vertical" />
          <Button variant="link">Edit</Button>
          <Separator orientation="vertical" />

          <AlertDialogDestructive
            title="Delete post?"
            description="Are you sure you want to delete this post? This cannot be undone."
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleMyPostCard;
