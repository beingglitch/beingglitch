import { Column, Heading, Row, SmartLink, Text } from "@once-ui-system/core";
import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { content as contentTable, galleryImages } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/admin-guard";
import { LoginForm } from "@/components/admin/LoginForm";
import { LogoutButton } from "@/components/admin/LogoutButton";

async function getSummary() {
  const db = getDb();
  const [row] = await db
    .select({
      posts: sql<number>`count(*) filter (where ${contentTable.kind} = 'blog')`,
      projects: sql<number>`count(*) filter (where ${contentTable.kind} = 'work')`,
      views: sql<number>`coalesce(sum(${contentTable.views}), 0)`,
      likes: sql<number>`coalesce(sum(${contentTable.likes}), 0)`,
    })
    .from(contentTable);
  const [galleryRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(galleryImages);

  return { ...row, gallery: galleryRow?.count ?? 0 };
}

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <LoginForm />;
  }

  const summary = await getSummary();

  return (
    <Column fillWidth maxWidth="m" gap="24" paddingY="40">
      <Row fillWidth horizontal="between" vertical="center">
        <Heading variant="display-strong-s">Admin</Heading>
        <LogoutButton />
      </Row>

      <Row gap="16" wrap>
        <Column border="neutral-medium" radius="m" padding="16" gap="4" minWidth={12}>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Posts
          </Text>
          <Text variant="heading-strong-l">{summary.posts}</Text>
        </Column>
        <Column border="neutral-medium" radius="m" padding="16" gap="4" minWidth={12}>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Projects
          </Text>
          <Text variant="heading-strong-l">{summary.projects}</Text>
        </Column>
        <Column border="neutral-medium" radius="m" padding="16" gap="4" minWidth={12}>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Gallery images
          </Text>
          <Text variant="heading-strong-l">{summary.gallery}</Text>
        </Column>
        <Column border="neutral-medium" radius="m" padding="16" gap="4" minWidth={12}>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Total views
          </Text>
          <Text variant="heading-strong-l">{summary.views}</Text>
        </Column>
        <Column border="neutral-medium" radius="m" padding="16" gap="4" minWidth={12}>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Total likes
          </Text>
          <Text variant="heading-strong-l">{summary.likes}</Text>
        </Column>
      </Row>

      <Row gap="12" wrap>
        <SmartLink href="/admin/posts">Manage posts</SmartLink>
        <SmartLink href="/admin/projects">Manage projects</SmartLink>
        <SmartLink href="/admin/gallery">Manage gallery</SmartLink>
        <SmartLink href="/admin/flags">Feature flags</SmartLink>
        <SmartLink href="/admin/featured">Home badge</SmartLink>
        <SmartLink href="/admin/copy">Site copy</SmartLink>
      </Row>
    </Column>
  );
}
