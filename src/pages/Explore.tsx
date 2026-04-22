import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import { CUISINES, REGION_ORDER, type CuisineEntry } from "../data/cuisines";

// ─── Region labels ────────────────────────────────────────────────────────────

const REGION_LABELS: Record<string, string> = {
  Africa: "🌍 African Cuisines",
  Asia: "🌏 Asian Cuisines",
  Europe: "🌍 European Cuisines",
  Americas: "🌎 The Americas",
  "Middle East": "🕌 Middle Eastern Cuisines",
};

// ─── REMOVED inline CUISINES array — now imported from src/data/cuisines.ts ──

// ─── Chef tips ────────────────────────────────────────────────────────────────

const FOOD_TIPS = [
  { icon: "ph:thermometer", title: "Rest your meat", body: "Always let cooked meat rest for 5–10 minutes so juices redistribute throughout the cut." },
  { icon: "ph:waves", title: "Salt pasta water", body: "Pasta water should taste like the sea. Properly salted water flavours the pasta from the inside out." },
  { icon: "ph:flame", title: "Hot pan, then oil", body: "Preheat your pan before adding oil to prevent sticking and get a better sear." },
  { icon: "ph:bowl-food", title: "Mise en place", body: "Prep everything before you cook. Organised ingredients make the cooking process smoother and more enjoyable." },
  { icon: "ph:drop", title: "Finish with acid", body: "A squeeze of lemon or splash of vinegar at the end brightens any dish and balances richness." },
  { icon: "ph:stack", title: "Season in layers", body: "Add seasoning at each stage of cooking, not just at the end, for deeper, more complex flavour." },
];

// ─── Explore page ─────────────────────────────────────────────────────────────

export default function Explore() {
  const prefersReducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3, delay } }
      : { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } };

  const trimmed = query.trim().toLowerCase();

  const filtered = trimmed
    ? CUISINES.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.region.toLowerCase().includes(trimmed) ||
          c.description.toLowerCase().includes(trimmed) ||
          c.dishes.some((d) => d.name.toLowerCase().includes(trimmed) || d.tags.some((t) => t.includes(trimmed)))
      )
    : CUISINES;

  const regions = trimmed ? null : REGION_ORDER.filter((r) => CUISINES.some((c) => c.region === r));

  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">

      {/* ── Hero ── */}
      <section className="mb-10 text-center">
        <motion.div
          {...fadeUp(0)}
          viewport={{ once: true }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-medium text-rose-400"
        >
          <Icon icon="ph:compass" width={14} />
          World Cuisines
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          viewport={{ once: true }}
          className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Explore the World
          <br />
          <span className="text-rose-400">Through Food</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.15)}
          viewport={{ once: true }}
          className="mt-4 text-sm text-muted-foreground max-w-md mx-auto"
        >
          Discover cuisines from every corner of the globe. Click any cuisine to explore its signature dishes.
        </motion.p>
      </section>

      {/* ── Search ── */}
      <motion.div {...fadeUp(0.2)} viewport={{ once: true }} className="mb-10">
        <div className="mx-auto max-w-lg">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Icon
                icon="ph:magnifying-glass"
                width={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search cuisines, dishes, or ingredients…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 rounded-2xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-rose-500/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <Icon icon="ph:x" width={16} />
                </button>
              )}
            </div>
            <Link
              to="/find"
              className="flex shrink-0 items-center gap-2 h-12 px-5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.4)]"
            >
              <Icon icon="ph:map-pin-simple" width={16} />
              <span className="hidden sm:inline">Near me</span>
            </Link>
          </div>

          {trimmed && (
            <p className="mt-3 text-xs text-muted-foreground text-center">
              {filtered.length === 0
                ? `No cuisines match "${query}"`
                : `${filtered.length} cuisine${filtered.length !== 1 ? "s" : ""} found`}
            </p>
          )}
        </div>
      </motion.div>

      {/* ── Cuisines ── */}
      {trimmed ? (
        <section className="mb-20">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <Icon icon="ph:fork-knife" width={40} className="text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No cuisines matched your search.</p>
              <Link
                to="/find"
                className="text-sm font-medium text-rose-400 hover:text-rose-300 underline underline-offset-2"
              >
                Try finding restaurants near you instead
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((cuisine, i) => (
                <CuisineCard key={cuisine.slug} cuisine={cuisine} delay={i * 0.04} reduced={!!prefersReducedMotion} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {regions!.map((region) => {
            const group = CUISINES.filter((c) => c.region === region);
            return (
              <section key={region} className="mb-16">
                <motion.h2
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mb-5 font-heading text-xl font-semibold"
                >
                  {REGION_LABELS[region]}
                </motion.h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {group.map((cuisine, i) => (
                    <CuisineCard key={cuisine.slug} cuisine={cuisine} delay={i * 0.06} reduced={!!prefersReducedMotion} />
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}

      {/* ── Chef's Tips ── */}
      <section>
        <motion.h2
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-2 font-heading text-xl font-semibold"
        >
          Chef's Tips
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="mb-6 text-sm text-muted-foreground"
        >
          Pro techniques to level up your home cooking.
        </motion.p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOOD_TIPS.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 flex gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-rose-400">
                <Icon icon={tip.icon} width={20} />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold mb-1">{tip.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{tip.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}

// ─── Cuisine Card ─────────────────────────────────────────────────────────────

function CuisineCard({
  cuisine,
  delay,
  reduced,
}: {
  cuisine: CuisineEntry;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={`/cuisine/${cuisine.slug}`}
        className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden h-52 transition-all hover:border-rose-500/40 hover:shadow-[0_0_0_1px_rgba(244,63,94,0.15),0_12px_32px_-12px_rgba(244,63,94,0.3)]"
      >
        <img
          src={`https://images.unsplash.com/${cuisine.photo}?w=400&h=220&fit=crop&auto=format&q=80`}
          alt={cuisine.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="relative mt-auto p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{cuisine.emoji}</span>
            <span className="font-heading text-base font-semibold text-white">{cuisine.name}</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed line-clamp-2">{cuisine.description}</p>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon icon="ph:arrow-right" width={12} />
          Explore Dishes
        </div>
        <div className="absolute top-3 left-3 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] text-white/70">
          {cuisine.region}
        </div>
      </Link>
    </motion.div>
  );
}
