import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicSelectComponent } from '../shared/components/dynamic-select/dynamic-select.component';

// TODO: Ajuste le chemin d'import selon la génération de tes proxys
import type { DynamicInputConfigurationDto, DynamicSelectConfigurationDto } from '../proxy/dynamic-components/models';import { Component, OnInit } from '@angular/core';
import { DynamicInputValueType } from '../proxy/enums';
import { DynamicInputComponent } from '../shared/components/dynamic-input/dynamic-input.component';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicSelectComponent, DynamicInputComponent],
  templateUrl: './test-select.component.html'
})
export class TestSelectComponent implements OnInit {
  
  // ==========================================
  // SCÉNARIO 1 : Dropdown Simple (Single Select)
  // Vérifie : l'affichage de base, le bouton au hover, single select.
  // ==========================================
  config1: DynamicSelectConfigurationDto = {
    isDropDownDisplay: true,
    isMultiSelect: false,
    shouldEnableAutocomplete: false,
    label: '1. Langue principale (Dropdown Single)',
    placeholder: 'Sélectionnez une langue',
    isClearable: true,
    disabled: false,
    required: true,
    staticItems: [
      { id: 'fr', value: 'Français' },
      { id: 'en', value: 'Anglais' },
      { id: 'es', value: 'Espagnol' }
    ]
  };
  valeur1: string | null = 'fr'; // 'Français' pré-sélectionné

  // ==========================================
  // SCÉNARIO 2 : Dropdown Multi + Limite (Max 2)
  // Vérifie : la sélection multiple, la désactivation visuelle/fonctionnelle à la limite.
  // ==========================================
  config2: DynamicSelectConfigurationDto = {
    isDropDownDisplay: true,
    isMultiSelect: true,
    shouldEnableAutocomplete: true,
    maxSelectionLength: 2,
    messageWhenMaxSelectionLengthExceeded: 'Maximum 2 destinations autorisées.',
    label: '2. Destinations (Multi limitées à 2)',
    placeholder: 'Choisissez vos pays',
    isClearable: true,
    disabled: false,
    required: false,
    staticItems: [
      { id: 'ma', value: 'Maroc' },
      { id: 'lk', value: 'Sri Lanka' },
      { id: 'fr', value: 'France' },
      { id: 'jp', value: 'Japon' }
    ]
  };
  valeur2: string[] = ['ma']; // 'Maroc' pré-sélectionné (reste 1 choix possible)

  // ==========================================
  // SCÉNARIO 3 : Liste Plate Single Select
  // Vérifie : le rendu plat, la bascule de sélection unique sans dropdown.
  // ==========================================
  config3: DynamicSelectConfigurationDto = {
    isDropDownDisplay: false,
    isMultiSelect: false,
    shouldEnableAutocomplete: true,
    label: '3. Rôle utilisateur (Liste Single)',
    placeholder: 'Rôle',
    isClearable: false,
    disabled: false,
    required: true,
    staticItems: [
      { id: 'admin', value: 'Administrateur' },
      { id: 'user', value: 'Utilisateur Standard' },
      { id: 'guest', value: 'Invité' }
    ]
  };
  valeur3: string | null = null; // Vide au départ

  // ==========================================
  // SCÉNARIO 4 : Liste Plate Multi Select + Options Disabled
  // Vérifie : options grisées in-cliquables, sélection multiple en liste.
  // ==========================================
  config4: DynamicSelectConfigurationDto = {
    isDropDownDisplay: false,
    isMultiSelect: true,
    shouldEnableAutocomplete: false,
    label: '4. Permissions (Liste Multi + Disabled)',
    placeholder: '',
    isClearable: false,
    disabled: false,
    required: false,
    staticItems: [
      { id: 'read', value: 'Lecture' },
      { id: 'write', value: 'Écriture' },
      { id: 'delete', value: 'Suppression (Désactivé par le système)', disabled: true }, // Option in-cliquable
      { id: 'share', value: 'Partage' }
    ]
  };
  valeur4: string[] = ['read', 'write'];

  // ==========================================
  // SCÉNARIO 5 : Composant entièrement désactivé
  // Vérifie : l'état disabled global du composant (attribut HTML).
  // ==========================================
  config5: DynamicSelectConfigurationDto = {
    isDropDownDisplay: true,
    isMultiSelect: false,
    shouldEnableAutocomplete: false,
    label: '5. Composant Désactivé (Global)',
    placeholder: 'Impossible de modifier',
    isClearable: false,
    disabled: true, // Désactive TOUT le composant
    required: false,
    staticItems: [
      { id: '1', value: 'Option figée 1' },
      { id: '2', value: 'Option figée 2' }
    ]
  };
  valeur5: string = '1';


  // 1. La liste reçue (simulant le retour de l'API)
  apiInputConfigurations: DynamicInputConfigurationDto[] = [
    {
      dynamicComponentType: 3,
      name: 'firstName', // <-- Très important : c'est la clé de notre donnée
      valueType: DynamicInputValueType.Text,
      label: 'Prénom',
      defaultValue: 'Jean',
      isDisplayed: true
    },
    {
      dynamicComponentType: 3,
      name: 'age',
      valueType: DynamicInputValueType.Integer,
      label: 'Âge',
      defaultValue: '30', // String depuis l'API
      isDisplayed: true
    },
    {
      dynamicComponentType: 3,
      name: 'salary',
      valueType: DynamicInputValueType.Decimal,
      label: 'Salaire',
      suffix: 'MAD',
      defaultValue: '', // Pas de valeur par défaut
      isDisplayed: true
    }
  ];

  // 2. L'objet qui va stocker TOUTES les valeurs du formulaire
  formData: Record<string, any> = {};

  ngOnInit() {
    // 3. Initialisation dynamique des valeurs par défaut
    this.apiInputConfigurations.forEach(config => {
      
      let initialValue: any = null;
      const defVal = config.defaultValue;

      if (defVal != null && defVal !== '') {
        // La fameuse conversion selon le type
        if (config.valueType === DynamicInputValueType.Integer || config.valueType === DynamicInputValueType.Decimal) {
          initialValue = Number(defVal);
        } else {
          initialValue = defVal;
        }
      }

      // On affecte la valeur au dictionnaire en utilisant le "name" comme clé
      if (config.name) {
        this.formData[config.name] = initialValue;
      }
    });
  }


  // Scénario 1 : Texte simple avec Default Value
  configInputText = {
    dynamicComponentType: 3, // Input
    valueType: DynamicInputValueType.Text,
    label: '1. Nom du projet (Texte)',
    placeholder: 'Saisissez le nom...',
    maxLength: 50,
    required: true,
    defaultValue: 'Projet Alpha'
  };
  valeurInputText: string = 'Projet Alpha'; // Sera écrasé par le defaultValue au init

  // Scénario 2 : Décimal avec Suffixe (Prefix) et Min/Max
  configInputDecimal = {
    valueType: DynamicInputValueType.Decimal,
    label: '2. Budget Estimé (Décimal)',
    placeholder: '0.00',
    prefix: 'MAD', // Affiché à droite
    indicator: 'Le budget doit être compris entre 100 et 10 000 MAD.',
    range: { minValue: 100, maxValue: 10000 },
    step: 50.5
  };
  valeurInputDecimal: number | null = null;

  // Scénario 3 : Integer bloqué (Disabled)
  configInputInteger = {
    valueType: DynamicInputValueType.Integer,
    label: '3. Âge (Entier Désactivé)',
    disabled: true,
    defaultValue: '30'
  };
  valeurInputInteger: number | null = 30; // Valeur par défaut affichée mais non modifiable

  // Scénario 4 : Code Postal (Regex, MinLength, Clearable)
  configInputPostal = {
    dynamicComponentType: 3, // Input
    valueType: DynamicInputValueType.Text,
    label: '4. Code Postal (Regex + Clearable)',
    placeholder: 'Ex: 75000',
    indicator: 'Doit contenir exactement 5 chiffres.',
    isClearable: true,
    minLength: 5,
    maxLength: 5,
    regexPattern: '^[0-9]{5}$' // Autorise uniquement 5 chiffres
  };
  valeurInputPostal: string | null = null;

  onLogChange(nouvelleValeur: any) {
    console.log(`[Modification] `, nouvelleValeur);
  }
}