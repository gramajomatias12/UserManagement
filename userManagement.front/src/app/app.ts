import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from "@angular/router"; // <-- Agregado RouterLink
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // <-- Agregado para los mat-button
import { Loading } from './core/loading';
import { UserStore } from './features/users/user.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    MatToolbarModule, 
    MatProgressBarModule, 
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('userManagement');
  public loadingService = inject(Loading);
  public store = inject(UserStore);
}