import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getOpenAIClient, AI_MODEL } from "@/lib/openai";
import { getCredits, deductCredit } from "@/lib/credits";

interface QAPair {
  question: string;
  answer: string;
}

async function generateDoc(systemPrompt: string, userContext: string): Promise<string> {
  const completion = await getOpenAIClient().chat.completions.create({
    model: AI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContext },
    ],
  });
  return completion.choices[0].message.content ?? "";
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const credits = await getCredits(data.user.id);
  if (credits <= 0) {
    return NextResponse.json(
      { error: "点数不足，请充值后再试", code: "NO_CREDITS" },
      { status: 402 }
    );
  }

  const { description, qaPairs } = await req.json() as {
    description: string;
    qaPairs: QAPair[];
  };

  const contextStr = `项目描述：
${description}

深入需求分析：
${qaPairs.map((qa) => `Q: ${qa.question}\nA: ${qa.answer}`).join("\n\n")}`;

  await deductCredit(data.user.id);

  const [journeyMap, prd, frontendDesign, backendDesign, dbDesign] =
    await Promise.all([
      generateDoc(
        "你是一位资深产品经理，请根据用户的项目描述和需求分析，生成详细的用户旅程地图文档，使用Markdown格式，包含：用户角色、使用场景、关键触点、用户情绪曲线、痛点和机会点。",
        contextStr
      ),
      generateDoc(
        "你是一位资深产品经理，请根据用户的项目描述和需求分析，生成完整的产品需求文档（PRD），使用Markdown格式，包含：产品概述、目标用户、核心功能列表、功能详细说明、非功能性需求、验收标准。",
        contextStr
      ),
      generateDoc(
        "你是一位资深前端架构师，请根据用户的项目描述和需求分析，生成详细的前端设计文档，使用Markdown格式，包含：技术选型、页面结构、组件设计、路由设计、状态管理方案、API接口调用规范。",
        contextStr
      ),
      generateDoc(
        "你是一位资深后端架构师，请根据用户的项目描述和需求分析，生成详细的后端设计文档，使用Markdown格式，包含：技术选型、系统架构、API接口设计（RESTful）、认证授权方案、第三方集成、部署方案。",
        contextStr
      ),
      generateDoc(
        "你是一位资深数据库架构师，请根据用户的项目描述和需求分析，生成详细的数据库设计文档，使用Markdown格式，包含：数据库选型、ER图（文字描述）、表结构设计（字段名、类型、约束、说明）、索引设计、数据迁移方案。",
        contextStr
      ),
    ]);

  const documents = {
    journey_map: journeyMap,
    prd,
    frontend_design: frontendDesign,
    backend_design: backendDesign,
    db_design: dbDesign,
  };

  return NextResponse.json({ documents });
}
