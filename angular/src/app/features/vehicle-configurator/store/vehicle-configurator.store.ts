import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, forkJoin, debounceTime } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

import { VehicleConfiguratorApiService } from '../services/vehicle-configurator-api.service';
import { 
  CalculatePriceRequestDto, 
  ConfigOptionDto, 
  PricingResultDto, 
  VehicleDto 
} from '../models/vehicle-configurator.models';
import { ADynamicConfigurationDto } from '../../../proxy/dynamic-components/common';
import { DynamicSelectConfigurationDto } from '../../../proxy/dynamic-components/models';

// 1. Définition de l'état (State)
type VehicleConfiguratorState = {
  vehicleId: string | null;
  vehicle: VehicleDto | null;
  dynamicFields: Record<string, ADynamicConfigurationDto>;
  availableOptions: ConfigOptionDto[];
  
  // Sélections utilisateur
  durationMonths: string | null; // string car le DynamicSelect renvoie des string
  mileageKm: string | null;
  exteriorColorId: string | null;
  interiorColorId: string | null;
  selectedOptionIds: string[];
  
  // Résultats financiers
  pricing: PricingResultDto | null;
  
  // États de chargement UI
  isInitialLoading: boolean;
  isCalculating: boolean;
};

const initialState: VehicleConfiguratorState = {
  vehicleId: null,
  vehicle: null,
  dynamicFields: {},
  availableOptions: [],
  durationMonths: null,
  mileageKm: null,
  exteriorColorId: null,
  interiorColorId: null,
  selectedOptionIds: [],
  pricing: null,
  isInitialLoading: false,
  isCalculating: false,
};

// 2. Création du Store
export const VehicleConfiguratorStore = signalStore(
  { providedIn: 'root' }, // ou au niveau du provider de la Page si tu veux le détruire en quittant la page
  
  withState(initialState),
  
  // 3. Computed Signals (Données dérivées prêtes pour l'UI)
  withComputed((state) => ({
    
    // Extraction des configurations dynamiques pour nos composants DynamicSelect
    durationConfig: computed(() => state.dynamicFields()['duration'] as DynamicSelectConfigurationDto | undefined),
    mileageConfig: computed(() => state.dynamicFields()['mileage'] as DynamicSelectConfigurationDto | undefined),
    exteriorColorConfig: computed(() => state.dynamicFields()['exteriorColor'] as DynamicSelectConfigurationDto | undefined),
    interiorColorConfig: computed(() => state.dynamicFields()['interiorColor'] as DynamicSelectConfigurationDto | undefined),

    // Regroupement des options par catégorie pour faciliter l'affichage HTML
    groupedOptions: computed(() => {
      const options = state.availableOptions();
      const groups = new Map<string, { categoryName: string; options: ConfigOptionDto[] }>();
      
      options.forEach(opt => {
        if (!groups.has(opt.categoryId)) {
          groups.set(opt.categoryId, { categoryName: opt.categoryName, options: [] });
        }
        groups.get(opt.categoryId)!.options.push(opt);
      });
      
      return Array.from(groups.values());
    }),

    // Génération automatique du payload pour le recalcul
    // Si ce Signal change, on doit recalculer le prix !
    calculationPayload: computed((): CalculatePriceRequestDto | null => {
      if (!state.vehicleId() || !state.durationMonths() || !state.mileageKm()) return null;
      
      return {
        vehicleId: state.vehicleId()!,
        durationMonths: Number(state.durationMonths()), // Conversion string -> number
        mileageKm: Number(state.mileageKm()),
        exteriorColorId: state.exteriorColorId() ?? undefined,
        interiorColorId: state.interiorColorId() ?? undefined,
        selectedOptionIds: state.selectedOptionIds()
      };
    })
  })),

  // 4. Méthodes et Effets (RxMethods)
  withMethods((state, apiService = inject(VehicleConfiguratorApiService)) => ({
    
    // A. Chargement initial de toutes les données du véhicule
    loadVehicleData: rxMethod<string>(
      pipe(
        tap(() => patchState(state, { isInitialLoading: true, vehicleId: null })),
        switchMap((vehicleId) => 
          forkJoin({
            vehicle: apiService.getVehicleDetails(vehicleId),
            fields: apiService.getDynamicFieldsConfiguration(vehicleId),
            options: apiService.getAvailableOptions(vehicleId)
          }).pipe(
            tapResponse({
              next: (result) => {
                // On initialise le state avec les données reçues ET les valeurs par défaut
                patchState(state, {
                  vehicleId,
                  vehicle: result.vehicle,
                  dynamicFields: result.fields,
                  availableOptions: result.options,
                  // Lecture des valeurs par défaut pour préparer la sélection
                  durationMonths: (result.fields['duration'] as DynamicSelectConfigurationDto)?.defaultValueIds?.[0] ?? null,
                  mileageKm: (result.fields['mileage'] as DynamicSelectConfigurationDto)?.defaultValueIds?.[0] ?? null,
                  exteriorColorId: null,
                  interiorColorId: null,
                  selectedOptionIds: [],
                  isInitialLoading: false
                });
              },
              error: (err) => {
                console.error('Erreur de chargement', err);
                patchState(state, { isInitialLoading: false });
              }
            })
          )
        )
      )
    ),

    // B. Moteur de recalcul de prix réactif
    calculatePrice: rxMethod<CalculatePriceRequestDto | null>(
      pipe(
        debounceTime(300), // Empêche le spam : attend 300ms après le dernier clic avant d'appeler l'API
        tap((payload) => {
          if (payload) patchState(state, { isCalculating: true });
        }),
        switchMap((payload) => {
          if (!payload) return []; // Si le payload est invalide (manque la durée par ex), on ne fait rien
          
          return apiService.calculatePrice(payload).pipe(
            tapResponse({
              next: (pricing) => patchState(state, { pricing, isCalculating: false }),
              error: (err) => {
                console.error('Erreur calcul prix', err);
                patchState(state, { isCalculating: false });
              }
            })
          );
        })
      )
    ),

    // C. Actions utilisateur pures (Mettent simplement à jour le State)
    updateDuration: (val: string | null) => patchState(state, { durationMonths: val }),
    updateMileage: (val: string | null) => patchState(state, { mileageKm: val }),
    updateExteriorColor: (val: string | null) => patchState(state, { exteriorColorId: val }),
    updateInteriorColor: (val: string | null) => patchState(state, { interiorColorId: val }),
    
    toggleOption: (optionId: string) => {
      const current = state.selectedOptionIds();
      const updated = current.includes(optionId) 
        ? current.filter(id => id !== optionId) // Désélection
        : [...current, optionId];               // Sélection
      patchState(state, { selectedOptionIds: updated });
    }
  })),

  // 5. Hooks : Branchement automatique du recalcul
  withHooks({
    onInit(store) {
      // Magie d'Angular Signals + RxJS : 
      // À chaque fois que le signal `calculationPayload` changera (ex: ajout d'une option), 
      // la rxMethod `calculatePrice` s'exécutera automatiquement !
      store.calculatePrice(store.calculationPayload);
    }
  })
);