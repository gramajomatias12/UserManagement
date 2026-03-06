import { Component, inject, signal } from '@angular/core';
import { UserList } from "./features/users/user-list/user-list";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Loading } from './core/loading';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [UserList, MatToolbarModule, MatProgressBarModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('userManagement');
  public loadingService = inject(Loading)
}
