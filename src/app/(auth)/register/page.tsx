"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("两次输入的密码不一致");
      return;
    }

    setLoading(true);

    try {
      // 临时：直接跳转到登录页（后续会添加真实的注册逻辑）
      setTimeout(() => {
        alert("注册成功！请登录");
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error("注册错误:", error);
      alert("注册失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-zinc-100 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-1">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            创建账号
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            注册以访问后台管理系统
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              姓名
            </label>
            <input
              id="name"
              type="text"
              placeholder="张三"
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:shadow-none transition-all duration-200 outline-none placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              邮箱
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:shadow-none transition-all duration-200 outline-none placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              密码
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:shadow-none transition-all duration-200 outline-none placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              确认密码
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:shadow-none transition-all duration-200 outline-none placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-700 hover:to-zinc-900 text-white rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all duration-150 font-medium text-base dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900 dark:shadow-[0_4px_0_0_rgba(255,255,255,0.5)]"
            disabled={loading}
          >
            {loading ? "注册中..." : "注 册"}
          </Button>

          <div className="text-center text-sm text-zinc-500 pt-2">
            已有账号？{" "}
            <Link href="/login" className="text-zinc-900 hover:underline underline-offset-4 font-medium dark:text-zinc-100">
              立即登录
            </Link>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <Link href="/" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors inline-flex items-center group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200 mr-1">←</span>
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
