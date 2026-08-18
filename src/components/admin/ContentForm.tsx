"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { Button, Column, Input, Row, Switch, Text, Textarea } from "@once-ui-system/core";
import { MdEditorField } from "@/components/admin/MdEditorField";
import type { ContentKind } from "@/utils/content";

type ContentFormValues = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  image: string;
  images: string;
  tag: string;
  link: string;
  published: boolean;
};

const EMPTY: ContentFormValues = {
  slug: "",
  title: "",
  subtitle: "",
  summary: "",
  content: "",
  image: "",
  images: "",
  tag: "",
  link: "",
  published: false,
};

export function ContentForm({
  kind,
  action,
  initial,
}: {
  kind: ContentKind;
  action: (formData: FormData) => Promise<void>;
  initial?: Partial<ContentFormValues>;
}) {
  const [values, setValues] = useState<ContentFormValues>({ ...EMPTY, ...initial });
  const [uploading, setUploading] = useState(false);

  const set = <K extends keyof ContentFormValues>(key: K, value: ContentFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      set("image", blob.url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form action={action}>
      <Column fillWidth maxWidth="l" gap="16" paddingY="24">
        <Input
          id="title"
          name="title"
          label="Title"
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          required
        />
        <Input
          id="slug"
          name="slug"
          label="Slug"
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          required
        />
        <Input
          id="subtitle"
          name="subtitle"
          label="Subtitle"
          value={values.subtitle}
          onChange={(e) => set("subtitle", e.target.value)}
        />
        <Textarea
          id="summary"
          name="summary"
          label="Summary"
          lines={2}
          value={values.summary}
          onChange={(e) => set("summary", e.target.value)}
          required
        />
        <Input
          id="tag"
          name="tag"
          label="Tag"
          value={values.tag}
          onChange={(e) => set("tag", e.target.value)}
        />

        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Cover image
          </Text>
          <Input
            id="image"
            name="image"
            label="Image URL"
            placeholder="Paste a URL, or upload below"
            value={values.image}
            onChange={(e) => set("image", e.target.value)}
          />
          <Row gap="8" vertical="center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
            {uploading && <Text variant="body-default-s">Uploading…</Text>}
          </Row>
        </Column>

        {kind === "work" && (
          <>
            <Input
              id="link"
              name="link"
              label="External link"
              value={values.link}
              onChange={(e) => set("link", e.target.value)}
            />
            <Input
              id="images"
              name="images"
              label="Gallery image URLs (comma-separated)"
              value={values.images}
              onChange={(e) => set("images", e.target.value)}
            />
          </>
        )}

        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Content (MDX)
          </Text>
          <MdEditorField value={values.content} onChange={(v) => set("content", v)} />
          <input type="hidden" name="content" value={values.content} />
        </Column>

        <Row gap="8" vertical="center">
          <Switch
            isChecked={values.published}
            onToggle={() => set("published", !values.published)}
            ariaLabel="Published"
          />
          <Text>Published</Text>
          <input type="hidden" name="published" value={values.published ? "on" : ""} />
        </Row>

        <Row>
          <Button type="submit">Save</Button>
        </Row>
      </Column>
    </form>
  );
}
