"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Download,
  Archive,
  Save,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Eye,
  Code2,
} from "lucide-react";

interface QAPair {
  question: string;
  answer: string;
}

interface Documents {
  journey_map: string;
  prd: string;
  frontend_design: string;
  backend_design: string;
  db_design: string;
}

interface InitialData {
  id?: string;
  title?: string;
  description?: string;
  questions?: QAPair[];
  documents?: Documents;
}

const DOC_TABS = [
  { key: "journey_map", label: "用户旅程地图" },
  { key: "prd", label: "产品需求PRD" },
  { key: "frontend_design", label: "前端设计" },
  { key: "backend_design", label: "后端设计" },
  { key: "db_design", label: "数据库设计" },
] as const;

type DocKey = (typeof DOC_TABS)[number]["key"];

export function ProjectWizard({ initialData }: { initialData?: InitialData }) {
  const router = useRouter();

  const hasAllData =
    initialData?.description &&
    initialData?.questions?.length &&
    initialData?.documents;

  const [step, setStep] = useState<1 | 2 | 3>(hasAllData ? 3 : 1);
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [questions, setQuestions] = useState<string[]>(
    initialData?.questions?.map((q) => q.question) ?? []
  );
  const [answers, setAnswers] = useState<string[]>(
    initialData?.questions?.map((q) => q.answer) ?? []
  );
  const [documents, setDocuments] = useState<Documents | null>(
    initialData?.documents ?? null
  );
  const [projectId, setProjectId] = useState<string | null>(initialData?.id ?? null);

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCreditsDialog, setShowCreditsDialog] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocKey>("journey_map");
  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const qaPairs: QAPair[] = questions.map((q, i) => ({
    question: q,
    answer: answers[i] ?? "",
  }));

  async function goToStep2() {
    if (description.length < 20) return;
    setLoadingQuestions(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "获取问题失败");
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(""));
      setStep(2);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "请求失败，请重试");
    } finally {
      setLoadingQuestions(false);
    }
  }

  async function goToStep3() {
    const allAnswered = answers.every((a) => a.trim().length > 0);
    if (!allAnswered) return;

    const credRes = await fetch("/api/credits");
    const credData = await credRes.json();
    if (credData.credits <= 0) {
      setShowCreditsDialog(true);
      return;
    }

    setLoadingDocs(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, qaPairs }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "NO_CREDITS") {
          setShowCreditsDialog(true);
          return;
        }
        throw new Error(data.error || "生成文档失败");
      }
      setDocuments(data.documents);
      setStep(3);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "生成失败，请重试");
    } finally {
      setLoadingDocs(false);
    }
  }

  async function saveProject() {
    if (!documents) return;
    setSaving(true);
    setError(null);
    try {
      let id = projectId;
      if (!id) {
        const res = await fetch("/api/projects", { method: "POST" });
        const data = await res.json();
        id = data.projectId;
        setProjectId(id);
      }

      const title = description.slice(0, 50);
      await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          questions: qaPairs,
          documents,
          status: "completed",
        }),
      });

      router.push(`/projects/${id}`);
    } catch {
      setError("保存失败，请重试");
    } finally {
      setSaving(false);
    }
  }

  function downloadDoc(key: DocKey) {
    const doc = documents?.[key];
    if (!doc) return;
    const tab = DOC_TABS.find((t) => t.key === key);
    const blob = new Blob([doc], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab?.label ?? key}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadAll() {
    if (!documents) return;
    const zip = new JSZip();
    for (const tab of DOC_TABS) {
      const content = documents[tab.key];
      if (content) zip.file(`${tab.label}.md`, content);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vibeguide-docs.zip";
    a.click();
    URL.revokeObjectURL(url);
  }

  const stepProgress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {initialData?.id ? "查看项目" : "创建新项目"}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          使用AI Agent 辅助您完成专业的项目需求分析
        </p>
      </div>

      {/* Steps */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 text-sm font-medium">
          {(["描述项目", "深入需求", "创建文档"] as const).map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  i + 1 < step
                    ? "bg-primary text-primary-foreground"
                    : i + 1 === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={i + 1 === step ? "text-foreground" : "text-muted-foreground"}
              >
                {label}
              </span>
              {i < 2 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </div>
        <Progress value={stepProgress} className="h-1" />
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">详细描述你的项目</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请详细描述你想开发的项目，包括主要功能、目标用户、解决的问题等……（至少20个字）"
              className="min-h-[200px] resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {description.length} 字{description.length < 20 && "（至少20字）"}
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={goToStep2}
              disabled={description.length < 20 || loadingQuestions}
            >
              {loadingQuestions ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI 分析中…
                </>
              ) : (
                <>
                  下一步
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            AI 根据你的描述生成了以下问题，请逐一回答后继续。
          </p>
          {questions.map((q, i) => (
            <div key={i} className="space-y-2">
              <label className="block text-sm font-medium">
                {i + 1}. {q}
              </label>
              <Textarea
                value={answers[i] ?? ""}
                onChange={(e) => {
                  const next = [...answers];
                  next[i] = e.target.value;
                  setAnswers(next);
                }}
                placeholder="请回答此问题…"
                className="min-h-[100px] resize-none"
              />
            </div>
          ))}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ChevronLeft className="h-4 w-4" />
              上一步
            </Button>
            <Button
              onClick={goToStep3}
              disabled={answers.some((a) => !a.trim()) || loadingDocs}
            >
              {loadingDocs ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  生成文档中（约15秒）…
                </>
              ) : (
                <>
                  生成文档
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-4">
          {!documents ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  5类文档已生成完毕，可切换查看、下载或保存项目。
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => downloadDoc(activeDoc)}>
                    <Download className="h-4 w-4" />
                    下载当前
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadAll}>
                    <Archive className="h-4 w-4" />
                    批量下载
                  </Button>
                  <Button size="sm" onClick={saveProject} disabled={saving}>
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    保存项目
                  </Button>
                </div>
              </div>

              <Tabs
                value={activeDoc}
                onValueChange={(v) => setActiveDoc(v as DocKey)}
              >
                <TabsList className="flex-wrap h-auto gap-1">
                  {DOC_TABS.map((tab) => (
                    <TabsTrigger key={tab.key} value={tab.key}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {DOC_TABS.map((tab) => (
                  <TabsContent key={tab.key} value={tab.key}>
                    <div className="flex justify-end mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewMode(!previewMode)}
                      >
                        {previewMode ? (
                          <>
                            <Code2 className="h-4 w-4" />
                            源码
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            预览
                          </>
                        )}
                      </Button>
                    </div>
                    {previewMode ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border bg-card p-6 overflow-auto max-h-[600px]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {documents[tab.key]}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <Textarea
                        readOnly
                        value={documents[tab.key]}
                        className="min-h-[600px] font-mono text-xs resize-none"
                      />
                    )}
                  </TabsContent>
                ))}
              </Tabs>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ChevronLeft className="h-4 w-4" />
                  上一步
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* No Credits Dialog */}
      <Dialog open={showCreditsDialog} onOpenChange={setShowCreditsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>点数不足</DialogTitle>
            <DialogDescription>
              你的项目点数已用完，需要充值后才能继续生成文档。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreditsDialog(false)}>
              取消
            </Button>
            <Button onClick={() => router.push("/pricing")}>
              去充值
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
