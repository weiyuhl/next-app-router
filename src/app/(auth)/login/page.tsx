
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 临时：直接跳转到后台
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("登录错误:", error);
      alert("登录失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          登录
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          输入您的邮箱以进入管理后台
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-transparent placeholder:text-zinc-400 transition-all duration-200 dark:border-zinc-800 dark:focus:ring-zinc-50 dark:text-zinc-50"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="密码"
              className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-transparent placeholder:text-zinc-400 transition-all duration-200 dark:border-zinc-800 dark:focus:ring-zinc-50 dark:text-zinc-50"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 underline-offset-4 hover:underline transition-colors"
            >
              忘记密码？
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md transition-colors dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          disabled={loading}
        >
          {loading ? "登录中..." : "登录"}
        </Button>

        <div className="text-center text-sm text-zinc-500">
          还没有账号？{" "}
          <Link href="/register" className="text-zinc-900 hover:underline underline-offset-4 dark:text-zinc-50">
            立即注册
          </Link>
        </div>
      </form>

      <div className="text-center">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors inline-flex items-center group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200 mr-1">←</span>
          返回首页
        </Link>
      </div>
    </div>
  );
}
