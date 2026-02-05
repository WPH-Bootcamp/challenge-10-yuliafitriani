"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
};

const TagInput = ({ value, onChange }: Props) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (!input.trim()) return;
    if (value.includes(input)) return;

    onChange([...value, input]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="grid gap-2">
      <Label>Tags</Label>

      <Input
        placeholder="Press enter to add tag"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
      />

      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <Badge key={tag} className="flex items-center gap-1">
            {tag}
            <button onClick={() => removeTag(tag)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
