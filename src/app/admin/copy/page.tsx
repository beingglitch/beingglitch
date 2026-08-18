import { Column, Heading } from "@once-ui-system/core";
import { getSiteCopyAdmin } from "@/utils/site-copy";
import { SiteCopyForm } from "@/components/admin/SiteCopyForm";
import { updateSiteCopy } from "@/app/admin/copy/actions";
import { BackLink } from "@/components/admin/BackLink";

export default async function AdminCopyPage() {
  const row = await getSiteCopyAdmin();

  return (
    <Column fillWidth maxWidth="s" gap="16" paddingY="40">
      <BackLink href="/admin" />
      <Heading variant="display-strong-s">Site copy</Heading>
      <SiteCopyForm
        action={updateSiteCopy}
        initial={{
          homeHeadline: row?.homeHeadline ?? "",
          homeSubline: row?.homeSubline ?? "",
          aboutIntro: row?.aboutIntro ?? "",
        }}
      />
    </Column>
  );
}
