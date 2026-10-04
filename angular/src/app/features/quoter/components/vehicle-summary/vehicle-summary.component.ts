import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Vehicle, PricingResult } from '../../models/quoter.models';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-summary',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vehicle-summary.component.html',
  styleUrl: './vehicle-summary.component.scss'
})
export class VehicleSummaryComponent {
  vehicle = input.required<Vehicle | null>();
  pricing = input.required<PricingResult | null>();
}