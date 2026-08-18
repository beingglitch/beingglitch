"use client";

import { useState } from "react";
import { Button, Column, Row, Text, Textarea } from "@once-ui-system/core";

type CopyValues = {
  homeHeadline: string;
  homeSubline: string;
  aboutIntro: string;
};

export function SiteCopyForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial: CopyValues;
}) {
  const [values, setValues] = useState<CopyValues>(initial);
  const set = <K extends keyof CopyValues>(key: K, value: CopyValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  return (
    <form action={action}>
      <Column maxWidth="s" gap="20" paddingY="24">
        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Home headline
          </Text>
          <Textarea
            id="homeHeadline"
            name="homeHeadline"
            lines={2}
            value={values.homeHeadline}
            onChange={(e) => set("homeHeadline", e.target.value)}
          />
          <Text variant="body-default-xs" onBackground="neutral-weak">
            A line break here becomes a line break on the page.
          </Text>
        </Column>

        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Home subline
          </Text>
          <Textarea
            id="homeSubline"
            name="homeSubline"
            lines={4}
            value={values.homeSubline}
            onChange={(e) => set("homeSubline", e.target.value)}
          />
          <Text variant="body-default-xs" onBackground="neutral-weak">
            Use the literal text "{"{years}"}" anywhere you want your years-of-experience number
            to appear — it updates automatically.
          </Text>
        </Column>

        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            About intro
          </Text>
          <Textarea
            id="aboutIntro"
            name="aboutIntro"
            lines={8}
            value={values.aboutIntro}
            onChange={(e) => set("aboutIntro", e.target.value)}
          />
          <Text variant="body-default-xs" onBackground="neutral-weak">
            Same "{"{years}"}" placeholder works here too.
          </Text>
        </Column>

        <Row>
          <Button type="submit">Save</Button>
        </Row>
      </Column>
    </form>
  );
}
