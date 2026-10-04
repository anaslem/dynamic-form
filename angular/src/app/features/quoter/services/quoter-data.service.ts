import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Vehicle, CatalogOption, UserConfiguration, PricingResult } from '../models/quoter.models';

@Injectable({ providedIn: 'root' })
export class QuoterDataService {
  private readonly mockVehicle: Vehicle = {
    id: 'v1', brand: 'Alfa Romeo', model: 'Giulia', version: '2.2 D 160 BA',
    internalRef: '1192215', demandRef: '4280120', energy: 'Diesel',
    transmission: 'Automatique', consumption: '5,1 L/100 km', seats: 5,
    co2Value: 130, co2Class: 'C', catalogPrice: 60900
  };

  getVehicleDetails(): Observable<Vehicle> { return of(this.mockVehicle).pipe(delay(400)); }
  getOptionsCatalog(): Observable<CatalogOption[]> { return of([]).pipe(delay(400)); }

  calculatePrice(configuration: UserConfiguration): Observable<PricingResult> {
    const rent = 800 + (configuration.contract.months * 2);
    return of({
      monthlyRent: rent, tco: rent + 720, investedValue: 46466, optionsTotal: 0, globalDiscountPercent: 24
    }).pipe(delay(600));
  }
}