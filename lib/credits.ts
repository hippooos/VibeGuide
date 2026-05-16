import { db } from "@/db";
import { userCredits } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getCredits(userId: string): Promise<number> {
  const result = await db
    .select({ credits: userCredits.credits })
    .from(userCredits)
    .where(eq(userCredits.userId, userId))
    .limit(1);

  return result[0]?.credits ?? 0;
}

export async function addCredits(userId: string, amount: number): Promise<void> {
  await db
    .insert(userCredits)
    .values({ userId, credits: amount })
    .onConflictDoUpdate({
      target: userCredits.userId,
      set: {
        credits: sql`${userCredits.credits} + ${amount}`,
        updatedAt: new Date(),
      },
    });
}

export async function deductCredit(userId: string): Promise<boolean> {
  const current = await getCredits(userId);
  if (current <= 0) return false;

  await db
    .update(userCredits)
    .set({
      credits: sql`${userCredits.credits} - 1`,
      updatedAt: new Date(),
    })
    .where(eq(userCredits.userId, userId));

  return true;
}
