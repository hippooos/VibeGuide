"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Check, Loader2 } from "lucide-react";

const PACKAGES = [
  {
    key: "20",
    name: "基础包",
    price: 20,
    credits: 10,
    features: ["10个项目点数", "5类文档一键生成", "Markdown 格式导出", "批量 ZIP 下载"],
    highlight: false,
  },
  {
    key: "40",
    name: "标准包",
    price: 40,
    credits: 30,
    features: ["30个项目点数", "5类文档一键生成", "Markdown 格式导出", "批量 ZIP 下载", "性价比最高"],
    highlight: true,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleBuy(pkg: string) {
    setLoading(pkg);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: pkg, payType: "alipay" }),
      });
      if (res.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const data = await res.json();
      if (data.payUrl) {
        window.location.href = data.payUrl;
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Zap className="h-5 w-5 text-primary" />
            VibeGuide
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">首页</Link>
            <Link href="/pricing" className="font-medium">价格</Link>
            <Button asChild size="sm">
              <Link href="/auth/login">登录</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">简单透明的定价</h1>
          <p className="text-muted-foreground text-lg">按需购买点数，每个点数可生成一套完整的项目文档</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.key}
              className={`rounded-2xl border p-8 flex flex-col ${
                pkg.highlight
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "bg-card"
              }`}
            >
              {pkg.highlight && (
                <span className="text-xs font-semibold text-primary mb-3 bg-primary/10 w-fit px-2 py-0.5 rounded-full">
                  推荐
                </span>
              )}
              <h2 className="text-xl font-bold">{pkg.name}</h2>
              <div className="mt-3 mb-6">
                <span className="text-4xl font-bold">¥{pkg.price}</span>
                <span className="text-muted-foreground text-sm ml-1">/ {pkg.credits}点数</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={pkg.highlight ? "default" : "outline"}
                onClick={() => handleBuy(pkg.key)}
                disabled={loading !== null}
              >
                {loading === pkg.key ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  `购买 ${pkg.name}`
                )}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          支持支付宝支付 · 点数永久有效 · 购买后立即到账
        </p>
      </div>
    </div>
  );
}
