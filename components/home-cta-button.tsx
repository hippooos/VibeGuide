"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function HomeCTAButton({ className }: { className?: string }) {
  const [href, setHref] = useState("/auth/login");

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        if (data.user) setHref("/projects");
      });
  }, []);

  return (
    <Button asChild size="lg" className={`text-base px-8 ${className ?? ""}`}>
      <Link href={href}>
        立即开始
        <ArrowRight className="h-5 w-5" />
      </Link>
    </Button>
  );
}
