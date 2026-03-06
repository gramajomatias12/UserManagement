import { Routes } from '@angular/router';
import { adminGuard } from './core/auth.guard';
import { UserList } from './features/users/user-list/user-list';
import { Inicio } from './features/inicio/inicio';



export const routes: Routes = [
  { path: 'home', component: Inicio },
  { 
    path: 'usuarios', 
    component: UserList,
    canActivate: [adminGuard] // <-- Solo entran si el guard devuelve true
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];