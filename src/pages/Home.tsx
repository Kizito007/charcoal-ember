import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const FEATURES = [
  {
    to: "/find",
    icon: "ph:map-pin-simple",
    title: "Find Eateries",
    description:
      "Discover restaurants, cafés, bars, and more near you — powered by real OpenStreetMap data.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    glow: "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.2),0_8px_32px_-12px_hsl(var(--primary)/0.4)]",
  },
  {
    to: "/recipes",
    icon: "ph:chat-circle-dots",
    title: "Recipe Chat",
    description:
      "Ask an AI chef anything — recipes, substitutions, techniques, meal ideas — and get instant answers.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    glow: "hover:shadow-[0_0_0_1px_rgba(251,191,36,0.2),0_8px_32px_-12px_rgba(251,191,36,0.3)]",
  },
  {
    to: "/explore",
    icon: "ph:compass",
    title: "Explore Cuisines",
    description:
      "Journey through the world's cuisines with chef tips, cultural deep-dives, and curated food knowledge.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
    glow: "hover:shadow-[0_0_0_1px_rgba(251,113,133,0.2),0_8px_32px_-12px_rgba(251,113,133,0.3)]",
  },
];

const STATS = [
  { value: "6M+", label: "OSM eateries worldwide" },
  { value: "Free", label: "No account required" },
  { value: "AI", label: "Gemini-powered recipes" },
];

const WORLD_DISHES_ROW1 = [
  { name: "Sushi", origin: "Japan", photo: "photo-1611143669185-af224c5e3252" },
  {
    name: "Margherita Pizza",
    origin: "Italy",
    photo: "photo-1574071318508-1cdbab80d002",
  },
  {
    name: "Tacos al Pastor",
    origin: "Mexico",
    photo: "photo-1565299585323-38d6b0865b47",
  },
  {
    name: "Butter Chicken",
    origin: "India",
    photo: "photo-1585937421612-70a008356fbe",
  },
  {
    name: "Pad Thai",
    origin: "Thailand",
    photo: "photo-1559314809-0d155014e29e",
  },
  {
    name: "Croissant",
    origin: "France",
    photo: "photo-1555507036-ab1f4038808a",
  },
  { name: "Ramen", origin: "Japan", photo: "photo-1569718212165-3a8278d5f624" },
  {
    name: "Jollof Rice",
    origin: "Nigeria",
    photo: "photo-1604329760661-e71dc83f8f26",
  },
  { name: "Dim Sum", origin: "China", photo: "photo-1563245372-f21724e3856d" },
  {
    name: "Lamb Tagine",
    origin: "Morocco",
    photo: "photo-1528137871618-79d2761e3fd5",
  },
  {
    name: "Risotto",
    origin: "Italy",
    photo: "photo-1476124369491-e7addf5db371",
  },
  {
    name: "Doro Wat",
    origin: "Ethiopia",
    photo: "photo-1567364816519-cbc7c4a7d3d0",
  },
];

const WORLD_DISHES_ROW2 = [
  {
    name: "Biryani",
    origin: "India",
    photo: "photo-1563379091339-03b21ab4a4f8",
  },
  {
    name: "Green Curry",
    origin: "Thailand",
    photo: "photo-1455619452474-d2be8b1e70cd",
  },
  {
    name: "Enchiladas",
    origin: "Mexico",
    photo: "photo-1534352956036-cd81e27dd615",
  },
  {
    name: "Fufu & Soup",
    origin: "Ghana",
    photo: "photo-1546069901-ba9599a7e63c",
  },
  {
    name: "Coq au Vin",
    origin: "France",
    photo: "photo-1414235077428-338989a2e8c0",
  },
  {
    name: "Peking Duck",
    origin: "China",
    photo: "photo-1582878826629-29b7ad1cdc43",
  },
  {
    name: "Hummus",
    origin: "Lebanon",
    photo: "photo-1540189549336-e6e99c3679fe",
  },
  {
    name: "Braai",
    origin: "South Africa",
    photo: "photo-1558618666-fcd25c85cd64",
  },
  {
    name: "Spaghetti Carbonara",
    origin: "Italy",
    photo: "photo-1555396273-367ea4eb4db5",
  },
  {
    name: "Tom Yum",
    origin: "Thailand",
    photo: "photo-1569050467447-ce54b3bbc37d",
  },
  {
    name: "Kelewele",
    origin: "Ghana",
    photo: "photo-1604329760661-e71dc83f8f26",
  },
  {
    name: "Crème Brûlée",
    origin: "France",
    photo: "photo-1470124182917-cc6e71b22ecc",
  },
];

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3, delay },
        }
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" },
        };

  const sectionFade = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.4 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: "easeOut" },
      };

  return (
    <main className="relative">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4 text-center overflow-hidden">
        {/* Glow blob — per PROMPT.md: blur-3xl, primary at 25–35% opacity, drifting */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-primary/25 blur-3xl"
          aria-hidden
          animate={
            prefersReducedMotion ? {} : { x: [0, 40, 0], y: [0, -24, 0] }
          }
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        />

        {/* Pill badge */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
            <Icon icon="ph:fire-simple" width={12} />
            Powered by OpenStreetMap &amp; Google Gemini
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-heading text-5xl font-semibold tracking-tight md:text-7xl max-w-3xl leading-tight"
        >
          Discover Food,
          <br />
          <span className="text-primary">Explore Flavors.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.2)}
          className="mt-5 text-muted-foreground max-w-sm text-base leading-relaxed"
        >
          Find eateries near you, chat with an AI chef for recipes, and explore
          the world's cuisines — all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/find"
            className="inline-flex items-center gap-2 h-12 px-7 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.5)]"
          >
            <Icon icon="ph:crosshair" width={18} />
            Find Eateries Near Me
          </Link>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 h-12 px-7 text-sm font-medium rounded-full border border-border bg-card hover:bg-muted transition-all"
          >
            <Icon icon="ph:chat-circle-dots" width={18} />
            Ask the AI Chef
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-14 flex flex-wrap items-center justify-center gap-8"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-2xl font-semibold text-foreground">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="relative px-4 pb-28 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div {...sectionFade} className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold">
              Everything food, in one place
            </h2>
            <p className="mt-3 text-muted-foreground text-sm max-w-xs mx-auto">
              Three tools to help you discover, cook, and enjoy food to the
              fullest.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.to}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 32, rotate: -1 }
                }
                whileInView={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, rotate: 0 }
                }
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              >
                <Link
                  to={feat.to}
                  className={`group flex flex-col gap-4 rounded-2xl border ${feat.border} bg-card p-6 h-full transition-all hover:bg-muted ${feat.glow}`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${feat.border} ${feat.bg} ${feat.color}`}
                  >
                    <Icon icon={feat.icon} width={22} />
                  </div>
                  <div>
                    <h3
                      className={`font-heading font-semibold text-base group-hover:${feat.color} transition-colors`}
                    >
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div
                    className={`mt-auto flex items-center gap-1 text-xs font-medium ${feat.color}`}
                  >
                    Get started
                    <Icon icon="ph:arrow-right" width={13} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dish Showcase ────────────────────────────────────────────────── */}
      <section className="relative pb-24">
        <motion.div {...sectionFade} className="text-center px-4 mb-10">
          <h2 className="font-heading text-3xl font-semibold">
            Mouth-Watering Dishes Worldwide
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-xs mx-auto">
            A taste of the global table — from street food to fine dining.
          </p>
        </motion.div>

        {/* Row 1 — scrolls left */}
        <div
          className={`${prefersReducedMotion ? "overflow-x-auto" : "overflow-hidden"} mb-4`}
        >
          <div
            className={`flex ${prefersReducedMotion ? "" : "animate-marquee"}`}
          >
            {(prefersReducedMotion
              ? WORLD_DISHES_ROW1
              : [...WORLD_DISHES_ROW1, ...WORLD_DISHES_ROW1]
            ).map((dish, i) => (
              <div key={i} className="flex-shrink-0 pr-4">
                <div className="relative h-48 w-64 rounded-2xl overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${dish.photo}?w=400&h=300&fit=crop&auto=format&q=80`}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-semibold text-white leading-tight">
                      {dish.name}
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      {dish.origin}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div
          className={
            prefersReducedMotion ? "overflow-x-auto" : "overflow-hidden"
          }
        >
          <div
            className={`flex ${prefersReducedMotion ? "" : "animate-marquee-reverse"}`}
          >
            {(prefersReducedMotion
              ? WORLD_DISHES_ROW2
              : [...WORLD_DISHES_ROW2, ...WORLD_DISHES_ROW2]
            ).map((dish, i) => (
              <div key={i} className="flex-shrink-0 pr-4">
                <div className="relative h-48 w-64 rounded-2xl overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${dish.photo}?w=400&h=300&fit=crop&auto=format&q=80`}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-semibold text-white leading-tight">
                      {dish.name}
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      {dish.origin}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────────────── */}
      <section className="relative px-4 pb-24 sm:px-6">
        <motion.div
          {...sectionFade}
          className="mx-auto max-w-3xl rounded-3xl border border-primary/20 bg-primary/5 p-10 text-center relative overflow-hidden"
        >
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 h-40 w-80 rounded-full bg-primary/20 blur-3xl"
            aria-hidden
          />
          <h2 className="relative font-heading text-2xl font-semibold md:text-3xl">
            Hungry right now?
          </h2>
          <p className="relative mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
            Let us find the best spots near you — restaurants, cafés, bars, and
            more — in seconds.
          </p>
          <Link
            to="/find"
            className="relative mt-6 inline-flex items-center gap-2 h-11 px-7 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Icon icon="ph:map-pin-simple" width={17} />
            Find eateries near me
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
