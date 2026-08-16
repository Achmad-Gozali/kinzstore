"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Zap, Info, ChevronDown, Plus, Minus, Star, Headset, CircleAlert, Ticket, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GameDetail, NominalVariant, PaymentGroup, PaymentOption } from "@/types/game";

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

function StepCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-card/40 ring-1 ring-border/40">
      <div className="flex items-stretch">
        <div className="flex w-9 shrink-0 items-center justify-center bg-primary text-sm font-bold text-primary-foreground">
          {step}
        </div>
        <h2 className="flex flex-1 items-center bg-muted/60 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide">
          {title}
        </h2>
      </div>
      <div className="bg-secondary/30 p-4">{children}</div>
    </div>
  );
}

function NominalCard({
  item,
  selected,
  onSelect,
}: {
  item: NominalVariant;
  selected: boolean;
  onSelect: () => void;
}) {
  const iconSrc = item.icon === undefined ? "/images/diamond-icon.png" : item.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex flex-col justify-between rounded-lg bg-card/60 text-left ring-1 ring-transparent transition hover:ring-primary",
        selected && "ring-2 ring-primary"
      )}
    >
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-semibold">{item.name}</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-primary">
          {iconSrc && <Image src={iconSrc} alt="" width={16} height={16} className="size-4" />} Rp{" "}
          {formatIDR(item.price)}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-border/30 px-3 py-1.5">
        {item.instant ? (
          <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
            <Zap className="size-3" /> Pengiriman Instan
          </span>
        ) : (
          <span />
        )}
        {item.note && (
          <span title={item.note} className="text-muted-foreground">
            <Info className="size-3.5" />
          </span>
        )}
      </div>
    </button>
  );
}

function PaymentOptionCard({
  option,
  selected,
  onSelect,
}: {
  option: PaymentOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-[104px] flex-col overflow-hidden rounded-lg bg-white ring-1 ring-transparent transition hover:ring-primary",
        selected && "ring-2 ring-primary"
      )}
    >
      <div className="flex h-10 w-full items-center justify-center px-3 py-1.5">
        <Image src={option.logo} alt={option.name} width={88} height={28} className="h-full w-auto object-contain" />
      </div>
      {(option.fee || option.note) && (
        <div className="flex flex-col items-center gap-0.5 border-t border-black/10 bg-black/5 px-2 py-1.5 text-center">
          {option.fee && <span className="text-[11px] font-bold text-slate-700">{option.fee}</span>}
          {option.note && (
            <span className="line-clamp-2 text-[9px] italic leading-tight text-slate-500">{option.note}</span>
          )}
        </div>
      )}
    </button>
  );
}

function PaymentGroupRow({
  group,
  selectedId,
  onSelect,
}: {
  group: PaymentGroup;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  if (group.featured) {
    return (
      <button
        type="button"
        onClick={() => onSelect(group.id)}
        className={cn(
          "relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-lg bg-card/60 px-4 py-3.5 text-left ring-1 ring-transparent transition hover:ring-primary",
          selectedId === group.id && "ring-2 ring-primary"
        )}
      >
        <span className="flex items-center gap-2.5">
          {group.logo && (
            <Image src={group.logo} alt={group.label} width={72} height={20} className="h-5 w-auto object-contain" />
          )}
          <span className="text-sm font-semibold">{group.label}</span>
        </span>
        {group.info && <span className="pr-14 text-xs text-muted-foreground sm:pr-16">{group.info}</span>}
        {group.badge && (
          <span className="absolute -right-9 top-2.5 w-32 rotate-45 bg-primary py-0.5 text-center text-[9px] font-bold uppercase text-primary-foreground">
            {group.badge}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-card/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3"
      >
        <span className="text-sm font-semibold">{group.label}</span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="flex flex-wrap gap-2 px-4 pb-3.5">
          {group.options.map((opt) => (
            <PaymentOptionCard
              key={opt.name}
              option={opt}
              selected={selectedId === `${group.id}:${opt.name}`}
              onSelect={() => onSelect(`${group.id}:${opt.name}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PurchasePanel({ detail, children }: { detail: GameDetail; children?: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [accountId, setAccountId] = useState("");
  const [serverId, setServerId] = useState("");
  const [selectedNominal, setSelectedNominal] = useState<NominalVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeTab, setActiveTab] = useState<"transaksi" | "keterangan">("transaksi");

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const hasAccountStep = Boolean(detail.idLabel);
  const hasUsernameField = Boolean(detail.usernameLabel);
  const hasServerField = Boolean(detail.serverLabel);

  function isAccountDataMissing() {
    return (
      hasAccountStep &&
      (!accountId.trim() || (hasServerField && !serverId.trim()) || (hasUsernameField && !username.trim()))
    );
  }

  function handleSelectNominal(item: NominalVariant) {
    if (isAccountDataMissing()) {
      showToast("Silahkan isi data akun terlebih dahulu.");
      return;
    }
    setSelectedNominal(item);
  }

  function handleOrder() {
    if (isAccountDataMissing()) {
      showToast("Silahkan isi data akun terlebih dahulu.");
      return;
    }
    if (!selectedNominal) {
      showToast("Silahkan pilih nominal terlebih dahulu.");
      return;
    }
    showToast("Fitur pembayaran belum tersedia.");
  }

  const total = selectedNominal ? selectedNominal.price * quantity : 0;

  let step = 0;

  const usernameField = (
    <div>
      <label htmlFor="usernameField" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        {detail.usernameLabel}
        {detail.usernameTooltip && (
          <span title={detail.usernameTooltip}>
            <Info className="size-3.5" />
          </span>
        )}
      </label>
      <input
        id="usernameField"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={`Masukkan ${detail.usernameLabel}`}
        className="h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );

  const mainSteps = (
    <>
      {hasAccountStep && (
            <StepCard step={++step} title="Masukkan Data Akun">
              <div
                className={cn(
                  "grid gap-4",
                  (hasServerField || hasUsernameField) && "sm:grid-cols-2",
                  hasServerField && hasUsernameField && "lg:grid-cols-3"
                )}
              >
                {hasUsernameField && detail.usernamePosition !== "after" && usernameField}
                <div>
                  <label htmlFor="accountIdField" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                    {detail.idLabel}
                    {detail.idTooltip && (
                      <span title={detail.idTooltip}>
                        <Info className="size-3.5" />
                      </span>
                    )}
                  </label>
                  <input
                    id="accountIdField"
                    type="text"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    placeholder="Masukkan ID"
                    className="h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                {hasUsernameField && detail.usernamePosition === "after" && usernameField}
                {hasServerField && (
                  <div className={cn(hasUsernameField && "sm:col-span-2 lg:col-span-1")}>
                    <label htmlFor="serverField" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                      {detail.serverLabel}
                    </label>
                    {detail.serverOptions ? (
                      <select
                        id="serverField"
                        value={serverId}
                        onChange={(e) => setServerId(e.target.value)}
                        className="h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Pilih Server</option>
                        {detail.serverOptions.map((option, index) => (
                          <option key={`${option}-${index}`} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id="serverField"
                        type="text"
                        value={serverId}
                        onChange={(e) => setServerId(e.target.value)}
                        placeholder="Masukkan Server"
                        className="h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    )}
                  </div>
                )}
              </div>
              {detail.idNote && (
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-card/60 px-3 py-2.5 text-xs text-muted-foreground">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  {detail.idNote}
                </div>
              )}
            </StepCard>
          )}

          <StepCard step={++step} title="Pilih Nominal">
            <div className="flex flex-col gap-6">
              {detail.categories.map((category) => (
                <div key={category.label}>
                  <h3 className="mb-3 text-sm font-semibold">
                    {category.emoji}
                    {category.label}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {category.items.map((item) => (
                      <NominalCard
                        key={item.id}
                        item={item}
                        selected={selectedNominal?.id === item.id}
                        onSelect={() => handleSelectNominal(item)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </StepCard>

          <StepCard step={++step} title="Masukkan Jumlah Pembelian">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                aria-label="Jumlah Pembelian"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Tambah jumlah"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              >
                <Plus className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Kurangi jumlah"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground"
              >
                <Minus className="size-4" />
              </button>
            </div>
          </StepCard>

          <StepCard step={++step} title="Pilih Pembayaran">
            <div className="flex flex-col gap-3">
              {detail.paymentGroups.map((group) => (
                <PaymentGroupRow
                  key={group.id}
                  group={group}
                  selectedId={selectedPayment}
                  onSelect={setSelectedPayment}
                />
              ))}
            </div>
          </StepCard>

          <StepCard step={++step} title="Kode Promo">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  aria-label="Kode Promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Ketik Kode Promo Kamu"
                  className="h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => promoCode.trim() && showToast("Kode promo tidak valid.")}
                  className="h-10 shrink-0 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
                >
                  Gunakan
                </button>
              </div>
              <button
                type="button"
                onClick={() => showToast("Belum ada promo yang tersedia saat ini.")}
                className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground"
              >
                <Ticket className="size-3.5" /> Pakai Promo Yang Tersedia
              </button>
            </div>
          </StepCard>

          <StepCard step={++step} title="Detail Kontak">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="emailField" className="mb-1.5 block text-sm font-medium text-muted-foreground">Email</label>
                <input
                  id="emailField"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="whatsappField" className="mb-1.5 block text-sm font-medium text-muted-foreground">No. WhatsApp</label>
                <input
                  id="whatsappField"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="mt-1.5 text-xs italic text-muted-foreground">
                  **Nomor ini akan dihubungi jika terjadi masalah
                </p>
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-card/60 px-3 py-2.5 text-xs text-muted-foreground">
                <Info className="mt-0.5 size-3.5 shrink-0" />
                Mohon isi no wa dengan benar, agar jika bermasalah bisa kami hubungi
              </div>
            </div>
          </StepCard>
    </>
  );

  const ratingCard = (
    <div className="rounded-xl bg-card/60 p-4">
      <p className="mb-2 text-sm font-semibold text-muted-foreground">Ulasan dan rating</p>
      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold">{detail.rating.toFixed(2)}</span>
        <div className="flex gap-0.5 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-5 fill-current" />
          ))}
        </div>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Berdasarkan total {detail.ratingCount} rating</p>
    </div>
  );

  const helpCard = (
    <div className="flex items-center gap-3 rounded-xl bg-card/60 p-4">
      <Headset className="size-6 shrink-0 text-primary" />
      <div>
        <p className="text-sm font-semibold">Butuh Bantuan?</p>
        <p className="text-xs text-muted-foreground">Kamu bisa hubungi admin disini.</p>
      </div>
    </div>
  );

  const orderSummaryAndCta = (
    <>
      <div className="rounded-xl border border-dashed border-primary/40 bg-secondary/40 p-5 text-center text-sm text-muted-foreground">
        {selectedNominal ? (
          <div className="text-left">
            <p className="font-semibold text-foreground">{selectedNominal.name}</p>
            <p className="mt-1 text-xs">Jumlah: {quantity}</p>
            <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-3">
              <span className="text-xs">Total</span>
              <span className="text-base font-bold text-primary">Rp {formatIDR(total)}</span>
            </div>
          </div>
        ) : (
          "Belum ada item produk yang dipilih."
        )}
      </div>

      <button
        type="button"
        onClick={handleOrder}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
      >
        <ShoppingBag className="size-4" /> Pesan Sekarang!
      </button>
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {toast && (
        <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          <CircleAlert className="size-4 shrink-0" />
          {toast}
        </div>
      )}

      {/* Transaksi/Keterangan tab switcher — mobile & tablet only, matches reference behavior below lg (1024px) */}
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-full bg-muted/60 p-1 lg:hidden">
        <button
          type="button"
          onClick={() => setActiveTab("transaksi")}
          className={cn(
            "rounded-full py-2 text-sm font-semibold transition-colors",
            activeTab === "transaksi" ? "bg-primary text-primary-foreground" : "text-foreground"
          )}
        >
          Transaksi
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("keterangan")}
          className={cn(
            "rounded-full py-2 text-sm font-semibold transition-colors",
            activeTab === "keterangan" ? "bg-primary text-primary-foreground" : "text-foreground"
          )}
        >
          Keterangan
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column: transaction steps (all breakpoints) + description (desktop only, matches reference which keeps it here) */}
        <div
          className={cn(
            "flex-col gap-6 lg:col-span-2 lg:flex",
            activeTab === "transaksi" ? "flex" : "hidden"
          )}
        >
          {mainSteps}
          <div className="hidden lg:block">{children}</div>
        </div>

        {/* Mobile/tablet-only "Keterangan" tab content: rating + help + description (desktop shows these in the sidebar/main column instead) */}
        <div
          className={cn(
            "flex-col gap-6 lg:hidden",
            activeTab === "keterangan" ? "flex" : "hidden"
          )}
        >
          {ratingCard}
          {helpCard}
          {children}
        </div>

        {/* Sidebar: always visible on desktop; on mobile only the order summary/CTA shows, under the Transaksi tab */}
        <div
          className={cn(
            "flex-col gap-4 lg:flex lg:sticky lg:top-28 lg:self-start",
            activeTab === "transaksi" ? "flex" : "hidden lg:flex"
          )}
        >
          <div className="hidden lg:block">{ratingCard}</div>
          <div className="hidden lg:block">{helpCard}</div>
          {orderSummaryAndCta}
        </div>
      </div>
    </div>
  );
}
