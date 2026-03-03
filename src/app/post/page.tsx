import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import ArticleCreateForm from "@/components/organism/ArticleCreateForm";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full px-4 py-8 lg:px-8">
        <ArticleCreateForm />
      </main>

      <Footer />
    </div>
  );
}
