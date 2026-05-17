"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle, FolderOpen, Loader2, Clock } from "lucide-react";

interface Project {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">我的项目</h1>
        <Button onClick={() => router.push("/projects/new")}>
          <PlusCircle className="h-4 w-4" />
          新建项目
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-sm">还没有项目，点击右上角新建一个吧</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              className="text-left rounded-lg border bg-card p-5 hover:border-primary/50 hover:bg-accent/30 transition-colors"
            >
              <p className="font-semibold line-clamp-2 mb-3">
                {project.title || "（未命名项目）"}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className={`px-2 py-0.5 rounded-full ${project.status === "completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                  {project.status === "completed" ? "已完成" : "草稿"}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(project.createdAt).toLocaleDateString("zh-CN")}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
