import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeCTAButton } from "@/components/home-cta-button";
import {
  Zap,
  FileText,
  Map,
  Layout,
  Database,
  Server,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Zap className="h-5 w-5 text-primary" />
            VibeGuide
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium">首页</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">价格</Link>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/login">登录</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/sign-up">免费注册</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium mb-6">
          <Zap className="h-3.5 w-3.5" />
          AI 驱动的开发文档生成
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          把想法变成
          <span className="text-primary"> 专业文档</span>
          <br />只需三步
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          VibeGuide 帮助编程新手通过 AI 快速生成完整的项目开发文档，
          从用户旅程地图到数据库设计，10 分钟内一键搞定。
        </p>
        <div className="flex items-center justify-center gap-4">
          <HomeCTAButton />
          <Button asChild variant="outline" size="lg" className="text-base px-8">
            <Link href="/pricing">查看定价</Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-3 gap-8 text-center">
          {[
            { number: "5", label: "类专业文档" },
            { number: "3", label: "步骤完成分析" },
            { number: "10min", label: "生成全套文档" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-primary">{stat.number}</p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">一键生成五类文档</h2>
          <p className="text-muted-foreground">覆盖项目开发全流程，让你的想法快速落地</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Map,
              title: "用户旅程地图",
              desc: "梳理用户使用路径，识别关键触点和痛点，帮助你站在用户视角思考产品。",
            },
            {
              icon: FileText,
              title: "产品需求PRD",
              desc: "生成结构化的产品需求文档，涵盖功能列表、验收标准和非功能性需求。",
            },
            {
              icon: Layout,
              title: "前端设计文档",
              desc: "技术选型、页面结构、组件设计和状态管理方案，前端开发一目了然。",
            },
            {
              icon: Server,
              title: "后端设计文档",
              desc: "API 接口设计、系统架构和认证方案，让后端实现有据可依。",
            },
            {
              icon: Database,
              title: "数据库设计",
              desc: "完整的数据库表结构、ER 图描述和索引设计，数据层规划清晰。",
            },
            {
              icon: Zap,
              title: "AI 深度分析",
              desc: "通过多轮问答深入理解项目需求，生成的文档更贴合实际业务场景。",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border bg-card p-6 hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid - How it works */}
      <section className="bg-muted/30 py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">三步完成项目文档</h2>
            <p className="text-muted-foreground">简单清晰的流程，专为编程新手设计</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: "01",
                title: "描述项目",
                desc: "用自然语言详细描述你的项目想法，AI 会深度理解你的需求。",
                color: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
                textColor: "text-blue-600 dark:text-blue-400",
              },
              {
                step: "02",
                title: "回答问题",
                desc: "AI 提出 3-5 个针对性问题，帮助你深入思考项目的关键细节。",
                color: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800",
                textColor: "text-purple-600 dark:text-purple-400",
              },
              {
                step: "03",
                title: "获取文档",
                desc: "一键生成五类专业文档，支持 Markdown 预览和 ZIP 批量下载。",
                color: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
                textColor: "text-green-600 dark:text-green-400",
              },
            ].map(({ step, title, desc, color, textColor }) => (
              <div key={step} className={`rounded-2xl border p-8 ${color}`}>
                <span className={`text-5xl font-black ${textColor} opacity-30`}>{step}</span>
                <h3 className="text-xl font-bold mt-4 mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">简单透明的定价</h2>
          <p className="text-muted-foreground">按需购买，点数永久有效</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { name: "基础包", price: 20, credits: 10, highlight: false },
            { name: "标准包", price: 40, credits: 30, highlight: true },
          ].map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl border p-8 ${
                pkg.highlight ? "border-primary bg-primary/5 shadow-lg" : "bg-card"
              }`}
            >
              {pkg.highlight && (
                <span className="text-xs font-semibold text-primary mb-2 block">推荐</span>
              )}
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <div className="mt-2 mb-6">
                <span className="text-4xl font-bold">¥{pkg.price}</span>
                <span className="text-muted-foreground text-sm ml-1">/ {pkg.credits}点数</span>
              </div>
              {[
                "每点数生成一套完整文档",
                "5类专业开发文档",
                "Markdown / ZIP 下载",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm mb-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  {f}
                </div>
              ))}
              <Button
                asChild
                className="w-full mt-6"
                variant={pkg.highlight ? "default" : "outline"}
              >
                <Link href="/pricing">立即购买</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-24">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">常见问题</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "VibeGuide 适合什么人使用？",
                a: "主要面向编程新手和独立开发者，帮助他们在动手写代码之前快速梳理清楚项目需求和技术方案。",
              },
              {
                q: "生成的文档质量如何？",
                a: "我们使用 claude-sonnet-4 模型，通过多轮对话深入理解你的需求，生成的文档质量媲美资深产品经理和技术架构师的输出。",
              },
              {
                q: "点数是怎么计算的？",
                a: "每生成一套完整的项目文档（包含5类文档）消耗1个点数。点数购买后永久有效，不会过期。",
              },
              {
                q: "支持哪些支付方式？",
                a: "目前支持支付宝支付，付款成功后点数立即到账，可在「我的」页面查看。",
              },
              {
                q: "生成的文档可以导出吗？",
                a: "可以。每类文档都支持单独下载 .md 文件，也可以一键批量打包成 .zip 文件下载。",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-xl border bg-card">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium list-none">
                  {q}
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 py-24 text-center">
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-16">
          <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            注册免费账号，立即体验 AI 驱动的文档生成
          </p>
          <HomeCTAButton className="px-10" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Zap className="h-4 w-4 text-primary" />
            VibeGuide
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">首页</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">价格</Link>
            <Link href="/auth/login" className="hover:text-foreground transition-colors">登录</Link>
          </div>
          <p>© 2026 VibeGuide. 保留所有权利。</p>
        </div>
      </footer>
    </div>
  );
}
