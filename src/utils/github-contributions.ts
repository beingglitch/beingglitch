import "server-only";
import { social } from "@/resources";
import { unstable_cache } from "next/cache";

export type ContributionDay = {
  date: string;
  count: number;
  /** 0 = Sunday .. 6 = Saturday. GitHub's first and last weeks are partial. */
  weekday: number;
};

export type ContributionCalendar = {
  username: string;
  profileUrl: string;
  total: number;
  currentStreak: number;
  longestStreak: number;
  /** Upper bound of each of the first three intensity steps, ascending. */
  thresholds: [number, number, number];
  /** One entry per week, oldest first. */
  weeks: ContributionDay[][];
};

const ENDPOINT = "https://api.github.com/graphql";

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { date contributionCount weekday }
        }
      }
    }
  }
}`;

// The profile URL is already in the socials list; parse the handle out of it so
// the username isn't duplicated in two places.
function githubProfile() {
  const entry = social.find((item) => item.name === "GitHub");
  const profileUrl = entry?.link;
  if (!profileUrl) return null;
  const username = profileUrl.split("/").filter(Boolean).pop();
  return username ? { username, profileUrl } : null;
}

// ISO date strings sort and compare lexicographically, so streaks are computed
// without constructing Date objects (and without the timezone bugs that brings).
function streaks(weeks: ContributionDay[][]) {
  const today = new Date().toISOString().slice(0, 10);
  // GitHub pads the final week out to Saturday; those future days are always 0
  // and would otherwise read as a broken streak.
  const days = weeks.flat().filter((day) => day.date <= today);

  let longest = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }

  // A quiet today doesn't end the streak — it hasn't finished yet.
  let index = days.length - 1;
  if (index >= 0 && days[index].count === 0) index -= 1;
  let current = 0;
  while (index >= 0 && days[index].count > 0) {
    current += 1;
    index -= 1;
  }

  return { currentStreak: current, longestStreak: longest };
}

// GitHub scales the four shades to each account's own distribution, which is why
// its grids never read as uniformly dim. Fixed buckets would put nearly every day
// of a ~1-a-day year in the faintest step, so derive them from the quartiles of
// the active days instead.
function thresholds(weeks: ContributionDay[][]): [number, number, number] {
  const counts = weeks
    .flat()
    .map((day) => day.count)
    .filter((count) => count > 0)
    .sort((a, b) => a - b);
  if (counts.length === 0) return [1, 2, 3];

  const at = (p: number) => counts[Math.min(counts.length - 1, Math.floor(counts.length * p))];
  const first = at(0.25);
  // A long tail of 1-contribution days collapses the quartiles onto each other;
  // nudge them apart so all four shades stay reachable.
  const second = Math.max(at(0.5), first + 1);
  const third = Math.max(at(0.75), second + 1);
  return [first, second, third];
}

async function fetchContributions(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  const profile = githubProfile();
  // No token configured (local dev, forks) — the section just doesn't render.
  if (!token || !profile) return null;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: profile.username } }),
      // unstable_cache owns the caching here.
      cache: "no-store",
    });
    if (!res.ok) return null;

    const json = await res.json();
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const weeks: ContributionDay[][] = (calendar.weeks ?? []).map(
      (week: { contributionDays: unknown[] }) =>
        week.contributionDays.map((day) => {
          const d = day as { date: string; contributionCount: number; weekday: number };
          return { date: d.date, count: d.contributionCount, weekday: d.weekday };
        }),
    );

    return {
      username: profile.username,
      profileUrl: profile.profileUrl,
      total: calendar.totalContributions ?? 0,
      ...streaks(weeks),
      thresholds: thresholds(weeks),
      weeks,
    };
  } catch {
    return null;
  }
}

export const getGithubContributions = unstable_cache(fetchContributions, ["github-contributions"], {
  revalidate: 3600,
  tags: ["github-contributions"],
});
