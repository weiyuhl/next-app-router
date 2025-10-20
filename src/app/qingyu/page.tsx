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
        <div className="flex flex-col items-center space-y-6">
          <p className="text-lg text-muted-foreground text-center">
            爱因有差别而厚重
          </p>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            如果总是在失去后才懂得珍惜，那之后做出的一切改变都不再有意义
          </p>
          <p className="text-lg text-muted-foreground text-center max-w-3xl">
            一本书，重新读一遍，可能会有新的感悟，但，不会有新的结局。
          </p>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            故地重游就像刻舟求剑，只有那年，胜过年年。
          </p>
        </div>
      </main>
    </div>
  );
}