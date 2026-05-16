import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { paymentRecords } from "@/db/schema";
import { buildPayUrl, CREDIT_PACKAGES, type PackageKey } from "@/lib/zpay";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { package: pkg, payType = "alipay" } = await req.json() as {
    package: string;
    payType?: string;
  };

  const packageInfo = CREDIT_PACKAGES[pkg as PackageKey];
  if (!packageInfo) {
    return NextResponse.json({ error: "无效的套餐" }, { status: 400 });
  }

  const pid = process.env.ZPAY_API_KEY!;
  const pkey = process.env.ZPAY_SECRET_KEY!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const outTradeNo = randomUUID().replace(/-/g, "");

  await db.insert(paymentRecords).values({
    userId: data.user.id,
    outTradeNo,
    amount: packageInfo.money,
    creditsGranted: packageInfo.credits,
    status: "pending",
    payType,
  });

  const payUrl = buildPayUrl({
    name: `VibeGuide ${packageInfo.name}`,
    money: packageInfo.money,
    type: payType,
    outTradeNo,
    notifyUrl: `${siteUrl}/api/payment/notify`,
    returnUrl: `${siteUrl}/my`,
    pid,
    pkey,
  });

  return NextResponse.json({ payUrl });
}
