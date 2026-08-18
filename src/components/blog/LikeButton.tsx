"use client";

import { useState } from "react";
import { Row, Text, ToggleButton } from "@once-ui-system/core";
import type { ContentKind } from "@/utils/content";

export function LikeButton({
  kind,
  slug,
  initialLikes,
  initiallyLiked,
}: {
  kind: ContentKind;
  slug: string;
  initialLikes: number;
  initiallyLiked: boolean;
}) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [pending, setPending] = useState(false);

  const toggle = async () => {
    if (pending) return;
    setPending(true);
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes((l) => l + (nextLiked ? 1 : -1));

    const response = await fetch(`/api/content/${kind}/${slug}/like`, {
      method: nextLiked ? "POST" : "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      if (typeof data.likes === "number") setLikes(data.likes);
    }
    setPending(false);
  };

  return (
    <Row gap="8" vertical="center">
      <ToggleButton prefixIcon="heart" selected={liked} onClick={toggle} />
      <Text variant="body-default-s" onBackground="neutral-weak">
        {likes}
      </Text>
    </Row>
  );
}
