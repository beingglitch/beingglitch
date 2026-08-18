"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Column, Heading, PasswordInput } from "@once-ui-system/core";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setSubmitting(false);

    if (response.ok) {
      setError(undefined);
      router.refresh();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <Column paddingY="128" maxWidth={24} gap="24" center>
      <Heading align="center" wrap="balance">
        Admin
      </Heading>
      <Column fillWidth gap="8" horizontal="center">
        <PasswordInput
          id="admin-password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={error}
        />
        <Button onClick={handleSubmit} loading={submitting}>
          Submit
        </Button>
      </Column>
    </Column>
  );
}
