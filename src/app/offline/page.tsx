import { Column, Heading, Text } from "@once-ui-system/core";

export default function Offline() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        Offline
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        No connection
      </Heading>
      <Text onBackground="neutral-weak">
        This page has not been visited yet. Reconnect to load it.
      </Text>
    </Column>
  );
}
