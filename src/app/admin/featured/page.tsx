import { Column, Heading } from "@once-ui-system/core";
import { getHomeFeaturedAdmin } from "@/utils/home-featured";
import { FeaturedForm } from "@/components/admin/FeaturedForm";
import { updateFeatured } from "@/app/admin/featured/actions";
import { BackLink } from "@/components/admin/BackLink";

export default async function AdminFeaturedPage() {
  const row = await getHomeFeaturedAdmin();

  return (
    <Column fillWidth maxWidth="s" gap="16" paddingY="40">
      <BackLink href="/admin" />
      <Heading variant="display-strong-s">Home badge</Heading>
      <FeaturedForm
        action={updateFeatured}
        initial={{
          display: row?.display ?? false,
          label: row?.label ?? "",
          description: row?.description ?? "",
          href: row?.href ?? "",
        }}
      />
    </Column>
  );
}
