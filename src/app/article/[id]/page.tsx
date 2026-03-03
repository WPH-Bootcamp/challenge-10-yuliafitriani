"use client";

import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import ArticleDetailTemplate from "@/components/template/ArticleDetailTemplate";
import { useParams } from "next/navigation";

export default function ArticleDetailPage() {
  const params = useParams<{ id: string }>();
  const postId = Number(params?.id);
  return (
    <div>
      <Header />
      <ArticleDetailTemplate articleId={postId} />
      <Footer />
    </div>
  );
}
