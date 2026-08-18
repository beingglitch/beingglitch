import { getPublishedContent } from "@/utils/content";
import { getRoutes } from "@/utils/flags";
import { baseURL } from "@/resources";

export default async function sitemap() {
  const [blogs, works, routesConfig] = await Promise.all([
    getPublishedContent("blog"),
    getPublishedContent("work"),
    getRoutes(),
  ]);

  const blogUrls = blogs.map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const workUrls = works.map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route]);

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogUrls, ...workUrls];
}
