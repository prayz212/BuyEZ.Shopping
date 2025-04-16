import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../core/services';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  imports: [CommonModule],
})
export class LoadingIndicatorComponent {
  loading$: Observable<boolean>;

  constructor(private readonly loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
