import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import { CUISINES, type Dish } from "../data/cuisines";

export default function CuisinePage() {
  const { name } = useParams<{ name: string }>();
  const cuisine = CUISINES.find((c) => c.slug === name);
  const prefersReducedMotion = useReducedMotion();

  const sectionFade = prefersReducedMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.3 } }
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: "easeOut" } };

  if (!cuisine) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4 text-center gap-4">
        <Icon icon="ph:fork-knife" width={48} className="text-muted-foreground" />
        <h1 className="font-heading text-2xl font-semibold">Cuisine not found</h1>
        <p className="text-muted-foreground text-sm max-w-xs">
          We couldn't find a cuisine matching that name. Head back to explore all
          our world cuisines.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Icon icon="ph:compass" width={17} />
          Back to Explore
        </Link>
      </main>
    );
  }

  return (
    <main>
      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src={`https://images.unsplash.com/${cuisine.photo}?w=1200&h=500&fit=crop&auto=format&q=80`}
          alt={cuisine.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-8 sm:px-10">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/80">
            <Icon icon="ph:globe" width={12} />
            {cuisine.region}
          </span>
          <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
            {cuisine.emoji} {cuisine.name} Cuisine
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/70 leading-relaxed">
            {cuisine.description}
          </p>
        </div>
        {/* Back link */}
        <Link
          to="/explore"
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white hover:bg-black/50 transition-colors"
        >
          <Icon icon="ph:arrow-left" width={13} />
          All Cuisines
        </Link>
      </section>

      {/* ── Dishes grid ──────────────────────────────────────────────────── */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div {...sectionFade} className="mb-10">
            <h2 className="font-heading text-2xl font-semibold">
              Signature Dishes
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Six iconic dishes to discover, cook, and savour.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cuisine.dishes.map((dish: Dish, i: number) => (
              <DishCard key={dish.name} dish={dish} index={i} reduced={!!prefersReducedMotion} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 sm:px-6">
        <motion.div
          {...sectionFade}
          className="mx-auto max-w-3xl rounded-3xl border border-primary/20 bg-primary/5 p-10 text-center relative overflow-hidden"
        >
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 h-40 w-80 rounded-full bg-primary/20 blur-3xl"
            aria-hidden
          />
          <h2 className="relative font-heading text-2xl font-semibold md:text-3xl">
            Ready to cook {cuisine.name}?
          </h2>
          <p className="relative mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
            Chat with Ember — your AI chef — for authentic recipes, techniques,
            and ingredient guides.
          </p>
          <Link
            to={`/recipes?q=${encodeURIComponent(`Give me authentic ${cuisine.name} recipes and techniques`)}`}
            className="relative mt-6 inline-flex items-center gap-2 h-11 px-7 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Icon icon="ph:chat-circle-dots" width={17} />
            Ask Ember about {cuisine.name} cooking
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

function DishCard({
  dish,
  index,
  reduced,
}: {
  dish: Dish;
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Dish image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={`https://images.unsplash.com/${dish.photo}?w=480&h=280&fit=crop&auto=format&q=80`}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* "Ask Ember" hover button */}
        <Link
          to={`/recipes?q=${encodeURIComponent(`How do I make ${dish.name}?`)}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label={`Ask Ember how to make ${dish.name}`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg">
            <Icon icon="ph:chat-circle-dots" width={14} />
            Ask Ember
          </span>
        </Link>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2.5 p-4">
        <h3 className="font-heading font-semibold text-base leading-snug">
          {dish.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {dish.description}
        </p>

        {/* Tags */}
        {dish.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {dish.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
