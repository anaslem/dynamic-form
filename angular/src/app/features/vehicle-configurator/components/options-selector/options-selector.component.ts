import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigOptionDto } from '../../models/vehicle-configurator.models';

@Component({
  selector: 'app-options-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './options-selector.component.html',
  styleUrl: './options-selector.component.scss'
})
export class OptionsSelectorComponent {
  
  // --- INPUTS (Venant du Store via la Page) ---
  groupedOptions = input.required<{ categoryName: string; options: ConfigOptionDto[] }[]>();
  selectedOptionIds = input.required<string[]>();

  // --- OUTPUTS (Pour avertir le Store d'un changement) ---
  optionToggled = output<string>();

  // --- ÉTAT LOCAL (Propre à ce composant) ---
  searchQuery = signal<string>('');

  // --- COMPUTED (Filtrage local) ---
  // On filtre les options selon la recherche, tout en gardant la structure par catégorie
  filteredGroups = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const groups = this.groupedOptions();

    if (!query) return groups;

    return groups.map(group => ({
      categoryName: group.categoryName,
      // On garde uniquement les options dont le nom contient la recherche
      options: group.options.filter(opt => opt.name.toLowerCase().includes(query))
    })).filter(group => group.options.length > 0); // On cache les catégories vides
  });

  // --- ACTIONS ---
  onToggleOption(optionId: string) {
    this.optionToggled.emit(optionId);
  }

  // Vérifie si une option est cochée
  isSelected(optionId: string): boolean {
    return this.selectedOptionIds().includes(optionId);
  }
}