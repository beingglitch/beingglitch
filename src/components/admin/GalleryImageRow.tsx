"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Column, Row, Text } from "@once-ui-system/core";
import { deleteGalleryImage } from "@/app/admin/gallery/actions";

export function GalleryImageRow({
  id,
  url,
  caption,
  takenAt,
}: {
  id: number;
  url: string;
  caption: string | null;
  takenAt: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Delete this photo?")) return;
    startTransition(async () => {
      await deleteGalleryImage(id);
      router.refresh();
    });
  };

  return (
    <Row fillWidth gap="12" vertical="center" border="neutral-alpha-weak" radius="m" padding="8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={caption ?? ""} width={64} height={64} style={{ objectFit: "cover", borderRadius: 8 }} />
      <Column flex={1} gap="4">
        <Text>{caption || "—"}</Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {new Date(takenAt).toLocaleDateString()}
        </Text>
      </Column>
      <Button onClick={handleDelete} size="s" variant="danger" loading={isPending}>
        Delete
      </Button>
    </Row>
  );
}
