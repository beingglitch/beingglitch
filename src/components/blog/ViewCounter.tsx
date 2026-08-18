"use client";

import { useEffect, useState } from "react";
import { Icon, Row, Text } from "@once-ui-system/core";
import type { ContentKind } from "@/utils/content";

export function ViewCounter({
  kind,
  slug,
  initialViews,
}: {
  kind: ContentKind;
  slug: string;
  initialViews: number;
}) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    fetch(`/api/content/${kind}/${slug}/view`, { method: "POST", keepalive: true });
    setViews((v) => v + 1);
    // Fire once per mount only — not on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row gap="4" vertical="center">
      <Icon name="eye" size="s" onBackground="neutral-weak" />
      <Text variant="body-default-s" onBackground="neutral-weak">
        {views}
      </Text>
    </Row>
  );
}
