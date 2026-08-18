import { notFound } from "next/navigation";
import { ContentForm } from "@/components/admin/ContentForm";
import { updateContent } from "@/app/admin/content-actions";
import { getContentById } from "@/utils/content";
import { BackLink } from "@/components/admin/BackLink";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getContentById(Number(id));
  if (!row || row.kind !== "work") notFound();

  return (
    <>
      <BackLink href="/admin/projects" />
      <ContentForm
        kind="work"
        action={updateContent.bind(null, row.id, "work")}
        initial={{
          slug: row.slug,
          title: row.title,
          subtitle: row.subtitle ?? "",
          summary: row.summary,
          content: row.content,
          image: row.image ?? "",
          images: row.images.join(", "),
          tag: row.tag ?? "",
          link: row.link ?? "",
          published: row.published,
        }}
      />
    </>
  );
}
