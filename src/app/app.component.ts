import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { filter } from 'rxjs';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { LoadingIndicatorComponent } from './layouts/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-root',
  imports: [
    Toast,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoadingIndicatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'BuyEZ Shopping';
  url: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => (this.url = event.url));
  }
}
