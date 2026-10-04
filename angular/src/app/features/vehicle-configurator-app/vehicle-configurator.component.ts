import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ADynamicConfigurationDto } from '../../proxy/dynamic-components/common';
import { VehicleConfiguratorService } from '../../proxy/dynamic-components';
import { DynamicSelectComponent } from '../../shared/components/dynamic-select/dynamic-select.component';
import { DynamicInputComponent } from '../../shared/components/dynamic-input/dynamic-input.component';

// Définition d'un groupe pour l'accordéon
interface AccordionGroup {
  name: string;
  isOpen: boolean; // Pour gérer l'ouverture/fermeture visuelle
  components: ADynamicConfigurationDto[];
}

export type RenderItem = 
  | { type: 'standalone'; component: ADynamicConfigurationDto; order: number }
  | { type: 'group'; name: string; components: ADynamicConfigurationDto[]; isOpen: boolean; order: number };

@Component({
  selector: 'app-vehicle-configurator',
  standalone: true,
  imports: [CommonModule, DynamicSelectComponent, DynamicInputComponent],
  templateUrl: './vehicle-configurator.component.html',
  styleUrls: ['./vehicle-configurator.component.scss']
})
export class VehicleConfiguratorComponent implements OnInit {
  private configService = inject(VehicleConfiguratorService);

  // Signal qui contient la liste brute venue du backend
  rawComponents = signal<ADynamicConfigurationDto[]>([]);

  // Le nouveau signal calculé qui mélange les Autonomes et les Groupes !
  renderItems = computed<RenderItem[]>(() => {
    const items: RenderItem[] = [];
    const groupsMap = new Map<string, ADynamicConfigurationDto[]>();

    this.rawComponents().forEach(comp => {
      if (comp.groupName) {
        // 1. C'est une prestation, on la met dans l'accordéon correspondant
        if (!groupsMap.has(comp.groupName)) {
          groupsMap.set(comp.groupName, []);
        }
        groupsMap.get(comp.groupName)!.push(comp);
      } else {
        // 2. C'EST LA CORRECTION : Options et Accessoires n'ont pas de groupe, ils sont autonomes
        items.push({
          type: 'standalone',
          component: comp,
          order: comp.order ?? 0
        });
      }
    });

    // 3. Transformation des groupes en RenderItem
    Array.from(groupsMap.entries()).forEach(([name, components]) => {
      components.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      items.push({
        type: 'group',
        name: name,
        components: components,
        isOpen: false, // (Mettre true si tu veux que ce soit ouvert par défaut)
        order: components[0].order ?? 0 // L'ordre du groupe est dicté par son 1er élément
      });
    });

    // 4. On trie le tableau final (qui mélange Autonomes et Groupes) selon l'ordre du backend !
    return items.sort((a, b) => a.order - b.order);
  });

  ngOnInit() {
    this.loadConfiguration();
  }

  loadConfiguration() {
    const mockVehicleId = 438656; // ID de test de l'AS400
    this.configService.getConfigurationForm(mockVehicleId).subscribe({
      next: (data) => {
        console.log('Configuration reçue du backend :', data);
        this.rawComponents.set(data);
        // On ouvre le premier accordéon par défaut
        // if (this.accordionGroups().length > 0) {
        //    this.accordionGroups()[0].isOpen = true;
        // }
      }
    });
  }

  toggleAccordion(group: AccordionGroup) {
    group.isOpen = !group.isOpen;
  }

  // =======================================================
  // LE MOTEUR DE RÈGLES DYNAMIQUES (Le Cœur Réactif)
  // =======================================================
  onValueChanged(componentId: string, newValue: any) {
    const currentList = this.rawComponents();
    let hasChanges = false;

    // On parcourt TOUS les composants pour voir si l'un d'eux écoute ce changement
    currentList.forEach(targetComp => {
      if (targetComp.filterRules && targetComp.filterRules.length > 0) {
        
        targetComp.filterRules.forEach(rule => {
          if (rule.targetFilterId === componentId) {
            // La règle concerne bien le composant qui vient d'être modifié !
            
            // On évalue la condition (ex: si newValue == true)
            const conditionMet = (newValue === rule.targetValue);

            // On applique l'action demandée par le backend
            if (rule.actionType === 0) { // 0 = Show (selon ton Enum backend)
              targetComp.isDisplayed = conditionMet;
              hasChanges = true;
            }
          }
        });
      }
    });

    // Si l'affichage d'un composant a changé, on met à jour le signal pour forcer le rendu Angular
    if (hasChanges) {
      this.rawComponents.set([...currentList]);
    }
  }
}