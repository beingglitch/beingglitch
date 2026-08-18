"use client";

import { useState } from "react";
import { Button, Column, Input, Row, Switch, Text } from "@once-ui-system/core";

type FeaturedValues = {
  display: boolean;
  label: string;
  description: string;
  href: string;
};

export function FeaturedForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial: FeaturedValues;
}) {
  const [values, setValues] = useState<FeaturedValues>(initial);
  const set = <K extends keyof FeaturedValues>(key: K, value: FeaturedValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  return (
    <form action={action}>
      <Column maxWidth="s" gap="16" paddingY="24">
        <Row gap="8" vertical="center">
          <Switch
            isChecked={values.display}
            onToggle={() => set("display", !values.display)}
            ariaLabel="Show badge"
          />
          <Text>Show badge on home page</Text>
          <input type="hidden" name="display" value={values.display ? "on" : ""} />
        </Row>
        <Input
          id="label"
          name="label"
          label="Label"
          placeholder="e.g. fabricOS"
          value={values.label}
          onChange={(e) => set("label", e.target.value)}
          required
        />
        <Input
          id="description"
          name="description"
          label="Description (optional)"
          placeholder="e.g. Multi-robot ground control"
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
        />
        <Input
          id="href"
          name="href"
          label="Link (optional — leave empty for no link)"
          placeholder="/work/fabricos"
          value={values.href}
          onChange={(e) => set("href", e.target.value)}
        />
        <Row>
          <Button type="submit">Save</Button>
        </Row>
      </Column>
    </form>
  );
}
