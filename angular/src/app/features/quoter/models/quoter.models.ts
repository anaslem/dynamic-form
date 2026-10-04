export interface Vehicle {
  id: string; brand: string; model: string; version: string;
  internalRef: string; demandRef: string; energy: string;
  transmission: string; consumption: string; seats: number;
  co2Value: number; co2Class: string; catalogPrice: number;
}

export interface QuoterContract { months: number; kilometers: number; }

export interface CatalogOption {
  id: string; label: string; priceDisplay: string; priceAmount: number; type: string;
}

export interface UserConfiguration {
  contract: QuoterContract; exteriorColorId: string | null;
  interiorColorId: string | null; selectedOptionIds: string[]; supplierId: string | null;
}

export interface PricingResult {
  monthlyRent: number; tco: number; investedValue: number;
  optionsTotal: number; globalDiscountPercent: number;
}