import { Metadata } from "next";

export const metadata: Metadata = {
  title: "轻语",
  description: "轻语页面 - 爱因有差别而厚重",
  keywords: ["轻语", "感悟", "生活"],
};

export default function QingyuPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">轻语</h1>
        <div className="flex justify-center">
          <p className="text-lg text-muted-foreground">
            爱因有差别而厚重
          </p>
        </div>
      </main>
    </div>
  );
}