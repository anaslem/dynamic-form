import {
  Component,
  computed,
  forwardRef,
  input,
  signal
} from '@angular/core';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  FormsModule, 
  Validator, 
  NG_VALIDATORS, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@abp/ng.core';

// TODO: Ajuste les chemins vers tes proxys
import type { DynamicInputConfigurationDto } from '../../../proxy/dynamic-components/models';
import { DynamicInputValueType } from '../../../proxy/enums/dynamic-input-value-type.enum';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, FormsModule, CoreModule],
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicInputComponent),
      multi: true
    },
    // NOUVEAU : On déclare le composant comme un Validateur Angular
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DynamicInputComponent),
      multi: true
    }
  ]
})
export class DynamicInputComponent implements ControlValueAccessor, Validator {
  config = input.required<DynamicInputConfigurationDto>();

  value = signal<string | number | null>(null);
  isDisabled = signal<boolean>(false);
  
  // NOUVEAU : Sauvegarde du contrôle parent pour savoir s'il a été "touché"
  parentControl: AbstractControl | null = null; 

  safeConfig = computed(() => {
    const c = this.config();
    return {
      id: c.id ?? 'input-' + Math.random().toString(36).substring(2, 9),
      name: c.name ?? '',
      isDisplayed: c.isDisplayed ?? true,
      label: c.label ?? '',
      placeholder: c.placeholder ?? '::GenericComponent:Input:DefaultPlaceholder',
      indicator: c.indicator ?? '',
      valueType: c.valueType ?? DynamicInputValueType.Text,
      range: c.range,
      step: c.step,
      defaultValue: c.defaultValue ?? null,
      prefix: c.prefix ?? '',
      maxLength: c.maxLength ?? null,
      disabled: c.disabled ?? false,
      required: c.required ?? false
    };
  });

  inputType = computed(() => {
    return this.safeConfig().valueType === DynamicInputValueType.Text ? 'text' : 'number';
  });

  stepValue = computed(() => {
    if (this.safeConfig().valueType === DynamicInputValueType.Text) return null;
    if (this.safeConfig().step != null) return this.safeConfig().step;
    return this.safeConfig().valueType === DynamicInputValueType.Integer ? '1' : 'any';
  });

  private onChange: (value: any) => void = () => {};
  public onTouched: () => void = () => {};

  // --- ACTIONS ---
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value;

    if (rawValue === '') {
      this.updateValue(null);
      return;
    }

    if (this.safeConfig().valueType !== DynamicInputValueType.Text) {
      this.updateValue(Number(rawValue));
    } else {
      this.updateValue(rawValue);
    }
  }

  private updateValue(newValue: string | number | null) {
    this.value.set(newValue);
    this.onChange(newValue);
  }

  // --- CONTROL VALUE ACCESSOR ---
  writeValue(val: any): void {
    // CORRECTION DU BUG DEFAULT VALUE : Si ngModel nous envoie "null" ou "vide"
    if (val === null || val === undefined || val === '') {
      const defVal = this.safeConfig().defaultValue;
      // Et qu'on a une valeur par défaut en stock
      if (defVal != null && defVal !== '') {
        const parsedVal = this.safeConfig().valueType !== DynamicInputValueType.Text ? Number(defVal) : defVal;
        this.value.set(parsedVal);
        // On avertit discrètement Angular que la valeur a changé pour qu'il mette à jour le ngModel parent
        setTimeout(() => this.onChange(parsedVal));
        return;
      }
    }
    this.value.set(val);
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }

  // --- VALIDATION ANGULAR ---
  validate(control: AbstractControl): ValidationErrors | null {
    this.parentControl = control; // Sauvegarde pour afficher les erreurs dans le HTML
    
    const val = control.value;
    const config = this.safeConfig();
    const errors: ValidationErrors = {};
    let hasError = false;

    // 1. Validation : Obligatoire
    if (config.required && (val === null || val === undefined || val === '')) {
      errors['required'] = true;
      hasError = true;
    }

    // 2. Validation : Nombres (Min / Max)
    if (val !== null && val !== '' && config.valueType !== DynamicInputValueType.Text) {
      const numVal = Number(val);
      if (config.range?.minValue != null && numVal < config.range.minValue) {
        errors['min'] = { min: config.range.minValue, actual: numVal };
        hasError = true;
      }
      if (config.range?.maxValue != null && numVal > config.range.maxValue) {
        errors['max'] = { max: config.range.maxValue, actual: numVal };
        hasError = true;
      }
    }

    // 3. Validation : Texte (Max Length)
    if (val != null && config.valueType === DynamicInputValueType.Text && config.maxLength != null) {
      if (String(val).length > config.maxLength) {
        errors['maxlength'] = { requiredLength: config.maxLength, actualLength: String(val).length };
        hasError = true;
      }
    }

    // Si on a des erreurs, on les renvoie, ce qui passe ngModel à "INVALID"
    return hasError ? errors : null;
  }
}