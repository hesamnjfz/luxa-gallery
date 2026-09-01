/**
 * Vehicle domain types — keep API payloads aligned with this shape.
 */
export type BodyType =
  | "Coupe"
  | "Sedan"
  | "SUV"
  | "Convertible"
  | "Wagon";

export type Transmission = "Automatic" | "Manual" | "PDK" | "DCT";

export type Drivetrain = "RWD" | "AWD" | "FWD" | "4WD";

export type Vehicle = {
  /** Stable id */
  id: string;
  /** URL slug (e.g. porsche-911-carrera-s) */
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  drivetrain: Drivetrain;
  bodyType: BodyType;
  engine: string;
  horsepower: number;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  tagline: string;
  description: string;
  /** Cover image used in cards / listing */
  image: string;
  /** Full gallery (6–8 images) */
  gallery: string[];
  featured: boolean;
  /** Higher = more popular; used for sort. */
  popularity: number;
};

export type VehicleFilters = {
  brand: string | "all";
  bodyType: string | "all";
  year: number | "all";
  priceMin: number;
  priceMax: number;
};

export type VehicleSort =
  | "price-desc"
  | "price-asc"
  | "newest"
  | "popular";

export const PRICE_BOUNDS = { min: 10000, max: 400000 } as const;

/** Placeholder APR for client-side financing estimates */
export const FINANCE_APR = 0.059;
