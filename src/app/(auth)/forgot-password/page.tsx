"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 临时：模拟发送重置邮件
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("发送重置邮件错误:", error);
      alert("发送失败，请稍后重试");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-zinc-100 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-1">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              检查您的邮箱
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              我们已向 {email} 发送了密码重置链接
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
              请检查您的邮箱并点击链接重置密码。如果没有收到邮件，请检查垃圾邮件文件夹。
            </p>
            <Link href="/login">
              <Button className="w-full h-12 bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-700 hover:to-zinc-900 text-white rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all duration-150 font-medium text-base dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900 dark:shadow-[0_4px_0_0_rgba(255,255,255,0.5)]">
                返回登录
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-zinc-100 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-1">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            忘记密码
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            输入您的邮箱地址，我们将向您发送密码重置链接
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              邮箱
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:shadow-none transition-all duration-200 outline-none placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-700 hover:to-zinc-900 text-white rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all duration-150 font-medium text-base dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900 dark:shadow-[0_4px_0_0_rgba(255,255,255,0.5)]"
            disabled={loading}
          >
            {loading ? "发送中..." : "发送重置链接"}
          </Button>

          <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Link href="/login" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors inline-flex items-center group">
              <ArrowLeft className="w-3 h-3 mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
              返回登录
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}



