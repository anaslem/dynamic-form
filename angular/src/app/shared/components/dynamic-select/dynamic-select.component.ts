import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  forwardRef,
  input,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@abp/ng.core';

// TODO: Ajuste le chemin d'importation selon l'emplacement exact de tes proxys générés
import type { DynamicSelectConfigurationDto } from '../../../proxy/dynamic-components/models';
import type {  DynamicOptionDto } from '../../../proxy/dynamic-components/common';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  imports: [CommonModule, FormsModule, CoreModule],
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicSelectComponent),
      multi: true
    }
  ]
})
export class DynamicSelectComponent implements ControlValueAccessor, OnInit {

  // ... (garde ton code existant) ...

  ngOnInit() {
    // Si on a des valeurs par défaut depuis le backend ET que rien n'a été coché
    const defaults = this.safeConfig().defaultValueIds;
    if (defaults && defaults.length > 0 && this.selectedIds().length === 0) {
      this.selectedIds.set(defaults);
      
      // Optionnel : Notifier le parent (ngModel) de cette initialisation par défaut
      const formValue = this.safeConfig().isMultiSelect ? defaults : defaults[0];
      this.onChange(formValue);
    }
  }
  
  // --- INPUTS ---
  config = input.required<DynamicSelectConfigurationDto>();

  // --- CONFIGURATION NORMALISÉE ---
  safeConfig = computed(() => {
    const c = this.config();
    return {
      id: c.id ?? 'select-' + Math.random().toString(36).substring(2, 9),
      name: c.name ?? '',
      isDisplayed: c.isDisplayed ?? true,
      isDropDownDisplay: c.isDropDownDisplay ?? true, // <-- CORRECTION : Remis à sa place !
      label: c.label ?? '',
      placeholder: c.placeholder ?? '::GenericComponent:Select:DefaultPlaceholder',
      isMultiSelect: c.isMultiSelect ?? false,
      maxSelectionLength: c.maxSelectionLength,
      messageWhenMaxSelectionLengthExceeded: c.messageWhenMaxSelectionLengthExceeded ?? '::GenericComponent:Select:DefaultMessageWhenMaxSelectionLengthExceeded',
      shouldEnableAutocomplete: c.shouldEnableAutocomplete ?? false,
      isClearable: c.isClearable ?? true,
      disabled: c.disabled ?? false,
      required: c.required ?? false,
      staticItems: c.staticItems ?? [],
      defaultValueIds: c.defaultValueIds ?? []
    };
  });

  // --- ETAT INTERNE ---
  isOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  selectedIds = signal<string[]>([]);
  isDisabled = signal<boolean>(false);

  // --- DERIVES (Computed) ---
  filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const items = this.safeConfig().staticItems;
    if (!query) return items;
    return items.filter((item: DynamicOptionDto) => (item.value ?? '').toLowerCase().includes(query));
  });

  displayValue = computed(() => {
    const ids = this.selectedIds();
    if (ids.length === 0) return this.safeConfig().placeholder;

    const selectedItems = this.safeConfig().staticItems.filter((item: DynamicOptionDto) => ids.includes(item.id ?? ''));
    return selectedItems.map((item: DynamicOptionDto) => item.value).join(', ');
  });

  isMaxSelectionReached = computed(() => {
    const max = this.safeConfig().maxSelectionLength;
    return this.safeConfig().isMultiSelect && max != null && max > 0 && this.selectedIds().length >= max;
  });

  // --- CVA Callbacks ---
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

  // --- ACTIONS ---
  toggleDropdown() {
    if (this.isDisabled() || this.safeConfig().disabled) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.onTouched();
    }
  }

  toggleOption(option: DynamicOptionDto) {
    if (option.disabled || !option.id) return;

    const currentIds = this.selectedIds();
    const isCurrentlySelected = currentIds.includes(option.id);

    // SÉCURITÉ : Bloque si on essaie de sélectionner alors que le max est atteint
    if (!isCurrentlySelected && this.isMaxSelectionReached()) {
        console.warn(this.safeConfig().messageWhenMaxSelectionLengthExceeded);
        return;
    }

    if (this.safeConfig().isMultiSelect) {
      if (isCurrentlySelected) {
        this.updateSelection(currentIds.filter(id => id !== option.id));
      } else {
        this.updateSelection([...currentIds, option.id]);
      }
    } else {
      if (isCurrentlySelected) {
        this.updateSelection([]);
      } else {
        this.updateSelection([option.id]);
        if (this.safeConfig().isDropDownDisplay) {
          this.isOpen.set(false);
        }
      }
    }
  }

  clearSelection(event?: Event) {
    if (event) event.stopPropagation();
    this.updateSelection([]);
  }

  private updateSelection(newIds: string[]) {
    this.selectedIds.set(newIds);
    const formValue = this.safeConfig().isMultiSelect ? newIds : (newIds.length > 0 ? newIds[0] : null);
    this.onChange(formValue);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.safeConfig().isDropDownDisplay && this.isOpen()) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.isOpen.set(false);
      }
    }
  }

  // --- CONTROL VALUE ACCESSOR ---
  writeValue(value: any): void {
    if (!value) {
      this.selectedIds.set([]);
    } else if (Array.isArray(value)) {
      this.selectedIds.set(value.filter(v => v != null).map(String));
    } else {
      this.selectedIds.set([String(value)]);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}