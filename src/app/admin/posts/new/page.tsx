import { ContentForm } from "@/components/admin/ContentForm";
import { createContent } from "@/app/admin/content-actions";
import { BackLink } from "@/components/admin/BackLink";

export default function NewPostPage() {
  return (
    <>
      <BackLink href="/admin/posts" />
      <ContentForm kind="blog" action={createContent.bind(null, "blog")} />
    </>
  );
}
