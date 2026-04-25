import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Eatery = {
  id: number;
  placeId: string;
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

type GooglePlace = {
  id: string;
  displayName?: { text: string };
  primaryType?: string;
  location: { latitude: number; longitude: number };
  formattedAddress?: string;
  currentOpeningHours?: { openNow?: boolean };
};

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

function mapPlaceType(googleType: string): string {
  const typeMap: Record<string, string> = {
    restaurant: "restaurant",
    cafe: "cafe",
    coffee_shop: "cafe",
    bar: "bar",
    pub: "pub",
    fast_food_restaurant: "fast_food",
    food_court: "food_court",
    meal_takeaway: "fast_food",
    meal_delivery: "fast_food",
  };
  return typeMap[googleType] ?? "restaurant";
}

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

// ─── Constants ───────────────────────────────────────────────────────────────

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

// Unsplash photo IDs per type for consistent card imagery (cycled by eatery.id % length)
const FOOD_PHOTOS: Record<string, string[]> = {
  restaurant: [
    "photo-1517248135467-4c7edcad34c4",
    "photo-1414235077428-338989a2e8c0",
    "photo-1424847651672-bf20a4b0982b",
    "photo-1550966871-3ed3cdb5ed0c",
    "photo-1467003909585-2f8a72700288",
    "photo-1555396273-367ea4eb4db5",
  ],
  cafe: [
    "photo-1495474472287-4d71bcdd2085",
    "photo-1501339847302-ac426a4a7cbb",
    "photo-1442512595331-e89e73853f31",
    "photo-1509042239860-f550ce710b93",
    "photo-1521017432531-fbd92d768814",
  ],
  fast_food: [
    "photo-1568901346375-23c9450c58cd",
    "photo-1552895638-f7fe08d2f7d5",
    "photo-1594212699903-ec8a3eca368f",
    "photo-1520072959219-c595dc870360",
    "photo-1571091718767-18b5b1457add",
  ],
  bar: [
    "photo-1574096079513-d8259312b785",
    "photo-1514362545857-3bc16c4c7d1b",
    "photo-1572116469696-31de0f17cc34",
    "photo-1546171753-97d7676e4602",
  ],
  pub: [
    "photo-1559526324-4b87b5e36e44",
    "photo-1575037614876-c38a4d44f5b8",
    "photo-1566633806827-5ecfef8f7c3f",
  ],
  food_court: [
    "photo-1567521464027-f127ff144326",
    "photo-1555396273-367ea4eb4db5",
    "photo-1504674900247-0877df9cc836",
  ],
};

function getPhotoUrl(eatery: Eatery) {
  const photos = FOOD_PHOTOS[eatery.type] ?? FOOD_PHOTOS.restaurant;
  const id = photos[eatery.id % photos.length];
  return `https://images.unsplash.com/${id}?w=400&h=240&fit=crop&auto=format&q=80`;
}

// ─── EateryCard ───────────────────────────────────────────────────────────────

function EateryCard({ eatery }: { eatery: Eatery }) {
  const [imgError, setImgError] = useState(false);
  const icon = TYPE_ICONS[eatery.type] ?? "ph:fork-knife";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eatery.name)}&query_place_id=${eatery.placeId}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.15),0_12px_32px_-12px_hsl(var(--primary)/0.4)]"
    >
      {/* Image area */}
      <div className="relative h-44 overflow-hidden bg-card shrink-0">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-card to-primary/10">
            <Icon icon={icon} className="text-primary/60" width={48} />
          </div>
        ) : (
          <img
            src={getPhotoUrl(eatery)}
            alt={eatery.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Distance badge */}
        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white/90">
          <Icon icon="ph:map-pin-simple" width={12} />
          {formatDistance(eatery.distance)}
        </span>
        {/* Name overlaid at bottom of image */}
        <p className="absolute bottom-2.5 left-3 right-3 font-heading text-sm font-semibold text-white leading-snug drop-shadow">
          {eatery.name}
        </p>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2 p-4">
        {/* Type + cuisine badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 h-6 px-2 text-xs rounded-full border border-primary/30 bg-primary/10 text-primary">
            <Icon icon={icon} width={11} />
            {TYPE_LABELS[eatery.type] ?? eatery.type}
          </span>
          {eatery.cuisine && (
            <span className="h-6 px-2 text-xs rounded-full border border-border bg-background text-muted-foreground capitalize">
              {eatery.cuisine}
            </span>
          )}
        </div>

        {/* Address */}
        {eatery.address && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
            <Icon icon="ph:map-pin" width={11} className="shrink-0" />
            {eatery.address}
          </p>
        )}

        {/* Opening hours */}
        {eatery.opening_hours && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
            <Icon icon="ph:clock" width={11} className="shrink-0" />
            {eatery.opening_hours}
          </p>
        )}

        {/* CTA hint */}
        <p className="mt-auto pt-1 text-xs font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Open in Google Maps
          <Icon icon="ph:arrow-square-out" width={11} />
        </p>
      </div>
    </a>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function FindEateries() {
  const [status, setStatus] = useState<Status>("idle");
  const [eateries, setEateries] = useState<Eatery[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [radius, setRadius] = useState(1000);
  const [filter, setFilter] = useState("all");

  const prefersReducedMotion = useReducedMotion();

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
      const res = await fetch(
        "https://places.googleapis.com/v1/places:searchNearby",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask":
              "places.id,places.displayName,places.primaryType,places.location,places.formattedAddress,places.currentOpeningHours",
          },
          body: JSON.stringify({
            includedTypes: [
              "restaurant",
              "cafe",
              "bar",
              "pub",
              "fast_food_restaurant",
              "food_court",
            ],
            maxResultCount: 20,
            locationRestriction: {
              circle: {
                center: { latitude: lat, longitude: lon },
                radius: r,
              },
            },
          }),
        },
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const msg =
          (errData as { error?: { message?: string } }).error?.message ??
          `API error ${res.status}`;
        throw new Error(msg);
      }

      const data = (await res.json()) as { places?: GooglePlace[] };
      const places = data.places ?? [];

      const results: Eatery[] = places.map((place, idx) => ({
        id: idx,
        placeId: place.id,
        name: place.displayName?.text ?? "Unknown",
        type: mapPlaceType(place.primaryType ?? "restaurant"),
        lat: place.location.latitude,
        lon: place.location.longitude,
        distance: haversine(
          lat,
          lon,
          place.location.latitude,
          place.location.longitude,
        ),
        address: place.formattedAddress,
        opening_hours:
          place.currentOpeningHours?.openNow != null
            ? place.currentOpeningHours.openNow
              ? "Open now"
              : "Closed"
            : undefined,
      }));

      results.sort((a, b) => a.distance - b.distance);
      setEateries(results);
      setFilter("all");
      setStatus("done");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setErrorMsg(
        msg.toLowerCase().includes("key") ||
          msg.includes("401") ||
          msg.includes("403") ||
          msg.includes("REQUEST_DENIED")
          ? "Invalid API key. Check your Google Maps API key and ensure the Places API (New) is enabled."
          : "Failed to fetch nearby eateries. Please try again.",
      );
      setStatus("error");
    }
  }

  // suppress unused warning — userLoc used for potential future map feature
  void userLoc;

  const types = ["all", ...Array.from(new Set(eateries.map((e) => e.type)))];
  const filtered =
    filter === "all" ? eateries : eateries.filter((e) => e.type === filter);
  const busy = status === "locating" || status === "fetching";

  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      {/* ── Page title (shown when idle or done) ── */}
      {(status === "idle" || status === "done") && (
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-heading text-2xl font-semibold">
              Find Eateries
            </h1>
            {status === "done" && (
              <p className="mt-1 text-sm text-muted-foreground">
                {eateries.length} place{eateries.length !== 1 ? "s" : ""} found
                within {radius < 1000 ? `${radius} m` : `${radius / 1000} km`}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => findEateries(radius)}
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-medium rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {busy ? (
                <>
                  <Icon
                    icon="ph:spinner-gap"
                    className="animate-spin"
                    width={16}
                  />
                  {status === "locating" ? "Locating…" : "Fetching…"}
                </>
              ) : (
                <>
                  <Icon icon="ph:crosshair" width={16} />
                  {status === "done" ? "Search again" : "Find near me"}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Idle / Hero ── */}
      {status === "idle" && (
        <div className="flex flex-col items-center justify-center min-h-[58vh] text-center gap-8">
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
            aria-hidden
          />

          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-border bg-card shadow-[0_0_0_6px_hsl(var(--primary)/0.08)]"
          >
            <Icon icon="ph:fork-knife" className="text-primary" width={40} />
          </motion.div>

          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <h2 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">
              Find eateries
              <br />
              <span className="text-primary">around you.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xs mx-auto text-sm">
              Discover restaurants, cafés, bars, and more within walking
              distance — powered by Google Maps.
            </p>
          </motion.div>

          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex flex-col items-center gap-3"
          >
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
          </motion.div>
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
              : "Querying Google Maps…"}
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

          {/* Cards grid */}
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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((e, i) => (
                <motion.div
                  key={e.id}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 24 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                >
                  <EateryCard eatery={e} />
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
