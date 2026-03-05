import { Component, signal } from '@angular/core';
import { UserList } from "./features/users/user-list/user-list";
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [UserList, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('userManagement');
}
