import { Column, Heading, Row, SmartLink, Table, Text } from "@once-ui-system/core";
import { getAllContent, type ContentKind } from "@/utils/content";
import { ContentRowActions } from "@/components/admin/ContentRowActions";
import { BackLink } from "@/components/admin/BackLink";

const LABELS: Record<ContentKind, { title: string; newHref: string; editBase: string }> = {
  blog: { title: "Posts", newHref: "/admin/posts/new", editBase: "/admin/posts" },
  work: { title: "Projects", newHref: "/admin/projects/new", editBase: "/admin/projects" },
};

export async function ContentList({ kind }: { kind: ContentKind }) {
  const rows = await getAllContent(kind);
  const labels = LABELS[kind];

  return (
    <Column fillWidth maxWidth="l" gap="24" paddingY="40">
      <BackLink href="/admin" />
      <Row fillWidth horizontal="between" vertical="center">
        <Heading variant="display-strong-s">{labels.title}</Heading>
        <SmartLink href={labels.newHref}>New</SmartLink>
      </Row>

      {rows.length === 0 ? (
        <Text onBackground="neutral-weak">Nothing here yet.</Text>
      ) : (
        <Table
          data={{
            headers: [
              { content: "Title", key: "title" },
              { content: "Views", key: "views" },
              { content: "Likes", key: "likes" },
              { content: "", key: "actions" },
            ],
            rows: rows.map((row) => [
              row.title,
              row.views,
              row.likes,
              <ContentRowActions
                key={row.id}
                id={row.id}
                kind={kind}
                slug={row.slug}
                published={row.published}
                editHref={`${labels.editBase}/${row.id}/edit`}
              />,
            ]),
          }}
        />
      )}
    </Column>
  );
}
