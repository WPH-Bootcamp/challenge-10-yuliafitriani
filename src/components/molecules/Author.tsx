"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type UseAuthorProps = {
  name: string;
  avatarUrl?: string;
  date?: string;
  className?: string;
};

const Author = ({ name, avatarUrl, date, className }: UseAuthorProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar>
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <Label className="text-sm font-medium">{name}</Label>

      {date && (
        <>
          <span className="inline-flex items-center">
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="2" fill="#A4A7AE" />
            </svg>
          </span>

          <Label className="text-sm text-neutral-600">{date}</Label>
        </>
      )}
    </div>
  );
};

export default Author;
