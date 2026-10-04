import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { QuoterContract } from '../../models/quoter.models';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-duration-editor',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './duration-editor.component.html',
  styleUrl: './duration-editor.component.scss',
})
export class DurationEditorComponent {
  contract = input.required<QuoterContract>();
  contractChanged = output<QuoterContract>();

  updateMonths(delta: number) {
    this.contractChanged.emit({
      ...this.contract(),
      months: Math.max(9, Math.min(72, this.contract().months + delta)),
    });
  }
  updateKms(delta: number) {
    this.contractChanged.emit({
      ...this.contract(),
      kilometers: Math.max(2500, Math.min(250000, this.contract().kilometers + delta)),
    });
  }
}
