import { Row, SmartLink, Text } from "@once-ui-system/core";

export function BackLink({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <SmartLink href={href}>
      <Row gap="4" vertical="center">
        <Text variant="label-default-s">←</Text>
        <Text variant="label-default-s">{label}</Text>
      </Row>
    </SmartLink>
  );
}
