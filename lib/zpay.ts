import crypto from "crypto";

export const CREDIT_PACKAGES = {
  "20": { money: "20.00", credits: 10, name: "基础包（10点数）" },
  "40": { money: "40.00", credits: 30, name: "标准包（30点数）" },
} as const;

export type PackageKey = keyof typeof CREDIT_PACKAGES;

function md5(str: string): string {
  return crypto.createHash("md5").update(str).digest("hex");
}

export function generateSign(
  params: Record<string, string | number>,
  pkey: string
): string {
  const filtered = Object.entries(params)
    .filter(
      ([k, v]) =>
        k !== "sign" &&
        k !== "sign_type" &&
        v !== "" &&
        v !== null &&
        v !== undefined
    )
    .sort(([a], [b]) => a.localeCompare(b));

  const queryString = filtered.map(([k, v]) => `${k}=${v}`).join("&");
  return md5(queryString + pkey);
}

export function buildPayUrl(order: {
  name: string;
  money: string;
  type: string;
  outTradeNo: string;
  notifyUrl: string;
  returnUrl: string;
  pid: string;
  pkey: string;
}): string {
  const params: Record<string, string> = {
    name: order.name,
    money: order.money,
    type: order.type,
    out_trade_no: order.outTradeNo,
    notify_url: order.notifyUrl,
    return_url: order.returnUrl,
    pid: order.pid,
    sign_type: "MD5",
  };

  const sign = generateSign(params, order.pkey);
  const query = new URLSearchParams({ ...params, sign, sign_type: "MD5" });
  return `https://zpayz.cn/submit.php?${query.toString()}`;
}

export function verifySign(
  params: Record<string, string>,
  pkey: string
): boolean {
  const { sign, ...rest } = params;
  const expected = generateSign(rest, pkey);
  return expected === sign;
}
