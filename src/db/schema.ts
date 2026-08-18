import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

// Blog posts and work projects share this table (`kind` discriminates them) since
// their shape is near-identical; work-only fields (images/link/team) stay nullable.
export const content = pgTable(
  "content",
  {
    id: serial("id").primaryKey(),
    kind: text("kind").notNull(), // "blog" | "work"
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    summary: text("summary").notNull(),
    content: text("content").notNull(), // MDX body
    image: text("image"), // cover image URL (Blob or external)
    images: jsonb("images").$type<string[]>().notNull().default([]),
    tag: text("tag"),
    link: text("link"),
    team: jsonb("team").$type<TeamMember[]>().notNull().default([]),
    published: boolean("published").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    views: integer("views").notNull().default(0),
    likes: integer("likes").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("content_kind_slug_idx").on(table.kind, table.slug)],
);

export const featureFlags = pgTable("feature_flags", {
  key: text("key").primaryKey(), // e.g. "/", "/about", "/work", "/blog", "/gallery"
  enabled: boolean("enabled").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  caption: text("caption"), // "context"
  orientation: text("orientation").notNull().default("horizontal"), // "horizontal" | "vertical"
  takenAt: timestamp("taken_at", { withTimezone: true }).notNull().defaultNow(), // "date"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Singleton row (id is always 1) for the home page's featured badge.
export const homeFeatured = pgTable("home_featured", {
  id: integer("id").primaryKey().default(1),
  display: boolean("display").notNull().default(true),
  label: text("label").notNull().default(""),
  description: text("description"),
  href: text("href"), // empty/null renders the badge as plain text, not a link
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
