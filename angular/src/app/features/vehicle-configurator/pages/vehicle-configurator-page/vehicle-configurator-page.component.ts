import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleConfiguratorStore } from '../../store/vehicle-configurator.store';

// Imports des futurs Dumb Components (à créer)
// import { VehicleSummaryComponent } from '../../components/vehicle-summary/vehicle-summary.component';
import { OptionsSelectorComponent } from '../../components/options-selector/options-selector.component';
// import { DynamicSelectComponent } from '../../../../shared/components/dynamic-select/dynamic-select.component';
// import { ConfigurationActionBarComponent } from '../../components/action-bar/action-bar.component';

@Component({
  selector: 'app-vehicle-configurator-page',
  standalone: true,
  imports: [
    CommonModule,
    // VehicleSummaryComponent,
    OptionsSelectorComponent,
    // DynamicSelectComponent,
    // ConfigurationActionBarComponent
  ],
  providers: [VehicleConfiguratorStore], // Le store vit et meurt avec cette page
  templateUrl: './vehicle-configurator-page.component.html',
  styleUrl: './vehicle-configurator-page.component.scss'
})
export class VehicleConfiguratorPageComponent implements OnInit {
  // Injection du Signal Store
  readonly store: InstanceType<typeof VehicleConfiguratorStore> = inject(VehicleConfiguratorStore);

  ngOnInit() {
    // On simule le chargement du véhicule ID "123" à l'ouverture de la page
    this.store.loadVehicleData('123');
  }
}