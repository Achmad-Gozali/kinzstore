import type { ReactNode } from "react";
import { Info } from "lucide-react";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <main className="relative bg-gradient-theme pb-20 sm:pb-28 md:pb-36">
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-12 sm:pt-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Terakhir diperbarui: {lastUpdated}</p>

        {intro && <p className="mt-6 text-sm leading-relaxed text-foreground/90">{intro}</p>}

        <div className="mt-8 flex items-start gap-2.5 rounded-xl bg-secondary/30 p-4 text-xs leading-relaxed text-muted-foreground ring-1 ring-border/40">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            Dokumen ini adalah draf awal yang disusun secara umum untuk kebutuhan operasional KINZSTORE dan bukan
            merupakan nasihat hukum profesional. Pemilik website disarankan untuk meninjau ulang atau berkonsultasi
            dengan pihak legal sebelum situs ini benar-benar digunakan secara produksi.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">{section.heading}</h2>
              <div className="mt-2.5 space-y-2.5 text-sm leading-relaxed text-foreground/90">{section.body}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
