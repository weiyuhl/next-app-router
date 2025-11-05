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
    <div className="min-h-screen flex">
      {/* 左侧：品牌展示 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-blue-600 to-purple-600 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">咏雪轩阁</h1>
          <p className="text-blue-100 text-lg">
            一个优雅的文学与艺术空间
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-white text-sm">
              文章千古事，得失寸心知
            </p>
            <p className="text-blue-100 text-xs mt-2">—— 杜甫</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-white text-sm">
              读书破万卷，下笔如有神
            </p>
            <p className="text-blue-100 text-xs mt-2">—— 杜甫</p>
          </div>
        </div>
      </div>
      
      {/* 右侧：认证表单 */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
