# Icons — Charcoal & Ember

Pack: `ph` (one of 150+ Iconify packs)
Style: `vibe-stack`

## Already wired

The starter installs **@iconify/react** and uses your chosen pack throughout
`src/Landing.tsx`. You don't need to do anything for the existing icons.

## Drop a new icon anywhere

```tsx
import { Icon } from "@iconify/react";

<Icon icon="ph:arrow-right" width={20} height={20} />
```

Replace `arrow-right` with any icon name from the **ph** pack. Browse
the full set at https://icon-sets.iconify.design/ph/

## Style guidance for `vibe-stack`

- **Size**: 20px is the visual baseline used in the starter.
- **Stroke (for stroke-based packs like lucide / tabler / phosphor)**: 1.75.
- **Color**: primary with subtle glow. Use the Tailwind tokens (`text-primary`,
  `text-muted-foreground`, `text-foreground`) — never raw hex.

## Convenience wrapper

If you'll use icons a lot, drop this into `src/components/Icon.tsx`:

```tsx
import { Icon as Iconify } from "@iconify/react";

interface IconProps {
  name: string; // e.g. "arrow-right" — pack prefix is auto-applied
  size?: number;
  className?: string;
}

const PACK = "ph";

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <Iconify
      icon={`${PACK}:${name}`}
      width={size}
      height={size}
      className={className}
    />
  );
}
```

Usage:

```tsx
<Icon name="arrow-right" className="text-primary" />
<Icon name="check" size={14} className="text-muted-foreground" />
```

## Switching packs later

Change the `PACK` constant. Every icon updates instantly. No reinstall
needed because @iconify/react fetches icons on demand.

## Tree-shaking note

@iconify/react fetches icon data at runtime from the Iconify CDN. For a fully
offline build, install the specific pack package (e.g. `@iconify-icons/ph`)
and import individual icons. The default setup is fine for 99% of projects.
