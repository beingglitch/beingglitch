"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Row, Switch, Button } from "@once-ui-system/core";
import { deleteContent, togglePublish } from "@/app/admin/content-actions";
import type { ContentKind } from "@/utils/content";

export function ContentRowActions({
  id,
  kind,
  slug,
  published,
  editHref,
}: {
  id: number;
  kind: ContentKind;
  slug: string;
  published: boolean;
  editHref: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [checked, setChecked] = useState(published);

  const handleToggle = () => {
    const next = !checked;
    setChecked(next);
    startTransition(async () => {
      await togglePublish(id, kind, slug, next);
      router.refresh();
    });
  };

  const handleDelete = () => {
    if (!confirm(`Delete "${slug}"? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteContent(id, kind, slug);
      router.refresh();
    });
  };

  return (
    <Row gap="12" vertical="center">
      <Switch isChecked={checked} onToggle={handleToggle} ariaLabel="Published" />
      <Button href={editHref} size="s" variant="secondary">
        Edit
      </Button>
      <Button onClick={handleDelete} size="s" variant="danger" loading={isPending}>
        Delete
      </Button>
    </Row>
  );
}
