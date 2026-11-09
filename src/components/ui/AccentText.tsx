import { parseAccent } from "@/lib/utils";

/** Renders `*word*` as the italic display accent. */
export function AccentText({ text }: { text: string }) {
  return (
    <>
      {parseAccent(text).map((p, i) =>
        p.accent ? (
          <em key={i} className="font-display italic tracking-[-0.01em]">
            {p.text}
          </em>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}
