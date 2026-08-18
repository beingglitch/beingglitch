"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Row, Switch, Text } from "@once-ui-system/core";
import { toggleFlag } from "@/app/admin/flags/actions";

export function FlagRow({ flagKey, enabled }: { flagKey: string; enabled: boolean }) {
  const router = useRouter();
  const [checked, setChecked] = useState(enabled);
  const [, startTransition] = useTransition();

  const handleToggle = () => {
    const next = !checked;
    setChecked(next);
    startTransition(async () => {
      await toggleFlag(flagKey, next);
      router.refresh();
    });
  };

  return (
    <Row fillWidth horizontal="between" vertical="center" paddingY="8">
      <Text>{flagKey}</Text>
      <Switch isChecked={checked} onToggle={handleToggle} ariaLabel={flagKey} />
    </Row>
  );
}
