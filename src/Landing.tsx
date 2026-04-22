import { useState } from "react";
import { Icon } from "@iconify/react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Eatery = {
  id: number;
  name: string;
  type: string;
  cuisine?: string;
  lat: number;
  lon: number;
  distance: number;
  address?: string;
  opening_hours?: string;
};

type Status = "idle" | "locating" | "fetching" | "done" | "error";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(m: number) {
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
}

const TYPE_ICONS: Record<string, string> = {
  restaurant: "ph:fork-knife",
  cafe: "ph:coffee",
  fast_food: "ph:hamburger",
  bar: "ph:wine",
  pub: "ph:beer-bottle",
  food_court: "ph:storefront",
};

const TYPE_LABELS: Record<string, string> = {
  restaurant: "Restaurant",
  cafe: "Café",
  fast_food: "Fast Food",
  bar: "Bar",
  pub: "Pub",
  food_court: "Food Court",
};

const RADIUS_OPTIONS = [500, 1000, 2000, 5000];

// ─── Main component ───────────────────────────────────────────────────────────

export default function Landing() {
  const [status, setStatus] = useState<Status>("idle");
  const [eateries, setEateries] = useState<Eatery[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [radius, setRadius] = useState(1000);
  const [filter, setFilter] = useState("all");

  async function findEateries(r: number) {
    setStatus("locating");
    setEateries([]);
    setErrorMsg("");

    let lat: number, lon: number;

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 12000,
          enableHighAccuracy: true,
        }),
      );
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
    } catch (err: unknown) {
      const geoErr = err as GeolocationPositionError;
      setErrorMsg(
        geoErr.code === 1
          ? "Location access denied. Please allow location in your browser settings."
          : "Unable to get your location. Please try again.",
      );
      setStatus("error");
      return;
    }

    setUserLoc({ lat, lon });
    setStatus("fetching");

    try {
      const amenities = "restaurant|cafe|fast_food|bar|pub|food_court";
      const query = `[out:json][timeout:25];(node["amenity"~"${amenities}"](around:${r},${lat},${lon});way["amenity"~"${amenities}"](around:${r},${lat},${lon}););out body;>;out skel qt;`;

      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const data = await res.json();
      const seen = new Set<string>();
      const results: Eatery[] = [];

      for (const el of data.elements as {
        id: number;
        lat?: number;
        lon?: number;
        center?: { lat: number; lon: number };
        tags?: Record<string, string>;
      }[]) {
        const tags = el.tags ?? {};
        const name = tags["name"];
        if (!name) continue;

        const elLat = el.lat ?? el.center?.lat;
        const elLon = el.lon ?? el.center?.lon;
        if (elLat == null || elLon == null) continue;

        const key = `${name}|${elLat.toFixed(5)}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const rawCuisine = tags["cuisine"];
        const cuisine = rawCuisine
          ? rawCuisine.split(";")[0].replace(/_/g, " ")
          : undefined;

        const addrParts = [
          tags["addr:housenumber"],
          tags["addr:street"],
        ].filter(Boolean);

        results.push({
          id: el.id,
          name,
          type: tags["amenity"] ?? "restaurant",
          cuisine,
          lat: elLat,
          lon: elLon,
          distance: haversine(lat, lon, elLat, elLon),
          address: addrParts.length ? addrParts.join(" ") : undefined,
          opening_hours: tags["opening_hours"],
        });
      }

      results.sort((a, b) => a.distance - b.distance);
      setEateries(results);
      setFilter("all");
      setStatus("done");
    } catch {
      setErrorMsg("Failed to fetch nearby eateries. Please try again.");
      setStatus("error");
    }
  }

  const types = ["all", ...Array.from(new Set(eateries.map((e) => e.type)))];
  const filtered =
    filter === "all" ? eateries : eateries.filter((e) => e.type === filter);
  const busy = status === "locating" || status === "fetching";

  return (
    <div className="relative min-h-screen bg-background text-foreground font-body">
      <div className="atmosphere" aria-hidden />

      {/* ── Header ── */}
      <header className="sticky top-4 z-30 mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-border/60 bg-background/70 px-5 py-2 shadow-[0_18px_40px_-24px_hsl(var(--primary)/0.5)] backdrop-blur-xl">
        <span className="font-heading text-sm font-semibold flex items-center gap-2">
          <Icon icon="ph:map-pin-simple" className="text-primary" width={18} />
          Nearby Eats
        </span>

        {status === "done" && (
          <span className="hidden text-xs text-muted-foreground sm:block">
            {eateries.length} place{eateries.length !== 1 ? "s" : ""} found
          </span>
        )}

        <button
          onClick={() => findEateries(radius)}
          disabled={busy}
          className="inline-flex items-center justify-center gap-1.5 h-9 px-4 text-xs font-medium rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? (
            <>
              <Icon icon="ph:spinner-gap" className="animate-spin" width={15} />
              {status === "locating" ? "Locating…" : "Fetching…"}
            </>
          ) : (
            <>
              <Icon icon="ph:crosshair" width={15} />
              Find near me
            </>
          )}
        </button>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6">
        {/* ── Idle / Hero ── */}
        {status === "idle" && (
          <div className="flex flex-col items-center justify-center min-h-[66vh] text-center gap-8">
            <div
              className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-border bg-card shadow-[0_0_0_6px_hsl(var(--primary)/0.08)]">
              <Icon icon="ph:fork-knife" className="text-primary" width={40} />
            </div>

            <div className="relative">
              <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">
                Find eateries
                <br />
                <span className="text-primary">around you.</span>
              </h1>
              <p className="mt-4 text-muted-foreground max-w-xs mx-auto text-sm">
                Discover restaurants, cafés, bars, and more within walking
                distance — powered by OpenStreetMap.
              </p>
            </div>

            <div className="relative flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-xs text-muted-foreground">Radius:</span>
                {RADIUS_OPTIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRadius(r)}
                    className={`h-8 px-3 text-xs rounded-full border transition-all ${
                      radius === r
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r < 1000 ? `${r} m` : `${r / 1000} km`}
                  </button>
                ))}
              </div>

              <button
                onClick={() => findEateries(radius)}
                className="inline-flex items-center justify-center gap-2 h-11 px-7 text-sm font-medium rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Icon icon="ph:crosshair" width={18} />
                Find eateries near me
              </button>
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {(status === "locating" || status === "fetching") && (
          <div className="flex flex-col items-center justify-center min-h-[66vh] gap-5">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
              aria-hidden
            />
            <Icon
              icon="ph:spinner-gap"
              className="text-primary animate-spin relative"
              width={52}
            />
            <p className="font-heading text-lg relative">
              {status === "locating"
                ? "Getting your location…"
                : "Fetching nearby eateries…"}
            </p>
            <p className="text-xs text-muted-foreground relative">
              {status === "locating"
                ? "Please allow location access when prompted."
                : "Querying OpenStreetMap data…"}
            </p>
          </div>
        )}

        {/* ── Error ── */}
        {status === "error" && (
          <div className="flex flex-col items-center justify-center min-h-[66vh] gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
              <Icon
                icon="ph:warning-circle"
                className="text-primary"
                width={32}
              />
            </div>
            <div>
              <p className="font-heading text-xl font-semibold">
                Couldn't find eateries
              </p>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                {errorMsg}
              </p>
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="inline-flex items-center gap-2 h-9 px-4 text-xs rounded-full border border-border bg-card hover:bg-muted transition-all"
            >
              <Icon icon="ph:arrow-left" width={14} />
              Go back
            </button>
          </div>
        )}

        {/* ── Results ── */}
        {status === "done" && (
          <>
            {/* Filter bar */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">Type:</span>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`h-8 px-3 text-xs rounded-full border capitalize transition-all ${
                    filter === t
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "all"
                    ? `All (${eateries.length})`
                    : (TYPE_LABELS[t] ?? t)}
                </button>
              ))}

              <div className="ml-auto flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Radius:</span>
                {RADIUS_OPTIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRadius(r);
                      findEateries(r);
                    }}
                    className={`h-8 px-3 text-xs rounded-full border transition-all ${
                      radius === r
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r < 1000 ? `${r} m` : `${r / 1000} km`}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 gap-4 text-center">
                <Icon
                  icon="ph:magnifying-glass"
                  className="text-muted-foreground"
                  width={40}
                />
                <p className="text-muted-foreground text-sm">
                  No{" "}
                  {filter !== "all"
                    ? (TYPE_LABELS[filter] ?? filter).toLowerCase() + "s"
                    : "eateries"}{" "}
                  found in this radius.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((e) => (
                  <EateryCard key={e.id} eatery={e} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ─── Eatery Card ─────────────────────────────────────────────────────────────

function EateryCard({ eatery }: { eatery: Eatery }) {
  const icon = TYPE_ICONS[eatery.type] ?? "ph:fork-knife";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${eatery.lat},${eatery.lon}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.15),0_8px_24px_-12px_hsl(var(--primary)/0.4)]"
    >
      {/* Top row: icon + name + distance */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary">
          <Icon icon={icon} width={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading text-base font-semibold leading-snug group-hover:text-primary transition-colors truncate">
            {eatery.name}
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            <span className="inline-block rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              {TYPE_LABELS[eatery.type] ?? eatery.type}
            </span>
            {eatery.cuisine && (
              <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-primary">
                {eatery.cuisine}
              </span>
            )}
          </div>
        </div>
        <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
          {formatDistance(eatery.distance)}
        </span>
      </div>

      {/* Address */}
      {eatery.address && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon
            icon="ph:map-pin"
            width={12}
            className="shrink-0 text-primary/60"
          />
          <span className="truncate">{eatery.address}</span>
        </p>
      )}

      {/* Opening hours */}
      {eatery.opening_hours && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon
            icon="ph:clock"
            width={12}
            className="shrink-0 text-primary/60"
          />
          <span className="truncate">
            {eatery.opening_hours.length > 40
              ? eatery.opening_hours.slice(0, 40) + "…"
              : eatery.opening_hours}
          </span>
        </p>
      )}

      {/* Hover CTA */}
      <div className="mt-4 flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Open in Maps
        <Icon icon="ph:arrow-up-right" width={12} />
      </div>
    </a>
  );
}
