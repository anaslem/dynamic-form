import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { 
  CalculatePriceRequestDto, 
  ConfigOptionDto, 
  PricingResultDto, 
  VehicleDto 
} from '../models/vehicle-configurator.models';
import { ADynamicConfigurationDto } from '../../../proxy/dynamic-components/common';
import { DynamicComponentType } from '../../../proxy/enums';
import { DynamicSelectConfigurationDto } from '../../../proxy/dynamic-components';

@Injectable({
  providedIn: 'root'
})
export class VehicleConfiguratorApiService {

  // 1. Appel API pour charger les informations de base du véhicule
  getVehicleDetails(vehicleId: string): Observable<VehicleDto> {
    const mockVehicle: VehicleDto = {
      id: vehicleId,
      brand: 'Alfa Romeo',
      model: 'Giulia',
      engine: '2.2 D 160 BA',
      basePrice: 46466.58,
      imageUrl: 'assets/images/cars/giulia.png', // Mettre une image de test dans tes assets plus tard
      energyClass: 'D',
      co2Emissions: 138,
      consumption: 5.1,
      fuelType: 'Diesel',
      transmission: 'Automatique'
    };
    return of(mockVehicle).pipe(delay(300));
  }

  // 2. Appel API pour charger la configuration des champs (Durée, Kilométrage, Couleurs)
  getDynamicFieldsConfiguration(vehicleId: string): Observable<Record<string, ADynamicConfigurationDto>> {
    const mockConfigs: Record<string, ADynamicConfigurationDto> = {
      
      duration: {
        dynamicComponentType: DynamicComponentType.Select,
        id: 'field_duration',
        name: 'durationMonths',
        label: 'Durée',
        isDropDownDisplay: true,
        isMultiSelect: false,
        isClearable: false,
        required: true,
        defaultValueIds: ['36'],
        staticItems: [
          { id: '24', value: '24 mois' },
          { id: '36', value: '36 mois' },
          { id: '48', value: '48 mois' }
        ]
      } as DynamicSelectConfigurationDto,

      mileage: {
        dynamicComponentType: DynamicComponentType.Select,
        id: 'field_mileage',
        name: 'mileageKm',
        label: 'Kilométrage',
        isDropDownDisplay: true,
        isMultiSelect: false,
        isClearable: false,
        required: true,
        defaultValueIds: ['80000'],
        staticItems: [
          { id: '40000', value: '40 000 km' },
          { id: '60000', value: '60 000 km' },
          { id: '80000', value: '80 000 km' }
        ]
      } as DynamicSelectConfigurationDto,

      exteriorColor: {
        dynamicComponentType: DynamicComponentType.Select,
        id: 'field_ext_color',
        name: 'exteriorColorId',
        label: 'Sélectionnez une couleur extérieure',
        placeholder: 'Choisir une couleur',
        isDropDownDisplay: true,
        isMultiSelect: false,
        isClearable: true,
        staticItems: [
          { id: 'ext_red', value: 'Rouge Alfa pastel (0 €)' },
          { id: 'ext_black', value: 'Noir Vulcano métallisé (+1000 €)' }
        ]
      } as DynamicSelectConfigurationDto,

      interiorColor: {
        dynamicComponentType: DynamicComponentType.Select,
        id: 'field_int_color',
        name: 'interiorColorId',
        label: 'Sélectionnez une couleur intérieure',
        placeholder: 'Choisir un intérieur',
        isDropDownDisplay: true,
        isMultiSelect: false,
        isClearable: true,
        staticItems: [
          { id: 'int_black', value: 'Tissu noir (0 €)' }
        ]
      } as DynamicSelectConfigurationDto
    };

    return of(mockConfigs).pipe(delay(300));
  }

  // 3. Appel API pour charger les options classiques (Packs, Équipements)
  getAvailableOptions(vehicleId: string): Observable<ConfigOptionDto[]> {
    const mockOptions: ConfigOptionDto[] = [
      { id: 'pack_exec', categoryId: 'PACKS', categoryName: 'Packs', name: 'Pack Executive', price: 1500, isMandatory: false },
      { id: 'pack_int', categoryId: 'PACKS', categoryName: 'Packs', name: 'Pack Intérieur Premium', price: 2500, isMandatory: false },
      { id: 'eq_roof', categoryId: 'EQUIPEMENTS', categoryName: 'Équipements', name: 'Toit ouvrant panoramique', price: 1700, isMandatory: false },
      { id: 'eq_audio', categoryId: 'EQUIPEMENTS', categoryName: 'Équipements', name: 'Harman Kardon', price: 1200, isMandatory: false }
    ];
    return of(mockOptions).pipe(delay(300));
  }

  // 4. Appel API (POST) pour recalculer les prix suite à une modification
  calculatePrice(request: CalculatePriceRequestDto): Observable<PricingResultDto> {
    const baseMonthly = 600;
    const durationFactor = request.durationMonths === 36 ? 1 : (request.durationMonths === 24 ? 1.2 : 0.9);
    const optionsCost = request.selectedOptionIds.length * 50; 
    
    const mockPricing: PricingResultDto = {
      tcoMonthly: (baseMonthly + optionsCost) * durationFactor,
      retailPriceTtc: 60900.00 + (request.selectedOptionIds.length * 1500),
      investedValueTtc: 46466.58 + (request.selectedOptionIds.length * 1000)
    };

    return of(mockPricing).pipe(delay(400));
  }
}