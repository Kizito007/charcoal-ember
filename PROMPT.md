# Charcoal & Ember — Animation & Motion Prompt

This zip is the **static starter**. The live preview at VibeStack uses
framer-motion, three.js, and kinetic typography that cannot be exported as
plain HTML/JSX. Use this prompt to layer those effects back on.

## Paste this into your AI coding tool (Lovable, Cursor, Claude Code, v0, etc.)

> I exported a static React + Vite + Tailwind theme called **Charcoal & Ember**
> (style: `vibe-stack`). The page is in `src/Landing.tsx` and tokens are in
> `src/index.css`. Add the motion described below without changing the color
> tokens, fonts, or layout structure. Keep it accessible (respect
> `prefers-reduced-motion`). Install any libraries you need.

---

## Style recipe: `vibe-stack`

LAYERED GLASS STACK with parallax.
- Install: framer-motion.
- Hero has 2 to 3 stacked glass cards. Each card animates from y:60, opacity:0, rotate:-2deg to rest, staggered 120ms.
- On scroll, the back card translates Y slower than the front (parallax via useTransform on scrollYProgress).
- Add a soft glow blob behind the hero text: blur-3xl, primary color at 30% opacity, slowly drifting via animate={{x:[0,40,0], y:[0,-20,0]}} 12s ease-in-out infinite.

---

## Global motion rules (apply everywhere)

1. Wrap any framer-motion usage in a `useReducedMotion()` check; when true,
   skip all transforms and use opacity-only fades.
2. Section enter animations should fire once (`viewport={{ once: true }}`).
3. Never animate layout-affecting properties (width, height, margin) on
   scroll. Use transform only.
4. Hero atmosphere: if `atmosphere` is set to `halo`, `shine`, or
   `aurora`, render an absolutely positioned blurred blob behind the hero
   headline using the primary color at 25 to 35% opacity.

## What is already in the starter

- Full design tokens (HSL CSS variables) in `src/index.css`.
- Tailwind config wired to those tokens.
- Heading + body fonts loaded in `index.html`.
- Style-aware Hero, Features, Pricing, Testimonials, Header, Footer
  matching the `vibe-stack` family layout.
- Iconify pack: `ph`.

## What this zip does NOT include (and why)

- **framer-motion**: too many version pins and per-style choreography to
  ship blindly. The prompt above tells your AI tool exactly what to add.
- **three.js / 3D scenes**: the live preview uses react-three-fiber for
  some styles. Re-creating it requires asset bundling outside this zip.
- **Kinetic type marquees**: depend on framer-motion + custom hooks.
- **Hero generated images**: if your theme had an AI-generated hero
  image, its URL is preserved in the JSX. Replace with your own asset.

Hand this README and `PROMPT.md` to your AI tool together with the project
and it will know what to do.
