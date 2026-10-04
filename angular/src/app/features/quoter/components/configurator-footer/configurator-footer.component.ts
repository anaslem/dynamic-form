import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-configurator-footer',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './configurator-footer.component.html',
  styleUrl: './configurator-footer.component.scss'
})
export class ConfiguratorFooterComponent {
  rent = input<number>(0);
  contractDisplay = input<string>('');
  isDirty = input<boolean>(false);
  isLoading = input<boolean>(false);
  recalculate = output<void>();
}