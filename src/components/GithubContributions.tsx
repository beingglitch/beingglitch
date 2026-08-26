import type { ContributionCalendar, ContributionDay } from "@/utils/github-contributions";
import { getGithubContributions } from "@/utils/github-contributions";
import { Column, Heading, Row, SmartLink, Text } from "@once-ui-system/core";
import styles from "./GithubContributions.module.scss";

// Geometry in SVG user units. The grid scales with its container, so these are
// proportions; `.grid` in the stylesheet sets the floor before it scrolls.
const CELL = 12;
const GAP = 4;
const STEP = CELL + GAP;
const DAYS_PER_WEEK = 7;
const LEFT = 32; // gutter for the Mon/Wed/Fri labels
const TOP = 20; // band for the month labels

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAY_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };

// Five steps like GitHub's, tinted with brand tokens instead of GitHub green so
// the card stays in the site's palette in both themes. The cut points come from
// the data (see `thresholds` in the util), not from fixed counts.
function levelClass(count: number, [first, second, third]: [number, number, number]) {
  if (count === 0) return styles.cell;
  if (count <= first) return styles.level1;
  if (count <= second) return styles.level2;
  if (count <= third) return styles.level3;
  return styles.level4;
}

// One label per month, placed on the first week that lands in it. The two-week
// floor keeps a partial first week from colliding with the next month's label.
function monthLabels(weeks: ContributionDay[][]) {
  const labels: { key: string; x: number; text: string }[] = [];
  let lastMonth = "";
  let lastIndex = -2;

  weeks.forEach((week, index) => {
    const first = week[0];
    if (!first) return;
    const month = first.date.slice(5, 7);
    if (month === lastMonth || index - lastIndex < 2) return;
    lastMonth = month;
    lastIndex = index;
    labels.push({
      key: first.date,
      x: LEFT + index * STEP,
      text: MONTHS[Number(month) - 1],
    });
  });

  return labels;
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <Column gap="4" horizontal="end">
      <Row gap="4" vertical="end">
        <Text variant="heading-strong-l">{value}</Text>
        <Text variant="body-default-m" onBackground="neutral-weak">
          d
        </Text>
      </Row>
      <Text variant="label-default-xs" onBackground="neutral-weak">
        {label}
      </Text>
    </Column>
  );
}

export async function GithubContributions() {
  const data = await getGithubContributions();
  if (!data || data.weeks.length === 0) return null;
  return <ContributionCard data={data} />;
}

export function ContributionCard({ data }: { data: ContributionCalendar }) {
  const width = LEFT + data.weeks.length * STEP - GAP;
  const height = TOP + DAYS_PER_WEEK * STEP - GAP;
  const total = data.total.toLocaleString("en-US");

  return (
    <Column
      fillWidth
      background="surface"
      border="neutral-alpha-weak"
      radius="l"
      padding="l"
      gap="24"
    >
      <Row fillWidth horizontal="between" vertical="start" gap="24" wrap>
        <Column gap="4">
          <Heading as="h2" variant="heading-strong-l">
            Still shipping
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {total} contributions in the last year
          </Text>
        </Column>
        <Row gap="40">
          <Stat value={data.currentStreak} label="CURRENT STREAK" />
          <Stat value={data.longestStreak} label="LONGEST STREAK" />
        </Row>
      </Row>

      <div className={styles.scroller}>
        <svg
          className={styles.grid}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${total} GitHub contributions in the last year`}
        >
          {monthLabels(data.weeks).map((label) => (
            <text key={label.key} className={styles.label} x={label.x} y={12}>
              {label.text}
            </text>
          ))}
          {Object.entries(WEEKDAY_LABELS).map(([weekday, text]) => (
            <text
              key={weekday}
              className={styles.label}
              x={LEFT - 8}
              y={TOP + Number(weekday) * STEP + 10}
              textAnchor="end"
            >
              {text}
            </text>
          ))}
          {data.weeks.map((week, weekIndex) =>
            week.map((day) => (
              <rect
                key={day.date}
                x={LEFT + weekIndex * STEP}
                y={TOP + day.weekday * STEP}
                width={CELL}
                height={CELL}
                rx="3"
                className={levelClass(day.count, data.thresholds)}
              >
                <title>{`${day.count} contributions on ${day.date}`}</title>
              </rect>
            )),
          )}
        </svg>
      </div>

      <Row fillWidth horizontal="between" vertical="center" gap="16" wrap>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Public commits, PRs and reviews on{" "}
          <SmartLink href={data.profileUrl}>@{data.username}</SmartLink>
        </Text>
        <Row gap="8" vertical="center">
          <Text variant="label-default-xs" onBackground="neutral-weak">
            Less
          </Text>
          <span className={styles.swatch} />
          <span className={`${styles.swatch} ${styles.swatch1}`} />
          <span className={`${styles.swatch} ${styles.swatch2}`} />
          <span className={`${styles.swatch} ${styles.swatch3}`} />
          <span className={`${styles.swatch} ${styles.swatch4}`} />
          <Text variant="label-default-xs" onBackground="neutral-weak">
            More
          </Text>
        </Row>
      </Row>
    </Column>
  );
}
