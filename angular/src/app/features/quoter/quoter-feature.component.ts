import { Component, OnInit, inject, signal } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { QuoterStore } from './store/quoter.store';
import { VehicleSummaryComponent } from './components/vehicle-summary/vehicle-summary.component';
import { ConfiguratorFooterComponent } from './components/configurator-footer/configurator-footer.component';
import { DurationEditorComponent } from './components/duration-editor/duration-editor.component';

@Component({
  selector: 'app-quoter-feature',
  standalone: true,
  imports: [
    NgbAccordionModule, 
    VehicleSummaryComponent, 
    ConfiguratorFooterComponent, 
    DurationEditorComponent
  ],
  providers: [QuoterStore], // Le store est fourni au niveau de la feature
  templateUrl: './quoter-feature.component.html',
  styleUrl: './quoter-feature.component.scss'
})
export class QuoterFeatureComponent implements OnInit {
  readonly store = inject(QuoterStore);
  
  // Gestion locale de l'état des accordéons
  openSections = signal<{ [key: string]: boolean }>({ duration: true, colors: true });

  ngOnInit() {
    this.store.loadInitialData();
  }

  toggleSection(section: string) {
    this.openSections.update(state => ({ ...state, [section]: !state[section] }));
  }
}