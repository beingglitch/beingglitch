// Every /admin page reads live DB state (posts, flags, gallery) and must never
// be statically prerendered — a stale build-time snapshot would defeat the point
// of a live admin panel.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
