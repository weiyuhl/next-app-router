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
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 p-6">
      <div className="w-full max-w-[350px]">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">咏雪轩阁</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
