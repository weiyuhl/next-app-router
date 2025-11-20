export const metadata = {
  title: {
    template: "%s | 咏雪轩阁",
    default: "登录",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 p-6">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight drop-shadow-sm">咏雪轩阁</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
