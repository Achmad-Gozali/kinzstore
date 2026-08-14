import { Trophy } from "lucide-react";

const PERIODS = ["Top 10 - Hari Ini", "Top 10 - Minggu Ini", "Top 10 - Bulan Ini"];

function LeaderboardCard({ label }: { label: string }) {
  return (
    <div>
      <h2 className="ml-3 inline-flex rounded-t-md border border-b-0 border-border bg-muted px-4 py-1 text-xs leading-6 text-foreground">
        {label}
      </h2>
      <div className="relative rounded-lg bg-muted/50 p-6 ring-1 ring-muted">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Trophy className="size-8 text-muted-foreground" />
          <h3 className="mt-3 font-semibold text-foreground">Belum ada data transaksi</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Leaderboard akan tampil setelah ada transaksi pada periode ini.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <main className="relative bg-gradient-theme pb-20 sm:pb-28 md:pb-36">
      <section className="relative pb-12 pt-16 sm:pt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Leaderboard</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Top 10 Pembelian Terbanyak di KINZSTORE
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-7 text-foreground sm:text-lg sm:leading-8">
            Berikut ini adalah daftar 10 pembelian terbanyak yang dilakukan oleh pelanggan kami.
            Data ini diambil dari sistem kami dan selalu diperbaharui.
          </p>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:grid-cols-2 lg:mx-0 lg:max-w-none xl:grid-cols-3">
            {PERIODS.map((label) => (
              <LeaderboardCard key={label} label={label} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
