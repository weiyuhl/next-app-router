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
      <Card className="border-border/50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">检查您的邮箱</CardTitle>
          <CardDescription>
            我们已向 {email} 发送了密码重置链接
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            请检查您的邮箱并点击链接重置密码。如果没有收到邮件，请检查垃圾邮件文件夹。
          </p>
          <Link href="/login">
            <Button className="w-full">
              返回登录
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">忘记密码</CardTitle>
        <CardDescription>
          输入您的邮箱地址，我们将向您发送密码重置链接
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              邮箱
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "发送中..." : "发送重置链接"}
          </Button>

          <div className="text-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回登录
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}



