import { connection } from "next/server";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { ProjectWizard } from "@/components/project-wizard";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) notFound();

  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, data.user.id)));

  if (!project) notFound();

  return (
    <ProjectWizard
      initialData={{
        id: project.id,
        title: project.title,
        description: project.description,
        questions: (project.questions as { question: string; answer: string }[]) ?? undefined,
        documents: project.documents as {
          journey_map: string;
          prd: string;
          frontend_design: string;
          backend_design: string;
          db_design: string;
        } ?? undefined,
      }}
    />
  );
}
