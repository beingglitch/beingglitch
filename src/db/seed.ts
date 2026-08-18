import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDb } from "./index";
import { content, featureFlags } from "./schema";

// Mirrors `routes` in src/resources/once-ui.config.ts. Not imported directly: that
// module pulls in @once-ui-system/core (SCSS/React), which only works inside Next's
// build pipeline, not a standalone Node/tsx script.
const routes: Record<string, boolean> = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": false,
};

async function seedFeatureFlags() {
  const db = getDb();
  for (const [key, enabled] of Object.entries(routes)) {
    await db
      .insert(featureFlags)
      .values({ key, enabled })
      .onConflictDoNothing({ target: featureFlags.key });
  }
  console.log(`Seeded ${Object.keys(routes).length} feature flags.`);
}

async function seedWorkProjects() {
  const db = getDb();
  const projectsDir = path.join(process.cwd(), "src", "app", "work", "projects");
  const files = fs.readdirSync(projectsDir).filter((file) => path.extname(file) === ".mdx");

  for (const file of files) {
    const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const { data, content: mdxBody } = matter(raw);
    const slug = path.basename(file, path.extname(file));

    await db
      .insert(content)
      .values({
        kind: "work",
        slug,
        title: data.title || "",
        subtitle: data.subtitle || null,
        summary: data.summary || "",
        content: mdxBody,
        image: data.image || null,
        images: data.images || [],
        tag: data.tag || null,
        link: data.link || null,
        team: data.team || [],
        published: true,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      })
      .onConflictDoNothing({ target: [content.kind, content.slug] });
  }
  console.log(`Seeded ${files.length} work projects.`);
}

async function main() {
  await seedFeatureFlags();
  await seedWorkProjects();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
