// --- MODÈLES ENTRANT DE L'API (Données du véhicule) ---

export interface VehicleDto {
  id: string;
  brand: string;         
  model: string;         
  engine: string;        
  basePrice: number;     
  imageUrl: string;
  energyClass: string;   
  co2Emissions: number;  
  consumption: number;   
  fuelType: string;      
  transmission: string;  
}

export interface ConfigOptionDto {
  id: string;
  categoryId: string;    
  categoryName: string;
  name: string;
  price: number;
  isMandatory: boolean;
  requiresOptionIds?: string[];
}

export interface ConfigColorDto {
  id: string;
  type: 'Exterior' | 'Interior';
  name: string;
  price: number;
  hexCode?: string; 
}

// --- PAYLOAD DE RECALCUL (Ce que le Front envoie au Back) ---

export interface CalculatePriceRequestDto {
  vehicleId: string;
  durationMonths: number;
  mileageKm: number;
  exteriorColorId?: string;
  interiorColorId?: string;
  selectedOptionIds: string[];
}

// --- RÉPONSE DU RECALCUL (Ce que le Back répond) ---

export interface PricingResultDto {
  tcoMonthly: number;         
  retailPriceTtc: number;     
  investedValueTtc: number;   
}