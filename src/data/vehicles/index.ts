import type { Vehicle, VehicleFilters, VehicleSort } from "./types";
import { FINANCE_APR, PRICE_BOUNDS } from "./types";
import { MOCK_VEHICLES } from "./mock";

export function filterVehicles(
  vehicles: Vehicle[],
  filters: VehicleFilters,
): Vehicle[] {
  return vehicles.filter((v) => {
    if (filters.brand !== "all" && v.make !== filters.brand) return false;
    if (filters.bodyType !== "all" && v.bodyType !== filters.bodyType)
      return false;
    if (filters.year !== "all" && v.year !== filters.year) return false;
    if (v.price < filters.priceMin || v.price > filters.priceMax) return false;
    return true;
  });
}

export function sortVehicles(
  vehicles: Vehicle[],
  sort: VehicleSort,
): Vehicle[] {
  const list = [...vehicles];
  switch (sort) {
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "newest":
      return list.sort((a, b) => b.year - a.year || b.popularity - a.popularity);
    case "popular":
      return list.sort((a, b) => b.popularity - a.popularity);
    default:
      return list;
  }
}

export function queryVehicles(
  vehicles: Vehicle[],
  filters: VehicleFilters,
  sort: VehicleSort,
): Vehicle[] {
  return sortVehicles(filterVehicles(vehicles, filters), sort);
}

export function defaultFilters(): VehicleFilters {
  return {
    brand: "all",
    bodyType: "all",
    year: "all",
    priceMin: PRICE_BOUNDS.min,
    priceMax: PRICE_BOUNDS.max,
  };
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return MOCK_VEHICLES.find((v) => v.slug === slug || v.id === slug);
}

/** Similar cars: same body type preferred, then popularity — excludes current. */
export function getSimilarVehicles(
  vehicle: Vehicle,
  limit = 6,
): Vehicle[] {
  return [...MOCK_VEHICLES]
    .filter((v) => v.id !== vehicle.id)
    .sort((a, b) => {
      const aScore =
        (a.bodyType === vehicle.bodyType ? 100 : 0) +
        (a.make === vehicle.make ? 40 : 0) +
        a.popularity;
      const bScore =
        (b.bodyType === vehicle.bodyType ? 100 : 0) +
        (b.make === vehicle.make ? 40 : 0) +
        b.popularity;
      return bScore - aScore;
    })
    .slice(0, limit);
}

/** Standard amortizing loan payment — placeholder client-side estimate. */
export function estimateMonthlyPayment(
  price: number,
  downPayment: number,
  termMonths: number,
  annualRate = FINANCE_APR,
): number {
  const principal = Math.max(price - downPayment, 0);
  if (principal <= 0 || termMonths <= 0) return 0;
  const r = annualRate / 12;
  if (r === 0) return principal / termMonths;
  const factor = Math.pow(1 + r, termMonths);
  return (principal * r * factor) / (factor - 1);
}

export const USD_TO_TOMAN = 95_000;

export function formatPrice(value: number, locale = "en"): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Approximate Toman equivalent (USD × rate). */
export function formatPriceToman(usd: number, locale = "en"): string {
  const toman = Math.round(usd * USD_TO_TOMAN);
  const amount = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  ).format(toman);
  return locale === "fa" ? `${amount} تومان` : `${amount} Toman`;
}

export function formatMileage(value: number, locale = "en"): string {
  return `${new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value)} mi`;
}

export function featuredVehicles(vehicles: Vehicle[]) {
  return vehicles.filter((v) => v.featured);
}

/** Highest-demand featured cars for the weekly editorial strip. */
export function weeklyPicks(vehicles: Vehicle[], limit = 3) {
  return [...vehicles]
    .filter((v) => v.featured)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export {
  MOCK_VEHICLES,
  VEHICLE_BRANDS,
  VEHICLE_BODY_TYPES,
  VEHICLE_YEARS,
} from "./mock";
export type {
  Vehicle,
  VehicleFilters,
  VehicleSort,
  BodyType,
  Transmission,
  Drivetrain,
} from "./types";
export { PRICE_BOUNDS, FINANCE_APR } from "./types";
