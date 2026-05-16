import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCredits } from "@/lib/credits";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const credits = await getCredits(data.user.id);
  return NextResponse.json({ credits });
}
