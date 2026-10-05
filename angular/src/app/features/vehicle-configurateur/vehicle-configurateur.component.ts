import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@abp/ng.core';
import { DynamicSelectComponent } from '../../shared/components/dynamic-select/dynamic-select.component';
import { DynamicInputComponent } from '../../shared/components/dynamic-input/dynamic-input.component';
import { VehicleConfigurateurStore } from './vehicle-configurateur.store';
import { DynamicComponentType } from '../../proxy/enums';
import { ADynamicConfigurationDto } from '../../proxy/dynamic-components/common';
import { DynamicInputConfigurationDto, DynamicSelectConfigurationDto } from '../../proxy/dynamic-components';

@Component({
  selector: 'app-vehicle-configurator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CoreModule, 
    DynamicInputComponent, 
    DynamicSelectComponent
  ],
  templateUrl: './vehicle-configurateur.component.html',
  providers: [VehicleConfigurateurStore] // Instanciation locale
})
export class VehicleConfigurateurComponent implements OnInit {
  
  readonly store = inject(VehicleConfigurateurStore);
  readonly ComponentTypes = DynamicComponentType; 

  activeGroup = signal<string | null>(null);

  
  constructor() {
    effect(() => {
      const accordions = this.store.accordions();
      if (accordions.length > 0 && !this.activeGroup()) {
        this.activeGroup.set(accordions[0].groupCode!);
      }
    });
  }

  ngOnInit() {
    // ID mocké, normalement récupéré via ActivatedRoute (ex: route.snapshot.params['id'])
    this.store.loadConfiguration('1927745');
  }

  // Événement levé par Angular Forms (ngModelChange)
  onComponentValueChanged(componentId: string, value: any) {
    this.store.updateSelection(componentId, value);
    
    // LOGIQUE ENTREPRISE : 
    // Ici on pourrait déclencher un debounce pour rappeler le serveur 
    // et recalculer le Loyer/TCO en temps réel avec le nouveau Payload.
    // console.log("Current Form Payload : ", this.store.currentPayload());
  }

  // === HELPERS DE CASTING POUR LE HTML ===
  asInput(config: ADynamicConfigurationDto): DynamicInputConfigurationDto {
    return config as DynamicInputConfigurationDto;
  }

  asSelect(config: ADynamicConfigurationDto): DynamicSelectConfigurationDto {
    return config as DynamicSelectConfigurationDto;
  }

  toggleAccordion(groupCode: string) {
    // Si on clique sur celui déjà ouvert, on le ferme (null). Sinon, on l'ouvre.
    this.activeGroup.update(current => current === groupCode ? null : groupCode);
  }
}