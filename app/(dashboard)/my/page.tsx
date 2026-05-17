"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Coins, Mail, Loader2 } from "lucide-react";

export default function MyPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) setEmail(data.user.email ?? "");

      const res = await fetch("/api/credits");
      if (res.ok) {
        const json = await res.json();
        setCredits(json.credits);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">我的</h1>

      <div className="space-y-4">
        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-1">
            <Mail className="h-4 w-4" />
            <span>账号邮箱</span>
          </div>
          <p className="font-medium">{email}</p>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-1">
            <Coins className="h-4 w-4" />
            <span>项目点数</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{credits ?? 0}</p>
            {credits === 0 && (
              <Button onClick={() => router.push("/pricing")}>
                获取点数
              </Button>
            )}
          </div>
          {credits !== null && credits > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              还可生成 {credits} 个项目文档
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
