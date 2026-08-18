"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { Button, Column, Input, Row, Text } from "@once-ui-system/core";
import { addGalleryImage } from "@/app/admin/gallery/actions";

export function GalleryUploadForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [takenAt, setTakenAt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      setUrl(blob.url);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!url) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.set("url", url);
    formData.set("caption", caption);
    formData.set("orientation", orientation);
    formData.set("takenAt", takenAt);
    await addGalleryImage(formData);
    setSubmitting(false);
    setUrl("");
    setCaption("");
    setTakenAt("");
    router.refresh();
  };

  return (
    <Column fillWidth border="neutral-medium" radius="m" padding="16" gap="12">
      <Text variant="label-default-s" onBackground="neutral-weak">
        Add a photo
      </Text>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {uploading && <Text variant="body-default-s">Uploading…</Text>}
      {url && (
        <Text variant="body-default-s" onBackground="neutral-weak">
          Uploaded: {url}
        </Text>
      )}
      <Input
        id="gallery-caption"
        label="Context / caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Row gap="12" wrap>
        <label>
          Date{" "}
          <input type="date" value={takenAt} onChange={(e) => setTakenAt(e.target.value)} />
        </label>
        <label>
          Orientation{" "}
          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as "horizontal" | "vertical")}
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </label>
      </Row>
      <Row>
        <Button onClick={handleSubmit} disabled={!url} loading={submitting}>
          Add to gallery
        </Button>
      </Row>
    </Column>
  );
}
