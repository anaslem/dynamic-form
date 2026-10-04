import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { QuoterDataService } from '../services/quoter-data.service';
import { Vehicle, UserConfiguration, PricingResult } from '../models/quoter.models';

interface QuoterState {
  vehicle: Vehicle | null;
  config: UserConfiguration;
  pricing: PricingResult | null;
  isDirty: boolean;
  isLoading: boolean;
}

const initialState: QuoterState = {
  vehicle: null,
  config: { 
    contract: { months: 36, kilometers: 80000 }, 
    exteriorColorId: null, 
    interiorColorId: null, 
    selectedOptionIds: [], 
    supplierId: null 
  },
  pricing: null,
  isDirty: false,
  isLoading: false
};

export const QuoterStore = signalStore(
  withState(initialState),
  
  withComputed((store) => ({
    contractDisplay: computed(() => `${store.config.contract().months} mois · ${store.config.contract().kilometers} km`)
  })),
  
  // 1er bloc withMethods : Définition des méthodes de base
  withMethods((store) => {
    // Le inject doit être ici, dans le corps de la fonction
    const dataService = inject(QuoterDataService);
    
    return {
      updateContract(months: number, kilometers: number) {
        patchState(store, (state) => ({ 
          config: { ...state.config, contract: { months, kilometers } }, 
          isDirty: true 
        }));
      },
      
      recalculatePrice: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => dataService.calculatePrice(store.config())),
          tap((pricing) => patchState(store, { pricing, isDirty: false, isLoading: false }))
        )
      )
    };
  }),

  // 2ème bloc withMethods : Ce bloc a accès à `store.recalculatePrice()`
  withMethods((store) => {
    const dataService = inject(QuoterDataService);
    
    return {
      loadInitialData: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => dataService.getVehicleDetails()),
          tap((vehicle) => patchState(store, { vehicle })),
          tap(() => store.recalculatePrice()) // Désormais, ça fonctionne car la méthode a été accrochée au store
        )
      )
    };
  })
);