import { Fragment } from "react";

// Renders a plain-text string (as stored/edited in the admin panel) with its
// newlines turned into <br/>, matching how the old hardcoded JSX used <br/>.
export function TextWithBreaks({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
