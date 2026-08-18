import { ContentForm } from "@/components/admin/ContentForm";
import { createContent } from "@/app/admin/content-actions";
import { BackLink } from "@/components/admin/BackLink";

export default function NewProjectPage() {
  return (
    <>
      <BackLink href="/admin/projects" />
      <ContentForm kind="work" action={createContent.bind(null, "work")} />
    </>
  );
}
