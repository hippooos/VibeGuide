import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { paymentRecords } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { verifySign, CREDIT_PACKAGES, type PackageKey } from "@/lib/zpay";
import { addCredits } from "@/lib/credits";

export async function GET(req: NextRequest) {
  return handleNotify(req);
}

export async function POST(req: NextRequest) {
  return handleNotify(req);
}

async function handleNotify(req: NextRequest) {
  const url = new URL(req.url);
  const params: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const pkey = process.env.ZPAY_SECRET_KEY!;

  if (!verifySign(params, pkey)) {
    return new NextResponse("sign error", { status: 400 });
  }

  const { out_trade_no, trade_status, money } = params;

  if (trade_status !== "TRADE_SUCCESS") {
    return new NextResponse("success");
  }

  const [record] = await db
    .select()
    .from(paymentRecords)
    .where(eq(paymentRecords.outTradeNo, out_trade_no))
    .limit(1);

  if (!record) {
    return new NextResponse("order not found", { status: 400 });
  }

  if (record.status === "paid") {
    return new NextResponse("success");
  }

  const expectedMoney = CREDIT_PACKAGES[record.creditsGranted === 10 ? "20" : "40" as PackageKey]?.money;
  if (expectedMoney && parseFloat(money) !== parseFloat(expectedMoney)) {
    return new NextResponse("amount mismatch", { status: 400 });
  }

  const [updated] = await db
    .update(paymentRecords)
    .set({
      status: "paid",
      tradeNo: params.trade_no,
      payType: params.type,
      notifiedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(paymentRecords.outTradeNo, out_trade_no),
        eq(paymentRecords.status, "pending")
      )
    )
    .returning({ id: paymentRecords.id, userId: paymentRecords.userId });

  if (updated) {
    await addCredits(record.userId, record.creditsGranted);
  }

  return new NextResponse("success");
}
