import { inject, computed } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { VehicleConfiguratorFormDto, VehicleConfiguratorFormService } from '../../proxy/vehicle-configurator';

type ConfiguratorState = {
  formConfig: VehicleConfiguratorFormDto | null;
  selections: Record<string, any>; // Stocke l'état du formulaire { "0000000560": 36, "couleur_ext": "72345" }
  isLoading: boolean;
  error: string | null;
};

const initialState: ConfiguratorState = {
  formConfig: null,
  selections: {},
  isLoading: false,
  error: null,
};

export const VehicleConfigurateurStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ formConfig, selections }) => ({
    
    // Dérivation de l'état
    globalInfo: computed(() => formConfig()?.globalInfo ?? null),
    
    // On trie les accordéons selon la propriété "Order" venant du backend
    accordions: computed(() => {
      const groups = formConfig()?.accordions ?? [];
      return [...groups].sort((a, b) => a.order! - b.order!);
    }),

    // Récupérer le payload final à envoyer pour sauvegarde
    currentPayload: computed(() => {
      return {
        requestNumber: formConfig()?.globalInfo?.requestNumber,
        selections: selections()
      };
    })
  })),
  
  withMethods((store, configService = inject(VehicleConfiguratorFormService)) => ({
    
    // Mise à jour du state lorsqu'un composant dynamique change
    updateSelection(componentId: string, value: any) {
      patchState(store, (state) => ({
        selections: { ...state.selections, [componentId]: value }
      }));
    },

    // Méthode réactive pour charger la configuration
    loadConfiguration: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((requestNumber) => {
          return configService.getConfiguration(requestNumber).pipe(
            tapResponse({
              next: (formConfig) => patchState(store, { formConfig, isLoading: false }),
              error: (err: any) => patchState(store, { error: err.message, isLoading: false }),
            })
          );
        })
      )
    )
  }))
);