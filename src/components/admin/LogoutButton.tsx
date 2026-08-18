"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@once-ui-system/core";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} loading={loading} variant="secondary" size="s">
      Log out
    </Button>
  );
}
