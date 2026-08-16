import Link from "next/link";
import type { GameDetail } from "@/types/game";

export function DescriptionSection({ detail }: { detail: GameDetail }) {
  return (
    <div className="overflow-hidden rounded-xl bg-card/40 ring-1 ring-border/40">
      <div className="bg-muted/60 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide">
        {detail.descriptionTitle}
      </div>
      <div className="bg-secondary/30 p-4 text-sm leading-relaxed text-foreground/90">
        <p>{detail.descriptionIntro}</p>
        <ol className="mt-1 list-none">
          {detail.descriptionSteps.map((step) =>
            typeof step === "string" ? (
              <li key={step}>{step}</li>
            ) : (
              <li key={step.text}>
                {step.text}{" "}
                <Link href={step.linkHref} className="text-primary hover:underline">
                  {step.linkText}
                </Link>
              </li>
            )
          )}
        </ol>
      </div>
    </div>
  );
}
