"use client";

import { useState } from "react";
import { useArticleCreate } from "@/hooks/useArticleCreate";
import { Button } from "@/components/ui/button";

import TitleInput from "@/components/molecules/TitleInput";
import RichTextEditor from "@/components/molecules/RichTextEditor";
import TagInput from "@/components/molecules/TagInput";
import ImageDropzone from "@/components/molecules/ImageDropzone";

const ArticleCreateForm = () => {
  const { mutateAsync, isPending } = useArticleCreate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setCover] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Cover image is required");
      return;
    }

    await mutateAsync({
      title,
      content,
      tags,
      image,
    });

    // reset
    setTitle("");
    setContent("");
    setTags([]);
    setCover(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col gap-8
        w-full
        max-w-2xl
        lg:max-w-4xl
        mx-auto
  "
    >
      {/* Title */}
      <TitleInput value={title} onChange={setTitle} />

      {/* Cover */}
      <ImageDropzone value={image} onChange={setCover} />

      {/* Content */}
      <RichTextEditor value={content} onChange={setContent} />

      {/* Tags */}
      <TagInput value={tags} onChange={setTags} />

      <div className="justify-end flex">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Finishing..." : "Finish"}
        </Button>
      </div>
    </form>
  );
};

export default ArticleCreateForm;
