import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { openai, AI_MODEL } from "@/lib/openai";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { description } = await req.json();

  if (!description || description.length < 20) {
    return NextResponse.json(
      { error: "项目描述至少需要20个字符" },
      { status: 400 }
    );
  }

  const completion = await openai.chat.completions.create({
    model: AI_MODEL,
    messages: [
      {
        role: "user",
        content: `你是一位资深的产品经理和技术顾问。用户正在开发一个新项目，请根据以下项目描述，提出3到5个深入的问题，帮助进一步明确项目需求。

项目描述：
${description}

请提出3-5个具体、有价值的问题，帮助了解：
- 目标用户群体和使用场景
- 核心功能和优先级
- 技术约束和集成需求
- 商业模式和成功指标
- 潜在的技术或业务挑战

请直接以JSON数组格式返回问题列表，格式如下：
["问题1", "问题2", "问题3", ...]

只返回JSON数组，不要有其他内容。`,
      },
    ],
  });

  const content = completion.choices[0].message.content ?? "[]";

  let questions: string[] = [];
  try {
    const match = content.match(/\[[\s\S]*\]/);
    questions = JSON.parse(match ? match[0] : content);
  } catch {
    questions = content
      .split("\n")
      .filter((line) => line.trim().startsWith('"') || line.includes("?"))
      .slice(0, 5);
  }

  return NextResponse.json({ questions });
}
