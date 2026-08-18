import { Column, Heading } from "@once-ui-system/core";
import { getAllFlags } from "@/utils/flags";
import { FlagRow } from "@/components/admin/FlagRow";
import { BackLink } from "@/components/admin/BackLink";

export default async function AdminFlagsPage() {
  const flags = await getAllFlags();

  return (
    <Column fillWidth maxWidth="s" gap="16" paddingY="40">
      <BackLink href="/admin" />
      <Heading variant="display-strong-s">Feature flags</Heading>
      <Column fillWidth border="neutral-medium" radius="m" padding="16">
        {flags.map((flag) => (
          <FlagRow key={flag.key} flagKey={flag.key} enabled={flag.enabled} />
        ))}
      </Column>
    </Column>
  );
}
